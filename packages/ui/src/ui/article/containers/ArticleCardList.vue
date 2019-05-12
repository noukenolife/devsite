<template>
  <div>
    <template v-for="article in articleList.items">
      <ArticleCardLink
        :article="article"
        v-if="!article.deletedAt"
        @delete="deleteArticle(article.id)"></ArticleCardLink>
      <ArticleCardLinkDisabled
        :article="article"
        v-if="!!article.deletedAt"></ArticleCardLinkDisabled>
    </template>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import {mapState} from 'vuex';
  import {IRootState} from '@/store';
  import ArticleListItemCard from '@/ui/article/components/ArticleCard.vue';
  import {deleteArticle} from '@/di/provider';
  import ArticleCardLink from '@/ui/article/components/ArticleCardLink.vue';
  import ArticleCardLinkDisabled from '@/ui/article/components/ArticleCardLinkDisabled.vue';

  @Component({
    components: {ArticleCardLinkDisabled, ArticleCardLink, ArticleListItem: ArticleListItemCard},
    computed: {
      ...mapState({
        articleList: (state: IRootState) => state.articleListModule.articleList,
      }),
    },
  })
  export default class ArticleCardList extends Vue {
    
    public async deleteArticle(articleId: string) {
      if (window.confirm('Are you sure to delete the article?')) {
        return deleteArticle.invoke(articleId);
      }
    }
  }
</script>
