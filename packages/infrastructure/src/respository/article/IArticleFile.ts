import { IFileObject } from '@/filesystem/IFileObject';

export interface IArticleFile extends IFileObject {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
