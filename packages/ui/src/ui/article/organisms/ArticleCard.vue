<template>
  <router-link
    :to="{ name: 'articleEdit', params: { articleId: article.id } }"
    :class="{ 'is-disabled': !!article.deletedAt, 'router-link-active': !article.deletedAt }">
    <div class="card">
      <div v-if="!!article.deletedAt" class="deleted is-overlay has-background-black"></div>
      <div class="card-content">
        <div class="columns is-mobile is-vcentered">
          <div class="content-column column">
            <div class="content">
              <h2 class="is-truncated">{{ article.title }}</h2>
              <p class="is-truncated">{{ article.content }}</p>
            </div>
          </div>
          <div class="column is-narrow">
            <div class="field has-addons">
              <div class="control">
                <a v-if="!article.deletedAt"
                   href="javascript:void(0);"
                   class="button is-danger"
                   @click.stop="_delete(article.id)">
                  Delete
                </a>
                <a v-if="!!article.deletedAt"
                   href="javascript:void(0);"
                   class="button is-danger"
                   disabled>
                  Deleted
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from "vue-property-decorator";
  import {IArticleListItem} from '@/store/models/article/IArticleListItem';

  @Component
  export default class ArticleCard extends Vue {
    @Prop() public article!: IArticleListItem;
    
    @Emit('delete') public _delete(articleId: string) { return articleId; }
  }
</script>

<style lang="stylus" scoped>
  .content-column
    width 0
    
  .is-truncated
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  
  .deleted
    width 100%
    height 100%
    opacity 0.5
    z-index 9999
</style>
