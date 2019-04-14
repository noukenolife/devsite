import { IFileObject } from '@/filesystem/IFileObject';

export class ArticleFile implements IFileObject {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
