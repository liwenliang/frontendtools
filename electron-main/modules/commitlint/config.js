/**
 * 定义不同版本需要安装的依赖以及需要的配置的文件夹地址
 */

const formatVersion = {
  commitlint: {
    deps: [
      ['@commitlint/cli', 'latest'],
      ['@commitlint/config-conventional', 'latest'],
      ['husky', 'latest'],
    ],
    loadingMsg: '正在安装commitlint环境需要的依赖，请稍后……',
    template: 'template_commitlint',
  },
};

const extendMap = {};

const Config = {
  formatVersion,
  extendMap,
};

module.exports = Config;
