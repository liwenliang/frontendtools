import { ipcMain } from 'electron';
import { copy, excuteCommand, installDeps, installExtends } from '../utils/index.js';
import Config from './config';
const { extendMap, formatVersion } = Config;

async function commitlint({ versionName, targetPath, installType }, sender) {
  let selectItem = formatVersion[versionName];

  console.log('hello you');

  // 安装commitlint相关依赖
  await installDeps(selectItem, installType, targetPath, sender);

  // 将配置文件拷贝到项目中，并覆盖原有文件
  await copy(`${__dirname}/commitlint/${selectItem.template}/`, `${targetPath}`);

  // 循环安装commitlint插件
  await installExtends(extendMap, sender);

  // 配置hosky设置
  let commandArr = [
    'npx husky install',
    'npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"',
  ];
  await excuteCommand(commandArr, targetPath, sender);

  sender.send('excuteEnd');
}

const init = () => {
  ipcMain.on('commitlintExcute', async (event, params) => {
    await commitlint(params, event.sender);
  });
};

export default { init };
