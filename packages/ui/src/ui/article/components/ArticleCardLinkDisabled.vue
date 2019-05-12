<template>
  <div class="article-card-link-disabled">
    <div class="deleted is-overlay has-background-black"></div>
    <ArticleCard :article="article"></ArticleCard>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {IArticleListItem} from "@/store/models/article/IArticleListItem";
  import ArticleCard from '@/ui/article/components/ArticleCard.vue';
  
  @Component({
    components: {ArticleCard}
  })
  export default class ArticleCardLink extends Vue {
    @Prop() public article!: IArticleListItem;
  }
</script>

<style lang="stylus" scoped>
  .article-card-link-disabled
    position relative
    .deleted
      width 100%
      height 100%
      opacity 0.5
      z-index 9999
</style>
