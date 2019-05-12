<template>
  <div class="card">
    <div class="card-content">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <div class="content">
              <h2>{{ article.title }}</h2>
              <p>{{ article.content }}</p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
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
