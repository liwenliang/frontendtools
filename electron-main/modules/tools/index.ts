import { ipcMain } from 'electron';
const fs = require('fs');

const init = () => {
  ipcMain.handle('getUsefulLinks', async () => {
    const fileContent = fs.readFileSync(`${__dirname}/tools/usefullinks.md`).toString();
    return fileContent;
  });
  ipcMain.handle('setUsefulLinks', async (event, content) => {
    const fileContent = content;
    fs.writeFileSync(`${__dirname}/tools/usefullinks.md`, fileContent);
  });
};

export default { init };
