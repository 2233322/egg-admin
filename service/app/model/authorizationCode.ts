import { Application } from 'egg';

export interface AuthorizationCode {
  authorizationCode: string,
  expiresAt: Date,
  redirectUri: string,
  scope: string,
}

export default (app: Application) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const AuthorizationCode = app.model.define('authorization_code', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: STRING(50),
    redirectUri: STRING(100),
    scope: STRING(50),
    expiresAt: DATE,
    sysUserId: INTEGER,
    clientId: INTEGER,
  }, {
    tableName: 'authorization_code',
    timestamps: true,
    underscored: true,
    comment: '授权表'
  });

  return class extends AuthorizationCode {
    static associate() {
      app.model.AuthorizationCode.belongsTo(app.model.Client, { as: 'client', foreignKey: 'client_id' });
      app.model.AuthorizationCode.belongsTo(app.model.SysUser, { as: 'sysUser', foreignKey: 'sys_user_id' });
    }
  }
}