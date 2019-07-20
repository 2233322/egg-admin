// import { AuthorizationCode } from '../model/authorizationCode';

export default class Oauth2 {
  private ctx: any

  constructor(ctx: any) {
    this.ctx = ctx
  };

  async getClient(clientId: string) {
    try {
      console.log('getClient invoked.......')
      const client = await this.ctx.model.Client.findOne({
        where: {
          clientId,
        }
      });
      if (!client) return false;
      return {
        id: client.id,
        redirectUris: client.redirectUri.split(','),
        grants: client.grants,
      }
    } catch (err) {
      console.log(err)
    }
  };

  async getUser(username: string, password: string) {
    try {
      console.log('getUser invoked.......')
      const user = await this.ctx.model.SysUser.getUser(username, password);
      return user
    } catch (err) {
      console.error(err)
    }
  };


  async saveAuthorizationCode(code, client, user) {
    try {
      console.log('saveAuthorizationCode invoked.......')
      await await this.ctx.model.AuthorizationCode.create({
        code: code.authorizationCode,
        redirectUri: code.redirectUri,
        expiresAt: code.expiresAt,
        scope: code.scope || '',
        clientId: client.id,
        sysUserId: user.id,
      });
      return {
        authorizationCode: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        scope: code.scope,
        client: { id: client.id },
        user: { id: user.id }
      }
    } catch (err) {
      console.error(err)
    }
  };

}