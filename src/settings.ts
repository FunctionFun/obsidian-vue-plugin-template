import type MyPlugin from "./main";

export interface MyPluginSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}
