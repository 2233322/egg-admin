import * as DataLoader from 'dataloader';
// import { Op } from 'sequelize';
import { MutationOperaInput } from './interface';

export default class OperaConnector {
  private loadr: any;
  private ctx: any;

  constructor(ctx) {
    this.ctx = ctx;
    this.loadr = new DataLoader(this.fetch.bind(this));
  }

  async fetch() {
    const operaList = this.ctx.model.SysOpera.findAll({
      where: {
        status: true
      },
      order: [['sort', 'ASC']],
    }).then(data => data.map(item => item.toJSON()));
    return operaList;
  }

  async fetchById(id: number) {
    return this.loadr.load(id)
  }


  // 编辑新增
  async mutation(args: MutationOperaInput): Promise<void> {
    const { input: { id } } = args;

    if (typeof id === 'undefined') {
      await this.ctx.model.SysOpera.create(args.input);
    } else {
      await this.ctx.model.SysOpera.update(args.input, {
        where: {
          id
        }
      })
    }
  }

  //删除
  async delete(args: { id: number }) {
    const { id } = args;
    try {
      const opera = await this.ctx.model.SysOpera.findByPk(id);
      if (!opera) {
        return {
          code: 'failure_id_inexistence',
          summary: '数据不存在'
        }
      }

      const count = await this.ctx.model.SysOpera.count({
        where: {
          parentId: opera.id
        }
      });

      if (count !== 0) {
        return {
          code: 'failure_subtopic_exist',
          summary: '存在子栏目'
        }
      }

      const result = await this.ctx.model.SysOpera.destroy({
        where: {
          id
        }
      });

      return {
        code: 'success',
        summary: `成功删除${result}条数据`
      }
    } catch (error) {
      return {
        code: 'error',
        summary: '服务器错误'
      }
    }
  }
}