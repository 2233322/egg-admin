import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const response = await ctx.service.test.sayHi();


    ctx.body = response;
    
  }
}
