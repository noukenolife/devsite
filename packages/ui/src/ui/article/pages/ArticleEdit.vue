<template>
  <form @submit.prevent="save()">
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="article.title" placeholder="Enter an article title here">
          </div>
        </div>
      </div>
      <div class="column is-12">
        <MarkdownEditor class="markdown-editor" v-model="article.content" @save="save()"></MarkdownEditor>
      </div>
      <div class="column is-12">
        <p>作成日: {{ article.createdAt }}</p>
        <p>最終更新日: {{ article.updatedAt }}</p>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import {mapState} from 'vuex';
  import {IRootState} from '@/store';
  import {getArticleById, saveArticle} from "@/di/provider";
  import MarkdownEditor from '@/ui/article/molecules/MarkdownEditor.vue';
  import {Route} from 'vue-router';

  @Component({
    components: {MarkdownEditor},
    computed: {
      ...mapState({
        article: (state: IRootState) => state.articleModule.article,
      }),
    },
  })
  export default class ArticleEdit extends Vue {
    public async beforeRouteEnter(to: Route, from: Route, next: (flag?: boolean) => void) {
      try {
        const { articleId } = to.params;
        await getArticleById.invoke(articleId);
        
        next();
      } catch (e) {
        next(false);
      }
    }
    
    public async save() {
      await saveArticle.invoke();
    }
  }
</script>

<style lang="stylus">
  .markdown-editor
    height 100%
</style>
