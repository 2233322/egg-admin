import { Application } from 'egg';

export default (app: Application) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const AccessToken = app.model.define('access_token', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accessToken: {
      type: STRING(50),
      unique: true,
    },
    accessTokenExpiresAt: {
      type: DATE
    },
    scope: STRING,
    sysUserId: INTEGER,
    clientId: INTEGER,
  }, {
    tableName: 'access_token',
    modelName: 'Token',
    timestamps: true,
    underscored: true,
    comment: 'token 表',
  });

  return class extends AccessToken {
    static associate() {
      app.model.AccessToken.belongsTo(app.model.Client, { as: 'client', foreignKey: 'client_id' });
      app.model.AccessToken.belongsTo(app.model.SysUser, { as: 'sysUser', foreignKey: 'sys_user_id' });
    }
  }
}