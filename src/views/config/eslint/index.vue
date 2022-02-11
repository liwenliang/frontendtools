<template>
  <PageWrapper title="Eslint配置页面">
    <template #headerContent>
      <ul>
        <li>
          关于eslint的配置及其说明可以看
          <a href="https://cloud.tencent.com/developer/section/1135587" target="_blank">
            腾讯文档
          </a>
        </li>
        <li>
          eslint
          <a href="https://cn.eslint.org/docs/rules/" target="_blank">中文官方文档</a>
        </li>
        <li>
          关于prettier的配置及其说明可以看
          <a href="https://www.prettier.cn/docs/options.html" target="_blank">官方文档</a>
        </li>
        <li>
          <a href="https://eslint.vuejs.org/rules/max-attributes-per-line.html" target="_blank">
            eslint-plugin-vue
          </a>
          这里是一些关于vue的格式化配置，可以通过这个文档了解vue格式化的思路
        </li>
      </ul>
    </template>
    <Spin :spinning="excuteLoading" :tip="excuteMessage">
      <Form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="项目地址" name="projectPath">
          <InputSearch
            placeholder="请选择项目地址"
            v-model:value="formState.projectPath"
            readonly
            @search="selectPath"
          >
            <template #enterButton>
              <Button>选择</Button>
            </template>
          </InputSearch>
        </FormItem>
        <FormItem label="Eslint版本" name="version">
          <Select v-model:value="formState.version" placeholder="请选择eslint版本">
            <SelectOption value="vue_js">vue+js</SelectOption>
            <SelectOption value="vue3_ts">vue3.x+ts</SelectOption>
            <SelectOption value="vue2_ts">vue2+ts</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="包管理工具" name="packageType">
          <Select v-model:value="formState.packageType" placeholder="请选择包管理工具">
            <SelectOption value="yarn">yarn</SelectOption>
            <SelectOption value="npm">npm</SelectOption>
          </Select>
        </FormItem>
        <FormItem :wrapper-col="{ span: 14, offset: 8 }">
          <Space :size="24">
            <Button style="margin-left: 10px" @click="onReset">重置</Button>
            <Button type="primary" @click="onSubmit">执行</Button>
          </Space>
        </FormItem>
      </Form>
    </Spin>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Form, Select, Input, Button, Space, Spin } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  const { ipcRenderer } = window.require('electron');
  let FormItem = Form.Item;
  let InputSearch = Input.Search;
  let SelectOption = Select.Option;
  // warning 不能像下边这样引用ipcRender，会报错，应使用上边的方式window.require的方式
  // import { ipcRenderer } from 'electron';

  const formRef = ref();
  let excuteMessage = ref('');
  let excuteLoading = ref(false);
  const formState = reactive({
    projectPath: '',
    version: 'vue_js',
    packageType: 'yarn',
  });

  let labelCol = {
    span: 4,
  };
  let wrapperCol = {
    span: 14,
  };

  ipcRenderer.on('selectedItem', (env, arg) => {
    if (arg.canceled) {
      return;
    }
    formState.projectPath = arg.filePaths[0];
  });

  ipcRenderer.on('excuteMessage', (env, arg) => {
    excuteMessage.value = arg;
  });
  ipcRenderer.on('excuteEnd', () => {
    excuteLoading.value = false;
  });

  let onSubmit = () => {
    excuteLoading.value = true;
    ipcRenderer.send('eslint-excute', {
      versionName: formState.version,
      targetPath: formState.projectPath,
      installType: formState.packageType,
    });
  };

  let selectPath = () => {
    ipcRenderer.send('open-directory-dialog', 'openDirectory');
  };

  let onReset = () => {
    console.log('reset');
    formRef.value.resetFields();
  };
</script>
