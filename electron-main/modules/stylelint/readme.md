## stylelint 格式化工具

> 我们经常使用 eslint 对项目代码进行格式化和规范，样式上很少关注，这次我们使用 stylelint 规范样式代码，希望能够保持项目中样式代码的一致性。

> stylelint 的配置使用了与 prettier 配合良好的插件，以及排序插件，安装以后可以通过保存即格式化样式代码

### 帮助你快速将格式化规范引入到项目中

1. 执行命令行`cloud stylelint`，等待项目安装完成

通常在安装完成之后就可以直接使用 stylelint 格式化 `"stylelint.autoFixOnSave": true`

### 帮助你安装 vs 插件

1. 会使用 code 命令安装 stylelint-plus 插件

安装 vscode 插件依赖 code 命令行工具，如果无法自动安装，可以手动到 vscode 的扩展商店下载安装，stylelint-plus 支持保存格式化操作，能够方便我们使用

同时会在项目根目录增加`.vscode/settings.json`文件，这里需要注意的是如果项目原本就有这个文件，会被直接覆盖。
