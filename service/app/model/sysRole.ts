import { Application } from 'egg';

export default function(app: Application) {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
  const Role = app.model.define('sys_role', {
    id: {
      type: INTEGER, primaryKey: true, autoIncrement: true
    },
    name: STRING(50),
    pid: INTEGER,
    remark: STRING(200),
    status: {
      type: BOOLEAN,
      defaultValue: true
    },
  }, {
    tableName: 'sys_role',
    modelName: 'Role',
    underscored: true,
    timestamps: true,
    comment: '系统角色表',
  });

  return class extends Role {
    static associate() {
      // 用户角色表多对多关系
      app.model.SysRole.belongsToMany(app.model.SysUser, { through: 'sys_user_role' })

      // 角色权限表多对多关系
      app.model.SysRole.belongsToMany(app.model.SysPermission, { through: 'sys_role_permission' })
    }
    
  }
}