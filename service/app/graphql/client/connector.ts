// import * as DataLoader from 'dataloader'
import { AddClientInput } from './interface';

export default class ClientConnector {
 // private loadr: any;
  private ctx: any;

  constructor(ctx) {
    this.ctx = ctx;
    // this.loadr = new DataLoader(this.fetch.bind(this))
  }

  // fetch(ids) {
  //   const clients = this.ctx.app.model.Client.findAll({
  //     where: {
  //       id: {
  //         $in: ids
  //       }
  //     }
  //   }).then(us => us.map(u => u.toJSON()));
  //   return clients;
  // }

  // fetchById(id: number) {
  //   return this.loadr.load(id)
  // }

  // Crate a client
  async create(args: AddClientInput):Promise<any> {
    const client = await this.ctx.model.Client.create(args.input);
    console.log(client)
  }

}