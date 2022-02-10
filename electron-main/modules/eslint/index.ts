import { dialog, ipcMain } from 'electron';
import { copy, installDeps, installExtends, rewriteSettings } from '../utils/index.js';
import Config from './config';
import { customSettings } from './settings.js';
const { extendMap, formatVersion } = Config;

async function eslint({ versionName, targetPath, installType }, sender) {
  console.log('inEslint', { versionName, targetPath, installType });
  const selectItem = formatVersion[versionName];

  // 安装eslint相关依赖
  await installDeps(selectItem, installType, targetPath, sender);

  // 将配置文件拷贝到项目中，并覆盖原有文件
  await copy(`${__dirname}/eslint/${selectItem.template}/`, `${targetPath}`);

  // 循环安装eslint插件
  await installExtends(extendMap, sender);

  // 配置vscode项目设置
  await rewriteSettings(customSettings, targetPath, sender);

  sender.send('excuteEnd');
}

const init = (mainWindow) => {
  // 主进程
  ipcMain.on('open-directory-dialog', (event, params) => {
    dialog.showOpenDialog(mainWindow, { properties: [params] }).then(({ canceled, filePaths }) => {
      event.sender.send('selectedItem', { canceled, filePaths });
    });
  });

  ipcMain.on('eslint-excute', async (event, params) => {
    await eslint(params, event.sender);
  });
};

export default { init };
