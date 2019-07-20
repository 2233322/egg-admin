import { Application } from 'egg';

export default function (app: Application) {
  const { STRING, ARRAY, BOOLEAN } = app.Sequelize;
  const Client = app.model.define('client', {
    clientId: {
      type: STRING(50),
      unique: true,
    },
    clientSecret: {
      type: STRING(200),
      unique: true
    },
    redirectUri: {
      type: STRING(200),
      unique: true,
    },
    grants: {
      type: ARRAY(STRING)
    },
    status: {
      type: BOOLEAN,
      defaultValue: true
    },

  }, {
      tableName: 'client',
      modelName: 'Client',
      timestamps: true,
      underscored: true,
      comment: 'oauth2.0 登入授权表',
      hooks: {
        beforeCreate: (client: any) => {
          // 字符串保存为数组
          client.grants = client.grants.split(',');
        }
      }
    });

  return class extends Client {
    static associate() {
      app.model.Client.hasMany(app.model.AccessToken, { as: 'accessTokens' });
      app.model.Client.hasMany(app.model.RefreshToken, { as: 'refreshTokens' });
      app.model.Client.hasMany(app.model.AuthorizationCode, { as: 'authorizationCodes' });
    }
  }
}