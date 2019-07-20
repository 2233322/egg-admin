import { Application } from 'egg';

export default (app: Application) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const RefreshToken = app.model.define('refresh_token', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    refreshToken: {
      type: STRING(50),
      unique: true,
    },
    refreshTokenExpiresAt: {
      type: DATE
    },
    scope: STRING,
    sysUserId: INTEGER,
    clientId: INTEGER,
  }, {
    tableName: 'refresh_token',
    modelName: 'refreshToken',
    timestamps: true,
    underscored: true,
    comment: '刷新token表',
  });

  return class extends RefreshToken {
    static associate() {
      app.model.RefreshToken.belongsTo(app.model.Client, { as: 'client', foreignKey: 'client_id' });
      app.model.RefreshToken.belongsTo(app.model.SysUser, { as: 'sysUser', foreignKey: 'sys_user_id' });
    }
  }
}