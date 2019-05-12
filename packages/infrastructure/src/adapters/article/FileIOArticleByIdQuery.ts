import { application } from '@devsite/core';
import { FileIO } from '@/filesystem';
import { IArticleFile } from '@/respository/article/IArticleFile';

export class FileIOArticleByIdQuery implements application.article.IArticleByIdQuery {

  public constructor(protected _fileIO: FileIO) {}

  public async invoke(id: string): Promise<application.article.IArticle> {
    const article: IArticleFile = await this._fileIO.readJSON(`${id}.json`);
    return article as application.article.IArticle;
  }
}
