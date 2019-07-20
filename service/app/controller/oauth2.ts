import { Controller } from 'egg';

export default class Oauth2Controller extends Controller {
  public async show() {
    const { ctx } = this;
    await ctx.render('oauth2/show', { query: ctx.querystring });
  }

  public async accessToken() {
    console.log(this.ctx.state);
    this.ctx.body = this.ctx.state.oauth.token;
  }
}