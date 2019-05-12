<template>
  <router-link
    :to="{ name: 'articleEdit', params: { articleId: article.id } }"
    :class="{ 'is-disabled': !!article.deletedAt }">
    <ArticleCard @delete="_delete" :article="article"></ArticleCard>
  </router-link>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from "vue-property-decorator";
  import {IArticleListItem} from "@/store/models/article/IArticleListItem";
  import ArticleCard from '@/ui/article/components/ArticleCard.vue';
  
  @Component({
    components: {ArticleCard}
  })
  export default class ArticleCardLink extends Vue {
    @Prop() public article!: IArticleListItem;
    
    @Emit('delete') public _delete(articleId: string) { return articleId; }
  }
</script>
