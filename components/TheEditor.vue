<template>
  <div>
    <BaseButton
      @click="togglePreview"
    >
      プレビュー
    </BaseButton>
    <BaseButton
      @click="save"
    >
      保存
    </BaseButton>
    <BaseInputText
      v-if="!preview"
      v-model="title"
      :name="'title'"
      :placeholder="'タイトル'"
    />
    <span
      v-if="articleCheck"
      class="error"
    ># (Heading 1)は、記事内に含めることはできません。</span>
    <BaseTextfield
      v-if="!preview"
      v-model="article"
      :name="'article'"
      :placeholder="'マークダウンで記事を書いてください'"
    />
    <div
      v-if="preview"
      v-html="md2html"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { marked } from 'marked';
// import axios from 'Axios';
import BaseInputText from './BaseInputText.vue';
import BaseTextfield from './BaseTextfield.vue';
import BaseButton from './BaseButton.vue';
import { MdParser } from '@/commons/utils/mdparser';
import { addContent } from '@/commons/apis/contents';
// Import the functions you need from the SDKs you need

type Data = {
  title: string
  article: string
  preview: boolean
}

// type Request = {
//   title: string
//   body: string
//   createdAt: Date
// }

export default Vue.extend({
  name: 'TheEditor',
  components: { BaseInputText, BaseTextfield, BaseButton },

  data (): Data {
    return {
      title: '',
      article: '',
      preview: false
    };
  },

  computed: {
    getMdArticle (): string {
      const mdTitle = '# ' + this.title + '\n\n';
      return mdTitle + this.article;
    },
    md2html (): string {
      const html = marked.parse(this.getMdArticle);
      return html;
    },
    articleCheck (): boolean {
      const mdParser = new MdParser();
      return mdParser.getHeading(1, this.article) !== null;
    }
  },
  mounted () {
    // will console.log 'Hello mounted!'
  },

  methods: {
    togglePreview (): void {
      this.preview = !this.preview;
    },
    save () {
      const mdParser = new MdParser();
      const heading1 = mdParser.getHeading(1, this.getMdArticle);
      const title = heading1 !== null ? heading1[0] : '';
      addContent(this.$fireStoreDb, title, this.article);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
