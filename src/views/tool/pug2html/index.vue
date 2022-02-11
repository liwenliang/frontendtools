<template>
  <PageWrapper title="PUG2HTML">
    <Row :gutter="12">
      <Col :span="12">
        <p>pug</p>
        <Textarea :rows="8" v-model:value="pugContent" @change="onPugContentChanged" />
      </Col>
      <Col :span="12">
        <p>html</p>
        <Textarea :rows="8" v-model:value="htmlContent" />
      </Col>
    </Row>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { Textarea, Row, Col } from 'ant-design-vue';
  import { ref } from 'vue-demi';
  import { PageWrapper } from '/@/components/Page';
  // import pug from 'pug';
  const pug = require('pug');

  let pugContent = ref('');
  let htmlContent = ref('');

  let onPugContentChanged = () => {
    htmlContent.value = pug.render(pugContent.value, { pretty: true });
  };
</script>
<style lang="less" scoped>
  h1 {
    color: red;
  }
</style>
