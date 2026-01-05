# Obsidian 插件开发模板

这是一个 Obsidian 插件开发模板项目，集成了 Vue 3、TypeScript、Vite 和 esbuild，方便快速开发 Obsidian 插件。

## 项目特性

- **TypeScript** - 提供类型检查和代码提示
- **Vue 3** - 用于构建插件的用户界面
- **Vite** - 快速构建 Vue 应用
- **esbuild** - 高效打包 Obsidian 插件主文件
- **ESLint** - 代码质量检查
- **热重载** - 开发模式下自动编译

## 项目结构

```
obsidian-vue-plugin-template/
├── src/
│   ├── main.ts              # Obsidian 插件主入口
│   ├── settings.ts          # 插件设置相关
│   └── vue-app/
│       ├── main.ts          # Vue 应用入口
│       └── App.vue         # Vue 根组件
├── dist/                    # 构建输出目录
│   ├── main.js             # 插件主文件
│   ├── manifest.json       # 插件清单
│   ├── styles.css          # 样式文件
│   ├── vue-app.umd.js      # Vue 应用文件
│   └── LICENSE             # 许可证文件
├── esbuild.config.mjs      # esbuild 配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目配置
```

## 快速开始

### 1. 使用模板创建新项目

- 点击 GitHub 上的 "Use this template" 按钮，创建你自己的仓库
- 或者直接克隆这个模板项目

### 2. 安装依赖

确保你的 Node.js 版本至少是 v16：

```bash
node --version
```

在项目根目录下运行：

```bash
npm install
```

### 3. 修改项目信息

修改以下文件中的项目信息：

- `package.json` - 修改项目名称、描述等
- `manifest.json` - 修改插件 ID、名称、描述等
- `LICENSE` - 修改版权信息

### 4. 开发模式

启动开发模式，代码修改会自动编译：

```bash
npm run dev
```

### 5. 构建生产版本

构建插件的所有文件到 `dist` 目录：

```bash
npm run build
```

构建完成后，`dist` 目录下会生成以下文件：
- `main.js` - Obsidian 插件主文件
- `manifest.json` - 插件清单文件
- `styles.css` - 样式文件
- `vue-app.umd.js` - Vue 应用文件
- `LICENSE` - 版权文件

### 6. 手动安装插件

将 `dist` 目录下的以下文件复制到你的 Obsidian vault 中：

```
你的Vault/.obsidian/plugins/你的插件ID/
├── main.js
├── manifest.json
├── styles.css
└── vue-app.umd.js
```

然后在 Obsidian 的设置中启用插件。

## 开发指南

### 修改插件主逻辑

编辑 `src/main.ts` 文件，这是 Obsidian 插件的主入口文件。

### 开发 Vue 界面

- Vue 组件放在 `src/vue-app/` 目录下
- 编辑 `src/vue-app/App.vue` 修改主界面
- 编辑 `src/vue-app/main.ts` 修改 Vue 应用配置

### 添加样式

- 全局样式可以放在项目根目录的 `styles.css` 文件中
- Vue 组件的样式可以使用 `<style scoped>` 标签

### 代码质量检查

运行 ESLint 检查代码质量：

```bash
npm run lint
```

## 发布新版本

### 1. 更新版本号

更新 `manifest.json` 中的版本号，例如 `1.0.1`，以及所需的最低 Obsidian 版本。

### 2. 更新版本历史

更新 `versions.json` 文件，格式为 `"新版本号": "最低Obsidian版本"`，这样旧版本的 Obsidian 可以下载兼容的插件版本。

### 3. 创建 GitHub Release

- 在 GitHub 上创建新的 Release
- 使用新版本号作为 Tag（不要加 `v` 前缀）
- 上传以下文件作为二进制附件：
  - `manifest.json`
  - `main.js`
  - `styles.css`
  - `vue-app.umd.js`

### 4. 简化版本更新流程

你可以使用以下命令简化版本更新流程：

```bash
npm version patch    # 更新补丁版本 (1.0.0 -> 1.0.1)
npm version minor    # 更新次版本 (1.0.0 -> 1.1.0)
npm version major    # 更新主版本 (1.0.0 -> 2.0.0)
```

这个命令会自动更新 `manifest.json` 和 `package.json` 中的版本号，并在 `versions.json` 中添加新版本的条目。

## 添加到社区插件列表

- 查看 [插件指南](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- 发布初始版本
- 确保仓库根目录有 `README.md` 文件
- 在 https://github.com/obsidianmd/obsidian-releases 提交 Pull Request 添加你的插件

## 资金支持

你可以在 `manifest.json` 中添加资金支持链接，让用户可以经济上支持你的插件。

简单方式：

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

多个链接：

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API 文档

查看 Obsidian API 文档：https://docs.obsidian.md

## 许可证

本项目使用 0BSD 许可证，详见 [LICENSE](LICENSE) 文件。
