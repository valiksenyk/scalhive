import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
  apiEndpoint: string;
  name: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: 'https://api.github.com/',
  name: 'ScalHive'
};
