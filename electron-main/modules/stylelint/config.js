/**
 * 定义不同版本需要安装的依赖以及需要的配置的文件夹地址
 */

const formatVersion = {
  stylelint: {
    deps: [
      ['prettier', '^2.2.1'],
      ['stylelint', '^13.12.0'],
      ['stylelint-config-prettier', '^9.0.3'],
      ['stylelint-config-rational-order', '^0.1.2'],
      ['stylelint-config-standard', '^22.0.0'],
    ],
    loadingMsg: '正在安装stylelint环境需要的依赖，请稍后……',
    template: 'template_stylelint',
  },
};

const extendMap = {
  'hex-ci.stylelint-plus': {
    loadingMsg: '正在安装vscode扩展插件stylelint-plus，请稍后……',
  },
};

const Config = {
  formatVersion,
  extendMap,
};

module.exports = Config;
