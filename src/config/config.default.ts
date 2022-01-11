import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640676232264_9818';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList:['http://10.0.5.25:9528','http://localhost:9528','localhost:8080']
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST'
  }
  // config.security = {
  //   csrf: false,
  // };
  config.mongoose = {
    client: {
      uri: process.env.NODE_ENV === 'local' ? 'mongodb://118.25.72.109:27017/ls' : 'mongodb://10.204.0.23:32465/shenwei',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    }
  }
  
  return config;
};
