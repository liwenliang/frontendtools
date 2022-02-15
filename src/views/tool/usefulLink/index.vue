<template>
  <PageWrapper
    title="常用链接"
    content="这个文档中介绍了别人的一个收藏夹，可以看的东西很多，除此之外，这个页面的markdown编辑器也是一个很有用的工具。"
  >
    <Button type="primary" @click="onEditButtonClicked">{{ !isEdit ? '编辑' : '完成' }}</Button>
    <Divider />
    <div v-show="!isEdit" id="viewer"></div>
    <div v-show="isEdit" id="editor"></div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
  import Editor from '@toast-ui/editor';
  import '@toast-ui/editor/dist/toastui-editor-viewer.css';
  import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
  import { PageWrapper } from '/@/components/Page';
  import { nextTick, onMounted, ref } from 'vue';
  import { Button, Divider } from 'ant-design-vue';
  const { ipcRenderer } = window.require('electron');
  let usefulLinks = '';
  let viewer = null;
  let editor = null;
  let isEdit = ref(false);

  onMounted(() => {
    viewer = new Viewer({
      el: document.querySelector('#viewer'),
      height: '600px',
      initialValue: usefulLinks,
    });

    editor = new Editor({
      el: document.querySelector('#editor'),
      height: '600px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: usefulLinks,
    });
  });

  let setContent = () => {
    viewer.setMarkdown(usefulLinks);
    editor.setMarkdown(usefulLinks);
  };

  let onEditButtonClicked = () => {
    isEdit.value = !isEdit.value;
    if (!isEdit.value && editor) {
      usefulLinks = editor.getMarkdown();
      nextTick(() => {
        ipcRenderer.invoke('setUsefulLinks', usefulLinks).then(() => {
          setContent();
        });
      });
    }
  };

  ipcRenderer.invoke('getUsefulLinks').then((res) => {
    usefulLinks = res;
    setContent();
    var links = document.querySelector('#viewer').querySelectorAll('a');
    // 这个操作的目的是将页面上a标签增加target属性，使其能够新标签打开
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
      }
    }
  });
</script>
