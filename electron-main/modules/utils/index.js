const fs = require('fs');
// const ora = require('ora');
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
let packageJson = null;

/**
 * 调整项目中的.vscode/settings.json属性，
 * 这里可以增加一些自定义的项目级配置
 * @param {*} customSettings
 */
async function rewriteSettings(customSettings, targetPath, sender) {
  sender.send('excuteMessage', '正在配置.vscode/settings.json属性…');
  let dir = `${targetPath}/.vscode`;
  let fileName = 'settings.json';
  let filePath = `${dir}/${fileName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let originSettingsJson = {};
  if (fs.existsSync(filePath)) {
    let originSettings = fs.readFileSync(filePath).toString();
    try {
      originSettingsJson = JSON.parse(originSettings) || {};
    } catch (error) {
      originSettingsJson = {};
    }
  } else {
    originSettingsJson = JSON.parse(JSON.stringify(customSettings));
  }
  let resultSettings = { ...originSettingsJson, ...customSettings };
  fs.writeFileSync(filePath, JSON.stringify(resultSettings, true, '  '));
  sender.send('excuteMessage', '项目settings.json配置完成！');
}

/**
 * 安装插件
 * @param {*} extendMap
 */
async function installExtends(extendMap, sender) {
  for (const key in extendMap) {
    if (Object.hasOwnProperty.call(extendMap, key)) {
      const element = extendMap[key];
      sender.send('excuteMessage', element.loadingMsg);
      let exCode = `code --install-extension ${key}`;
      exec(exCode)
        .then((_) => {
          sender.send('excuteMessage', `${key}安装完成！`);
        })
        .catch((err) => {
          console.log('err', err);
          sender.send('excuteMessage', `${key}安装失败，可以尝试手动安装！`);
        });
    }
  }
}

/**
 * 安装依赖
 * @param {*} deps
 */
async function installDeps(selectItem, installType, targetPath, sender) {
  sender.send('excuteMessage', `[${installType}]${selectItem.loadingMsg}`);
  let depsList = [];
  let depAndVersions = selectItem.deps.map((item) => {
    depsList.push(item[0]);
    return item.join('@');
  });
  let packageJson = getPackageJson(targetPath);
  let installedDeps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  };
  let existDeps = depsList.filter((item) => !!installedDeps[item]);

  console.log(existDeps);

  // 卸载
  let uninstallStr = `cd ${targetPath} && yarn remove ${existDeps.join(' ')}`;
  // 安装
  let commendStr = `cd ${targetPath} && yarn add -D ${depAndVersions.join(' ')}`;
  if (installType === 'npm') {
    uninstallStr = `cd ${targetPath} && npm uninstall ${existDeps.join(' ')}`;
    commendStr = `cd ${targetPath} && npm install -D ${depAndVersions.join(' ')}`;
  }

  if (existDeps && existDeps.length > 0) {
    await exec(uninstallStr);
  }

  await exec(commendStr);
  sender.send('excuteMessage', `安装完成！`);
}

/**
 * 顺序执行command命令
 */
async function excuteCommand(commandArr, targetPath, sender) {
  for (let index = 0; index < commandArr.length; index++) {
    const command = commandArr[index];
    sender.send('excuteMessage', command);
    await exec(`cd ${targetPath} && ${command}`);
  }
}

var checkDirectory = function (src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

/**
 * 复制某个目录下的所有文件到新的文件夹
 * @param {*} src
 * @param {*} dst
 */
async function copy(src, dst) {
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function (path) {
    var _src = src + '/' + path;
    var _dst = dst + '/' + path;
    fs.stat(_src, function (err, stats) {
      //stats 该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) {
        //如果是个文件则拷贝
        let readable = fs.createReadStream(_src); //创建读取流
        let writable = fs.createWriteStream(_dst); //创建写入流
        readable.pipe(writable);
      } else if (stats.isDirectory()) {
        //是目录则 递归
        checkDirectory(_src, _dst, copy);
      }
    });
  });
}

/**
 * 获取package文件内容
 */
function getPackageJson(targetPath) {
  if (!packageJson) {
    let packageString = fs.readFileSync(`${targetPath}/package.json`).toString();
    packageJson = JSON.parse(packageString);
  }
  return packageJson;
}

module.exports = {
  rewriteSettings,
  installExtends,
  installDeps,
  copy,
  getPackageJson,
  excuteCommand,
};
