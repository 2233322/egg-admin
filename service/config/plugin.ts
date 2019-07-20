import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // cors: {
  //   enable: true,
  //   package: 'egg-cors',
  // },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },
  graphql: {
    enable: true,
    package: '@switchdog/egg-graphql',
  },
  // passport: {
  //   enable: true,
  //   package: 'egg-passport',
  // },
  // passportGithub: {
  //   enable: true,
  //   package: 'egg-passport-github',
  // }
};

export default plugin;
