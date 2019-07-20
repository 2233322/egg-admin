import { Application } from 'egg';

export default function (app: Application) {
  const { INTEGER, STRING } = app.Sequelize;
  const Permission = app.model.define('sys_permission', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permissionType: {
      type: STRING(20),
      unique: true,
    },
    operaId: INTEGER,
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
      // 权限菜单表一对一
      app.model.SysPermission.belongsTo(app.model.SysOpera, { foreignKey: 'opera_id', targetKey: 'id' });
    }
  }
}