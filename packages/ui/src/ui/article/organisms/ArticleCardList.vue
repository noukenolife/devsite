<template>
  <div>
    <template v-for="article in articleList.items">
      <ArticleCard
        :article="article"
        @delete="deleteArticle(article.id)" />
    </template>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import {mapState} from 'vuex';
  import {IRootState} from '@/store';
  import {deleteArticle} from '@/di/provider';
  import ArticleCard from '@/ui/article/organisms/ArticleCard.vue';

  @Component({
    components: {ArticleCard},
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
