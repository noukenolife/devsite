import SaveArticle from '@/application/article/SaveArticle';
import InMemoryArticleRepository from '../../adapters/article/InMemoryArticleRepository';
import Article from '@/domain/article/Article';
import ArticleId from '@/domain/article/ArticleId';

describe('SaveArticle', () => {
  it('saves a new article', async () => {
    const repo = new InMemoryArticleRepository();
    const usecase = new SaveArticle(repo);

    const output = await usecase.invoke({
      title: 'New Article Title',
      content: 'This is a new article content.',
    });

    expect(output.id).toBe(repo.entities[0].id.value);
  });

  it('updates a existing article', async () => {
    const article = new Article(
      new ArticleId('1'),
      'New Article Title',
      'This is a new article content.',
    );
    const repo = new InMemoryArticleRepository([article]);

    const usecase = new SaveArticle(repo);
    await usecase.invoke({
      id: '1',
      title: 'Updated Article Title',
      content: 'This is an updated article content.',
    });

    const updatedArticle = await repo.findById(article.id);
    expect(updatedArticle && updatedArticle.id.value)
      .toBe('1');
    expect(updatedArticle && updatedArticle)
      .toHaveProperty('_title', 'Updated Article Title');
    expect(updatedArticle && updatedArticle)
      .toHaveProperty('_content', 'This is an updated article content.');
  });

  it('throws an error if tried to update the article that does not exist.', async () => {
    const repo = new InMemoryArticleRepository();
    const usecase = new SaveArticle(repo);

    await expect(usecase.invoke({
      id: '1',
      title: 'Article Title',
      content: 'This is an updated article content.',
    })).rejects.toThrow();
  });
});
