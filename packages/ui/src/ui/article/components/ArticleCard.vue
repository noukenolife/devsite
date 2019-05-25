<template>
  <div class="card">
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
</style>
