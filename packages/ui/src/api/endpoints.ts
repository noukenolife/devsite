export namespace ENDPOINTS {
  export interface IEndpoint {
    method: string;
    url: string;
  }

  export const BASE_PATH = 'http://localhost:3000/api/';

  export const GET_ARTICLE: (id: string) => IEndpoint = (id) => ({
    method: 'GET',
    url: `/articles/${id}`,
  });

  export const GET_ARTICLE_LIST: IEndpoint = {
    method: 'GET',
    url: '/articles',
  };

  export const POST_ARTICLE: IEndpoint = {
    method: 'POST',
    url: '/articles',
  };

  export const DELETE_ARTICLE: (id: string) => IEndpoint = (id) => ({
    method: 'DELETE',
    url: `/articles/${id}`,
  });
}
