import {App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings} from "./settings";
import 'vue/dist/vue.global.prod.js';

// Remember to rename these classes and interfaces!

// 引入 Vue 打包后的 UMD 模块（注意路径对应 Vite 打包输出目录）
// 先通过 Vite 打包 Vue 代码后，再引入
declare global {
  interface Window {
    VueObsidianComponent: {
      mountVueApp: (el: HTMLElement) => () => void;
    };
  }
}

export default class MyPlugin extends Plugin {
	private unmountVue?: () => void; // 存储 Vue 卸载函数
	settings: MyPluginSettings;
	private vueAppLoaded = false; // 标记 Vue 应用是否已加载

	async onload() {
		console.log('加载 Vue3 Obsidian 插件');
		
		// 动态加载 Vue UMD 模块
		await this.loadVueApp();
		
		// 添加插件设置面板（挂载 Vue 组件的载体）
    this.addSettingTab(new Vue3SettingTab(this.app, this));

		await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('dice', 'Obsidian-Vue-Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status bar text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-modal-simple',
			name: 'Open modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'replace-selected',
			name: 'Replace selected content',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection('Sample editor command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-modal-complex',
			name: 'Open modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
				return false;
			}
		});

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			new Notice("Click");
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
		console.log('卸载 Vue3 Obsidian 插件');
    // 插件卸载时，清理 Vue 实例
    if (this.unmountVue) {
      this.unmountVue();
    }
	}

	// 提供挂载 Vue 的方法（供 SettingTab 调用）
  mountVueToSetting(el: HTMLElement) {
    if (this.unmountVue) {
      this.unmountVue();
    }
    this.unmountVue = window.VueObsidianComponent.mountVueApp(el);
  }

	// 动态加载 Vue UMD 模块
	private async loadVueApp() {
		if (this.vueAppLoaded || (window as any).VueObsidianComponent) {
			return;
		}

		return new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			
			// 使用 Obsidian 的 API 获取插件目录路径
			const pluginPath = this.app.vault.adapter.getResourcePath(`.obsidian/plugins/obsidian-vue-plugin-template/vue-app.iife.js`);
			script.src = pluginPath;
			
			script.onload = () => {
				console.log('Vue IIFE 模块加载成功');
				this.vueAppLoaded = true;
				resolve();
			};
			script.onerror = () => {
				console.error('Vue IIFE 模块加载失败，路径:', pluginPath);
				reject(new Error('Failed to load Vue IIFE module'));
			};
			document.head.appendChild(script);
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

// 自定义 SettingTab（Obsidian 设置面板）
class Vue3SettingTab extends PluginSettingTab {
	plugin: MyPlugin;
	private vueContainer: HTMLElement | null = null;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    const vueContainer = document.createElement('div');
    vueContainer.id = 'vue-obsidian-setting-container';
    containerEl.appendChild(vueContainer);

    this.plugin.mountVueToSetting(vueContainer);
  }
}