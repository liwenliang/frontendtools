/**
 * 定义不同版本需要安装的依赖以及需要的配置的文件夹地址
 */

const formatVersion = {
  vue_js: {
    deps: [
      ['@vue/cli-plugin-babel', '~4.5.0'],
      ['@babel/eslint-parser', 'latest'],
      ['eslint-plugin-vue', 'latest'],
      ['eslint-config-standard', 'latest'],
      ['eslint', '^7.12.1'],
      ['eslint-plugin-import', '^2.22.1'],
      ['eslint-plugin-node', '^11.1.0'],
      ['eslint-plugin-promise', '^4.2.1 || ^5.0.0'],
    ],
    loadingMsg: '正在安装vue与javascript环境需要的依赖，请稍后……',
    template: 'template_vue_js',
  },
  vue3_ts: {
    deps: [
      ['eslint-plugin-vue', 'latest'],
      ['@typescript-eslint/eslint-plugin', 'latest'],
      ['@typescript-eslint/parser', 'latest'],
      ['eslint', '^7.12.1'],
      ['prettier', '^2.2.1'],
      ['@vue/cli-plugin-eslint', '~4.5.0'],
      ['@vue/eslint-config-prettier', '^6.0.0'],
      ['@vue/eslint-config-typescript', '^7.0.0'],
      ['eslint-plugin-prettier', '^3.3.1'],
    ],
    loadingMsg: '正在安装vue3.x与typescript环境需要的依赖，请稍后……',
    template: 'template_vue3_ts',
  },
  vue2_ts: {
    deps: [
      ['eslint-plugin-vue', 'latest'],
      ['@typescript-eslint/eslint-plugin', 'latest'],
      ['@typescript-eslint/parser', 'latest'],
      ['eslint', '^7.12.1'],
      ['prettier', '^2.2.1'],
      ['@vue/cli-plugin-eslint', '~4.5.0'],
      ['@vue/eslint-config-prettier', '^6.0.0'],
      ['@vue/eslint-config-typescript', '^7.0.0'],
      ['eslint-plugin-prettier', '^3.3.1'],
    ],
    loadingMsg: '正在安装vue2.x与typescript环境需要的依赖，请稍后……',
    template: 'template_vue2_ts',
  },
};

const extendMap = {
  'dbaeumer.vscode-eslint': {
    loadingMsg: '正在安装vscode扩展插件eslint，请稍后……',
  },
  'esbenp.prettier-vscode': {
    loadingMsg: '正在安装vscode扩展插件prettier，请稍后……',
  },
};

const Config = {
  formatVersion,
  extendMap,
};

module.exports = Config;
