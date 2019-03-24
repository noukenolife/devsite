import { DeleteArticle } from '@/application/article/DeleteArticle';
import { Article } from '@/domain/article/Article';
import { ArticleId } from '@/domain/article/ArticleId';
import { InMemoryArticleRepository } from '../../adapters/article/InMemoryArticleRepository';

describe('DeleteArticle', () => {
  it('deletes an article', async () => {
    const article1 = new Article(new ArticleId('1'), 'Title1', 'Content1');
    const article2 = new Article(new ArticleId('2'), 'Title2', 'Content2');

    const articleRepository = new InMemoryArticleRepository([article1, article2]);
    const service = new DeleteArticle(articleRepository);

    await service.invoke({ id: '1' });
    expect(articleRepository.entities).toEqual([article2]);
  });
});
