const customSettings = {
  // 文件：文件自动保存，只要暂停输入
  'files.autoSave': 'afterDelay',
  // 文件：文件保存机制：暂停输入3000毫秒即保存
  'files.autoSaveDelay': 3000,
  // stylelint保存即格式化
  'stylelint.autoFixOnSave': true,
  'prettier.endOfLine': 'auto',
};

module.exports = {
  customSettings,
};
