import { app, BrowserWindow, dialog, ipcMain, screen } from 'electron';
import is_dev from 'electron-is-dev';
import { join } from 'path';
import commitlint from './modules/commitlint';
import eslint from './modules/eslint';
import stylelint from './modules/stylelint';
import tools from './modules/tools';

let mainWindow: BrowserWindow | null = null;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
class createWin {
  constructor() {
    const displayWorkAreaSize = screen.getAllDisplays()[0].workArea;
    mainWindow = new BrowserWindow({
      width: parseInt(`${displayWorkAreaSize.width * 0.85}`, 10),
      height: parseInt(`${displayWorkAreaSize.height * 0.85}`, 10),
      movable: true,
      // frame: false,
      show: false,
      center: true,
      resizable: true,
      // transparent: true,
      titleBarStyle: 'default',
      webPreferences: {
        devTools: true,
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      backgroundColor: '#fff',
    });
    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../index.html')}`; // vite 构建后的静态文件地址

    mainWindow.loadURL(URL);

    mainWindow.on('ready-to-show', () => {
      mainWindow.show();
    });
  }
}

app.whenReady().then(() => new createWin());

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.focus();
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin();
  }
});

// 主进程
ipcMain.on('open-directory-dialog', (event, params) => {
  dialog.showOpenDialog(mainWindow, { properties: [params] }).then(({ canceled, filePaths }) => {
    event.sender.send('selectedItem', { canceled, filePaths });
  });
});

eslint.init();
stylelint.init();
commitlint.init();
tools.init();
