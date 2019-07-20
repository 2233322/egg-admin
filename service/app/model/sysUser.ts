import { Application } from 'egg';
import { createHash } from 'crypto';

export interface UserData {
  id: number,
  name: string,
  email: string,
  password: string,
  salt: string
}

export default function (app: Application) {
  const { INTEGER, STRING, BOOLEAN, Op } = app.Sequelize;
  const User = app.model.define('sys_user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      unique: true,
    },
    email: {
      type: STRING(50),
      unique: true,
    },
    status: {
      type: BOOLEAN,
      defaultValue: true
    },
    password: STRING(70),
    salt: STRING(10),
  }, {
      modelName: 'User',
      tableName: 'sys_user',
      timestamps: true,
      underscored: true,
      comment: '系统用户表',
      hooks: {
        beforeCreate: (user: any) => {
          const salt = createHash('sha256').update(new Date().toString()).digest('hex').slice(0, 10);
          const passwordWithHash = createHash('sha256').update(user.password + salt).digest('hex');
          user.salt = salt;
          user.password = passwordWithHash;
        }
      }
    });

  return class extends User {
    static associate() {
      app.model.SysUser.belongsToMany(app.model.SysRole, { through: 'sys_user_role' });

      app.model.SysUser.hasMany(app.model.AccessToken, { as: 'accessTokens' });
      app.model.SysUser.hasMany(app.model.RefreshToken, { as: 'refreshTokens' });
      app.model.SysUser.hasMany(app.model.AuthorizationCode, { as: 'authorizationCodes' });
    };

    static async getUser(username: string, password: string) {
      const user:any = await this.findOne({
        where: { 
          [Op.or]: [{ name: username }, { email: username }]
        },
        attributes: ['id', 'name', 'email', 'password', 'salt'],
      });
      
      if (!user) return null;
      const passwordWithHash = createHash('sha256').update(password + user.salt).digest('hex');
      return (user.password === passwordWithHash) ? (delete user.dataValues.password && user) : null;

    }
  }
}