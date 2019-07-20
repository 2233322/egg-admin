import { Application } from 'egg';
import * as path from 'path';
import * as nconf from 'nconf';

nconf.use('file', {
  file: path.join('d:\\www\\egg-admin\\service', '/app/mock/db.json'),
})

export default {
  async aa(this: Application, a, b) {
    const client = nconf.get('client');
    console.log(client)
    console.log(this.model.SysRole)
    console.log(a,b)
  }
}