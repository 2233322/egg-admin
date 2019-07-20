import { Controller } from 'egg';

export default class UserController extends Controller {
  public async authorize() {
    const { ctx } = this;
    console.log(ctx.querystring);
    await ctx.render('oauth/login', { query: ctx.querystring });
  }
}