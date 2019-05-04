import { FileIO } from '@/filesystem/FileIO';
import { FileIOArticleRepository } from '@/adapters/article/FileIOArticleRepository';
import { IArticleMetaFile } from '@/respository/article/IArticleMetaFile';
import { application } from '@devsite/core';

export class FileIOArticleListQuery implements application.article.IArticleListQuery {

  public constructor(protected _fileIO: FileIO) {}

  public async invoke(
    criteria: application.article.IArticleListCriteria,
  ): Promise<application.article.IArticleList> {

    let items = Array.from((await this._fileIO.readJSON(
      FileIOArticleRepository.ARTICLE_META_FILE_PATH,
    ) as IArticleMetaFile).items);

    if (criteria.sortBy === 'updatedAt') {
      items = items.sort((a, b) => {
        if (criteria.order instanceof application.support.Desc) {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        if (criteria.order instanceof application.support.Asc) {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }
        return 0;
      });
    }

    items = items.slice(criteria.offset, criteria.offset + criteria.limit);

    return {
      count: items.length,
      items: items.map((item) => {
        return {
          title: item.title,
          content: item.content,
          updatedAt: item.updatedAt,
        } as application.article.IArticleListItem;
      }),
    };
  }
}
