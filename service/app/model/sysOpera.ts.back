import { Application } from 'egg'

export default (app: Application) => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
  const Opera = app.model.define('sys_opera', {
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
    tableName: 'sys_opera',
    modelName: 'Opera',
    timestamps: true,
    underscored: true,
    comment: '菜单表',
  });

  return class extends Opera {
    static associate() {
      
      // 权限菜单表一对一
      app.model.SysOpera.hasOne(app.model.SysPermission, { foreignKey: 'opera_id', sourceKey: 'id'});
    }
  }
}