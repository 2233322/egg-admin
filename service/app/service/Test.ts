import { Service } from 'egg';
import { Op } from 'sequelize';

/**
 * Test Service
 */

export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi() {
    try {
      const result = await this.ctx.model.SysOpera.findAll({
       where: {
         id: {
           [Op.lt] : 2
         }
       }
     })
     console.log(result)
     return result
    } catch (error) {
      console.log(error)
    }
  }
}
