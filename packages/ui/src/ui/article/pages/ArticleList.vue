<template>
  <main>
    <button class="button is-primary" type="button" @click="createNewArticle()">新規作成</button>
    <ArticleCardList></ArticleCardList>
  </main>
</template>

<script lang="ts">

  import {Vue, Component, Watch} from "vue-property-decorator";
  import {createNewArticle, getArticleList} from "@/di/provider";
  import {articleModule} from "@/store/modules/article/ArticleModule";
  import {mapState} from 'vuex';
  import {IRootState} from "@/store";
  import ArticleCardList from '@/ui/article/containers/ArticleCardList.vue';
  import ArticleCard from '@/ui/article/components/ArticleCard.vue';

  @Component({
    components: {ArticleCardList, ArticleCard},
    computed: {
      ...mapState({
        articleList: (state: IRootState) => state.articleListModule.articleList,
      }),
    },
  })
  export default class ArticleList extends Vue {
    
    @Watch('$route', { immediate: true, deep: true })
    public async onRouteChange() {
      await getArticleList.invoke({
        offset: 0,
        limit: 10,
        ...this.$route.query as any,
      });
    }
    
    public async createNewArticle() {
      await createNewArticle.invoke();
      
      const articleId = articleModule.article && articleModule.article.id;
      
      if (articleId) {
        this.$router.push({
          name: 'articleEdit',
          params: { articleId }
        });
      }
    }
  }
</script>

<style scoped>

</style>
