<template>
  <PageWrapper title="Eslint配置页面" content="基础配置">
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
