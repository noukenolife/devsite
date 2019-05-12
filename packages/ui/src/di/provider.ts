import {GetArticleById} from '@/store/services/article/GetArticleById';
import {api} from '@/api/API';
import {GetArticleList} from '@/store/services/article/GetArticleList';
import {SaveArticle} from '@/store/services/article/SaveArticle';
import {CreateNewArticle} from '@/store/services/article/CreateNewArticle';
import {DeleteArticle} from '@/store/services/article/DeleteArticle';

export const getArticleById: GetArticleById =
  new GetArticleById(api);

export const getArticleList: GetArticleList =
  new GetArticleList(api);

export const saveArticle: SaveArticle =
  new SaveArticle(api);

export const createNewArticle: CreateNewArticle =
  new CreateNewArticle(saveArticle);

export const deleteArticle: DeleteArticle =
  new DeleteArticle(api);
