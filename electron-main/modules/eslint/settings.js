const customSettings = {
  // 文件：文件自动保存，只要暂停输入
  'files.autoSave': 'afterDelay',
  // 文件：文件保存机制：暂停输入3000毫秒即保存
  'files.autoSaveDelay': 3000,
  // 编辑器：保存即格式化
  'editor.formatOnSave': true,
  // 关闭编辑器对 js 文件的格式化，交给 ESLint 来做格式化，否则会格式化两次
  '[javascript]': {
    'editor.formatOnSave': false,
  },
  'prettier.endOfLine': 'auto',
  // 编辑器：设置默认格式化工具 有了这个就不用每个类型的文件都设置一个格式化工具，大部分用prettier，只有特殊情况需要单独设置
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
  // 编辑器：保存时候的动作
  'editor.codeActionsOnSave': {
    // 保存的时候执行一次eslint校验
    'source.fixAll.eslint': true,
    // 保存的时候调整import顺序，按引入包字母顺序
    'source.organizeImports': true,
  },
};

module.exports = {
  customSettings,
};
