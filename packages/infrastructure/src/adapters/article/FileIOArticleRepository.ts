import { FileIORepository } from '@/filesystem/FileIORepository';
import { domain } from '@devsite/core';
import * as uuid from 'uuid';
import { IArticleFile } from '@/respository/article/IArticleFile';
import { ArticleFileConverter } from '@/respository/article/ArticleFileConverter';
import { IArticleMetaFile } from '@/respository/article/IArticleMetaFile';
import { FileNotFoundException } from '@/filesystem/FileNotFoundException';
import { IArticleMetaItem } from '@/respository/article/IArticleMetaItem';
import { markdownToPlainText } from '@/utils/markdownToPlainText';

export class FileIOArticleRepository
  extends FileIORepository<domain.article.ArticleId, domain.article.Article, IArticleFile>
  implements domain.article.IArticleRepository {

  public static readonly ARTICLE_META_FILE_PATH = 'article_meta.json';
  protected _converter: ArticleFileConverter = new ArticleFileConverter();

  public async nextId(): Promise<domain.article.ArticleId> {
    return new domain.article.ArticleId(uuid.v4());
  }

  public async save(entity: domain.article.Article): Promise<void> {
    let meta: IArticleMetaFile = {
      items: [],
    };
    try {
      meta = await this._fileIO.readJSON(FileIOArticleRepository.ARTICLE_META_FILE_PATH);
    } catch (e) {
      if (!(e instanceof FileNotFoundException)) {
        throw e;
      }
    }

    const item = {
      id: entity.id.value,
      title: entity.title,
      content: markdownToPlainText(entity.content),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    } as IArticleMetaItem;

    const i = meta.items.findIndex(item => item.id === entity.id.value);
    if (i >= 0) {
      meta.items[i] = item;
    } else {
      meta.items.push(item);
    }

    await super.save(entity);
    await this._fileIO.writeJSON(FileIOArticleRepository.ARTICLE_META_FILE_PATH, meta);
  }

  public async remove(id: domain.article.ArticleId): Promise<void> {
    let meta: IArticleMetaFile = {
      items: [],
    };
    try {
      meta = await this._fileIO.readJSON(FileIOArticleRepository.ARTICLE_META_FILE_PATH);
    } catch (e) {
      if (!(e instanceof FileNotFoundException)) {
        throw e;
      }
    }

    const i = meta.items.findIndex(item => item.id === id.value);
    if (i >= 0) {
      meta.items.splice(i, 1);
      await this._fileIO.writeJSON(FileIOArticleRepository.ARTICLE_META_FILE_PATH, meta);
    } else {
      throw new FileNotFoundException();
    }

    await super.remove(id);
  }
}
