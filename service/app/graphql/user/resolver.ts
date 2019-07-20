import { AddUserInput } from './interface';

export default {
  Query: {

    // 获取一个用户
    async user(_, args: { id?: number, name?: string, email?: string }, ctx: any): Promise<any> {
      const { id } = args;
      const user = await ctx.connector.user.fetchById(id);
      return user;
    },

    // 获取用户列表
    userList(_, { }, ctx) {
      console.log(ctx)
      return [{
        id: 12,
        name: 'xyh'
      },{
        id: 20,
        name: 'wyp'
      }]
    },
  },

  Mutation: {
    async addUser(_, args: AddUserInput, ctx:any) {
      await ctx.connector.user.create(args)
      console.log('createUserdd25d')
    },
  }
}
