import IUpdateArticleTagsInput from '@/application/article/IUpdateArticleTagsInput';
import ArticleId from '@/domain/article/ArticleId';
import ArticleTag from '@/domain/article/ArticleTag';
import IArticleTagRepository from '@/domain/article/IArticleTagRepository';
import IArticleTagNormalizer from '@/ports/article/IArticleTagNormalizer';
import * as _ from 'lodash';

export default class UpdateArticleTags {
  protected _articleTagRepo: IArticleTagRepository;
  protected _tagNormalizer: IArticleTagNormalizer;

  public constructor(articleTagRepo: IArticleTagRepository, tagNormalizer: IArticleTagNormalizer) {
    this._articleTagRepo = articleTagRepo;
    this._tagNormalizer = tagNormalizer;
  }

  public async invoke(input: IUpdateArticleTagsInput): Promise<void> {
    const articleId = new ArticleId(input.articleId);

    const oldTags: { id: string, value: string; normalized: string; }[] =
      (await this._articleTagRepo.findByArticleId(articleId))
        .map((tag) => {
          return {
            id: tag.id.value,
            value: tag.value,
            normalized: this._tagNormalizer.normalize(tag.value),
          };
        });

    const newTags: { value: string; normalized: string; }[] =
      input.tags.map((tag) => {
        return { value: tag, normalized: this._tagNormalizer.normalize(tag) };
      });

    const tagsToRemove: ArticleId[] =
      _.differenceWith(oldTags, newTags, (oldTag: { value: string }, newTag: { value: string }) => {
          return oldTag.value === newTag.value;
        })
        .map(tag => new ArticleId(tag.id));

    const tagsToAdd = await Promise.all(
      _.differenceWith(newTags, oldTags, (newTag: { value: string }, oldTag: { value: string }) => {
          return newTag.value === oldTag.value;
        })
        .map(async (tag) => {
          const id = await this._articleTagRepo.nextId();
          return new ArticleTag(id, articleId, tag.value);
        }),
    );

    await this._articleTagRepo.removeAll(tagsToRemove);
    await this._articleTagRepo.saveAll(tagsToAdd);
  }
}
