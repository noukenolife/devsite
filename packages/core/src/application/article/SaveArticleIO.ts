export interface ISaveArticleInput {
  id?: string;
  title: string;
  content: string;
}
export interface ISaveArticleOutput {
  id: string;
  createdAt: string;
  updatedAt: string;
}
