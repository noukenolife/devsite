import { IArticle } from '@/application/article/IArticle';

export interface IArticleByIdQuery {
  invoke(id: string): Promise<IArticle>;
}
