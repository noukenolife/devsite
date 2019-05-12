<template>
  <div>
    <mavon-editor
      class="mavon-editor"
      v-model="_value"
      language="en"
      @save="save()">
    </mavon-editor>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from "vue-property-decorator";
  import mavonEditor from 'mavon-editor';

  Vue.use(mavonEditor);

  @Component
  export default class MarkdownEditor extends Vue {
    @Prop({ default: '' }) public value!: string;
    
    @Emit() public input(value: string) { return value; }
    @Emit() public save() {}
    
    public get _value() { return this.value; }
    public set _value(value: string) { this.input(value); }
  
  }
</script>

<style lang="stylus" scoped>
  @import '~mavon-editor/dist/css/index.css';
  
  .mavon-editor
    height 100%
</style>
