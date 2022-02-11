import { ipcMain } from 'electron';
import { copy, installDeps, installExtends, rewriteSettings } from '../utils/index.js';
import Config from './config';
import { customSettings } from './settings.js';
const { extendMap, formatVersion } = Config;

async function stylelint({ versionName, targetPath, installType }, sender) {
  let selectItem = formatVersion[versionName];

  // 安装stylelint相关依赖
  await installDeps(selectItem, installType, targetPath, sender);

  // 将配置文件拷贝到项目中，并覆盖原有文件
  await copy(`${__dirname}/stylelint/${selectItem.template}/`, `${targetPath}`);

  // 循环安装stylelint插件
  await installExtends(extendMap, sender);

  // 配置vscode项目设置
  await rewriteSettings(customSettings, targetPath, sender);

  sender.send('excuteEnd');
}

const init = () => {
  ipcMain.on('stylelintExcute', async (event, params) => {
    await stylelint(params, event.sender);
  });
};

export default { init };
