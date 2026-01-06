# Obsidian Vue Plugin Template

一个集成了 Vue 3、TypeScript、Vite 和 esbuild 的 Obsidian 插件开发模板。

## 特性

- **Vue 3 集成**：使用 Vue 3 构建交互式插件界面
- **TypeScript 支持**：类型安全的开发体验
- **双构建系统**：
  - esbuild 用于快速构建 main.ts
  - Vite 用于构建 Vue 应用
- **热重载支持**：开发时自动刷新插件
- **设置页面集成**：Vue 组件无缝嵌入 Obsidian 设置面板

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Obsidian >= 0.15.0

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

启动开发服务器，支持热重载：

```bash
npm run dev
```

这将启动三个并发进程：
- esbuild 构建 main.ts
- Vite 构建 Vue 应用（监听模式）
- 自动复制 Vue 构建文件到 dist 目录

### 3. 测试插件

1. 在 Obsidian 中打开一个测试 vault
2. 创建插件目录：`test-valt/.obsidian/plugins/obsidian-vue-plugin-template/`
3. 创建软链接（确保在项目根目录执行）：

```bash
ln -s /Users/your-username/Documents/Code/obsidian-vue-plugin-template/dist /Users/your-username/Documents/Code/obsidian-vue-plugin-template/test-valt/.obsidian/plugins/obsidian-vue-plugin-template
```

4. 手动重启 Obsidian 应用程序，或安装并配置热重载插件 Hot Reload 以实现插件代码的实时更新

### Hot Reload 插件使用说明

**注意**：Hot Reload 插件目前不在 Obsidian 社区插件市场中，需要从 GitHub 手动下载安装。

1. **从 GitHub 下载 Hot Reload 插件**：
   - 打开浏览器，访问 Hot Reload 插件的 GitHub 仓库发布页面：`https://github.com/pjeby/hot-reload/releases`
   - 下载最新版本的插件压缩包（通常命名为 `hot-reload-x.x.x.zip` 格式）

2. **手动安装 Hot Reload 插件**：
   - 打开 Obsidian 设置面板
   - 点击左侧导航栏的「社区插件」选项
   - 确保「安全模式」已关闭
   - 点击「文件夹」图标，打开 Obsidian 的插件目录
   - 在插件目录中创建一个名为 `hot-reload` 的新文件夹
   - 将下载的插件压缩包解压，将所有文件复制到 `hot-reload` 文件夹中
   - 返回 Obsidian 设置面板，刷新「已安装插件」列表
   - 找到 Hot Reload 插件后，点击「启用」按钮激活插件

3. **基本配置方法**：
   - 在你的插件项目根目录下的 `dist` 文件夹中创建一个名为 `.hotreload` 的空文件
   - 这个空文件是 Hot Reload 插件识别开发中插件的标记，确保只对该插件进行热重载
   - 安装并启用 Hot Reload 插件后，它会自动检测带有 `.hotreload` 文件的插件并启用热重载功能
   - 重启一次 Obsidian 应用程序，使 Hot Reload 插件生效

4. **实现自动重载**：
   - 确保你的插件代码位于 Obsidian 的插件目录中（通过软链接或直接放置）
   - 当你修改插件代码并保存后，Hot Reload 插件会自动检测到文件变化
   - 插件会在几秒钟内自动重新加载你的插件，无需手动重启 Obsidian
   - 注意：对于 Vue 组件的修改，可能需要等待 Vite 构建完成后才会触发重载

使用 Hot Reload 插件可以大大提高开发效率，减少手动重启 Obsidian 的次数。

### 4. 打包发布

#### 版本管理

在发布新版本前，建议先更新插件版本号：

```bash
npm version [patch|minor|major]
```

这将：
- 自动更新 `manifest.json` 中的版本号
- 自动更新 `versions.json` 文件（用于 Obsidian 插件市场，只有当最小应用版本变化时才会添加新条目）
- 自动创建版本提交记录（格式：`chore(release): vX.X.X`）

#### 构建生产版本

版本更新完成后，运行构建命令生成生产版本的插件文件：

```bash
npm run build
```

这将：
- 自动使用 esbuild 构建 main.ts 到 dist/main.js
- 自动使用 Vite 构建 Vue 应用到 dist/vue
- 自动复制 Vue 构建产物到 dist 目录
- 生成完整的插件发布文件结构

#### 打包插件

构建完成后，运行打包命令创建插件发布包：

```bash
npm run package
```

这将：
- 自动在项目根目录创建 `release` 文件夹（如果不存在）
- 复制必要的插件文件（main.js、styles.css、manifest.json）到 release 文件夹
- 将这些文件打包成 ZIP 压缩包
- 压缩包命名为 `obsidian-vue-plugin-template.zip`

#### 发布到社区插件市场

1. 登录 GitHub 并进入你的插件仓库
2. 点击右侧的 "Releases" 选项卡
3. 点击 "Draft a new release" 创建新版本
4. 填写版本号、发布说明等信息
5. 上传之前生成的 ZIP 压缩包
6. 点击 "Publish release" 发布版本
7. 最后，按照 Obsidian 社区插件市场的指南提交你的插件

通过以上步骤，你可以将插件打包并发布到 Obsidian 社区插件市场，供其他用户使用。

## 项目结构

```
obsidian-vue-plugin-template/
├── src/
│   ├── main.ts              # 插件主入口
│   ├── settings.ts          # 设置定义
│   ├── vue-app/            # Vue 应用目录
│   │   ├── App.vue         # 主 Vue 组件
│   │   └── main.ts         # Vue 应用入口
│   └── shims-vue.d.ts      # Vue 类型声明
├── dist/                   # 构建输出目录
├── vite.config.ts          # Vite 配置
├── esbuild.config.mjs      # esbuild 配置
├── manifest.json           # Obsidian 插件 manifest
├── package.json            # 项目依赖
└── README.md               # 本文件
```

## 开发指南

### 修改插件信息

1. 更新 `manifest.json` 中的插件信息：
   - `id`：唯一标识符（建议使用反向域名格式）
   - `name`：插件名称
   - `description`：插件描述
   - `version`：版本号

2. 更新 `package.json` 中的项目信息

### 添加新的 Vue 组件

1. 在 `src/vue-app/` 目录下创建新的 `.vue` 文件
2. 在 `src/vue-app/main.ts` 中导入并使用

### 访问 Obsidian API

在 Vue 组件中，你可以通过全局变量访问插件实例：

```typescript
// 在 main.ts 中设置全局变量
export default class MyPlugin extends Plugin {
  onload() {
    // ...
    window.myPlugin = this;
  }
}

// 在 Vue 组件中使用
import { onMounted } from 'vue';
onMounted(() => {
  const plugin = (window as any).myPlugin;
  // 使用 plugin.app 访问 Obsidian API
});
```

### 构建说明

项目使用双构建系统：

1. **esbuild**：快速构建 `main.ts`，生成 `dist/main.js`
2. **Vite**：构建 Vue 应用，生成 `dist/vue-app.iife.js` 和 `dist/styles.css`

构建脚本会自动将所有必要文件复制到 `dist` 目录。



## 常见问题

### Vue 组件加载失败

确保：
- 插件 ID 在 `main.ts` 和 `manifest.json` 中一致
- 软链接已正确创建
- 构建文件已正确生成

### 设置页面内容消失

如果设置页面内容在切换后消失，确保 `SettingTab.display()` 方法每次都创建新的容器元素：

```typescript
display(): void {
  const { containerEl } = this;
  containerEl.empty();
  const vueContainer = document.createElement('div');
  vueContainer.id = 'vue-obsidian-setting-container';
  containerEl.appendChild(vueContainer);
  this.plugin.mountVueToSetting(vueContainer);
}
```

## 许可证

[0-BSD License](LICENSE)
