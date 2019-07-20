// import { Application } from 'egg';

export default {
//  async foo(this: Application) {
//     console.log('this.ctx.modle', await this.ctx.app.model.SysUser.findAll())
//   },
  listToTree(list, key) {
    var tree = list.filter(parent => {
      var branchArr = list.filter(child => {
        return parent.id == child[key];
      });
      parent.children = [];
      if (branchArr.length > 0) {
        parent.children = branchArr;
      }
      return parent[key] == "";
    });
    return tree;
  },

 
}