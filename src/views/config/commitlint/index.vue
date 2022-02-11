<template>
  <PageWrapper title="CommitLint配置页面">
    <template #headerContent>
      <ul>
        <li>
          commitlint可以参考这个地址
          <a
            target="_blank"
            href="https://vvbin.cn/doc-next/dep/lint.html#git-%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83"
          >
            Vben Admin提交规范
          </a>
        </li>
        <li>
          <Tag>feat: 增加新功能</Tag>
          <Tag>fix: 修复问题/bug</Tag>
          <Tag>style: 代码风格相关无影响运行结果的</Tag>
          <Tag>perf: 优化/性能提升</Tag>
          <Tag>refactor: 重构</Tag>
          <Tag>revert: 撤销修改</Tag>
          <Tag>test: 测试相关</Tag>
          <Tag>docs: 文档/注释</Tag>
          <Tag>chore: 依赖更新/脚手架配置修改等</Tag>
          <Tag>ci: 持续集成</Tag>
          <Tag>mod: 不确定分类的修改</Tag>
          <Tag>build: 构建项目</Tag>
          <Tag>types: 类型修改</Tag>
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
  import { Form, Select, Input, Button, Space, Spin, Tag } from 'ant-design-vue';
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
    ipcRenderer.send('commitlintExcute', {
      versionName: 'commitlint',
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
