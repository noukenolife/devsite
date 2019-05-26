<template>
  <div>
    <ArticleCard :article="article" />
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import ArticleCard from '@/ui/article/organisms/ArticleCard.vue';
  import {IArticleListItem} from "@/store/models/article/IArticleListItem";
  @Component({
    components: {ArticleCard}
  })
  export default class Sandbox extends Vue {
    public article: IArticleListItem = {
      id: "1",
      title: "テスト",
      content: "コンテンツ",
      updatedAt: "2019-05-26T00:00:00.000Z",
      deletedAt: "2019-05-26T00:00:00.000Z",
    };
  }
</script>
