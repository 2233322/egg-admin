import { Application } from 'egg';

export default (app: Application) => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
  const Permission = app.model.define('sys_permission', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(20),
    parentId: {
      type: INTEGER,
      defaultValue: 0,
    },
    uri: {
      type: STRING(50),
      unique: true,
    },
    isMenu: {
      type: BOOLEAN,
      defaultValue: false,
    },
    url: STRING(50),
    iconfont: STRING(20),
    describe: STRING(100),
    sort: INTEGER,
    status: {
      type: BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'sys_permission',
    modelName: 'Permission',
    timestamps: true,
    underscored: true,
    comment: '权限表',
  });

  return class extends Permission {
    static associate() {

      // 角色权限表多对多
      app.model.SysPermission.belongsToMany(app.model.SysRole, { through: 'sys_role_permission' });
    }
  }
}