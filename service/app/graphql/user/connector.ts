import * as DataLoader from 'dataloader';
import { Op } from 'sequelize'; 
import { AddUserInput } from './interface';

export default class UserConnector {
  private loadr: any;
  private ctx: any;

  constructor(ctx) {
    this.ctx = ctx;
    this.loadr = new DataLoader(this.fetch.bind(this))
  }

  fetch(ids) {
    console.log('ids', ids)
    const users = this.ctx.app.model.SysUser.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }).then(data => data.map(item => item.toJSON()));
    return users;
  }

  fetchById(id: number) {
    return this.loadr.load(id)
  }

  // Crate a user
  create(args: AddUserInput) {
    const user = this.ctx.model.SysUser.create(args.input);
    console.log(user)
  }

}