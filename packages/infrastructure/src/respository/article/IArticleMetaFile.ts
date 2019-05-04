import { IFileObject } from '@/filesystem/IFileObject';
import { IArticleMetaItem } from '@/respository/article/IArticleMetaItem';

export interface IArticleMetaFile extends IFileObject {
  items: IArticleMetaItem[];
}
