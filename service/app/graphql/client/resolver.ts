import { AddClientInput } from './interface';

export default {
  Query: {
    client() {
      console.log('client')
    }
  },
  Mutation: {
    async addClient(_, args: AddClientInput, ctx:any) {
     await ctx.connector.client.create(args);
     console.log(ctx)
      console.log(args)
    }
  }
}