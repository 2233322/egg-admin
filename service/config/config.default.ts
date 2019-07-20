import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560911712553_5627';

  config.security = {
    csrf: {
      ignore: () => true
    },
   // domainWhiteList: ['http://localhost:8000/']
  }

  // config.cors = {
  //   origin:'*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  // }
  
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
    mapping: {
      '.nj': 'nunjucks',
    }
  }

  config.sequelize = {
    dialect: 'postgres',
    database: 'eyi',
    host: '127.0.0.1',
    password: '123456',
    username: 'postgres',
    port: 5432,
  }

  config.oauth2Server = {
    debug: true,
    grants: ['password', 'authorization_code', 'refresh_token'],
  }

  // config.passportGithub = {
  //   key: 'd8683ae74229ed8a1cef',
  //   secret: '92a4c2742ef1ba42ed817a6e79111111374310bb',
  // }

  

  // add your egg config in here
  config.middleware = ['oauth','graphql'];

  config.oauth = {
    match: '/indexoo'
  }

  const graphql = {
    router: '/graphql',
    app: true,
    agent: false,
    graphiql: true,
    defaultEmptySchema:true,
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...graphql,
  };
};
