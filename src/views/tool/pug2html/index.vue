<template>
  <PageWrapper title="PUG2HTML">
    <Row :gutter="12">
      <Col :span="12">
        <p>pug</p>
        <TextArea :rows="8" v-model:value="pugContent" @change="onPugContentChanged" />
      </Col>
      <Col :span="12">
        <p>html</p>
        <TextArea :rows="8" v-model:value="htmlContent" />
      </Col>
    </Row>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { Row, Col, Input } from 'ant-design-vue';
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  let TextArea = Input.TextArea;
  // import pug from 'pug';
  const pug = window.require('pug');

  let pugContent = ref('');
  let htmlContent = ref('');

  let onPugContentChanged = () => {
    try {
      htmlContent.value = pug.render(pugContent.value, { pretty: true });
    } catch (error) {}
  };
</script>
