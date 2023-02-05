<script setup lang="ts">
  import axios from 'axios';
  import { marked } from 'marked';
  import { onMounted, ref, nextTick } from 'vue';
  import { useTitle } from '@vueuse/core';

  const title = useTitle();
  const html = ref('');
  const article = ref(null);
  const url = ref(
    'https://raw.githubusercontent.com/brachkow/readme-printer/main/README.md',
  );

  const load = async () => {
    const markdown = (await axios.get(url.value)).data;

    html.value = marked.parse(markdown);

    await nextTick();

    title.value = article.value.firstChild.textContent;
  };

  onMounted(() => {
    load();
  });
</script>

<template>
  <header class="Loader">
    <input
      class="Loader__Input"
      placeholder="https://raw.githubusercontent.com/"
      type="text"
      v-model="url" />
    <button class="Loader__Button">Load</button>
  </header>
  <article ref="article" class="markdown-body" v-html="html"></article>
</template>

<style lang="scss">
  .Loader {
    border: 1px solid black;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    &__Input {
      flex-grow: 1;
    }
  }

  @media print {
    .Loader {
      display: none;
    }
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
