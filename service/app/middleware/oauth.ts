import { Context } from 'egg';

export default function oauthMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    console.log(ctx.url);
    const fun = ctx.app.oAuth2Server.authenticate();
    await fun(ctx, next);
  }
}