import { Effect, Subscription } from "dva";
import { Reducer } from "redux";
import Authorized from '@/utils/Authorized';
import * as operaService from '@/services/menu';
import { message } from "antd";

export interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}

export interface OperaDataItem {
  id: number
  name: string;
  parentId: number;
  uri: string;
  isMenu: boolean;
  url?: string;
  iconfont?: string;
  describe?: string;
  sort: number
}

export interface MenuModelState {
  menuData?: MenuDataItem[];
  operaList?: OperaDataItem[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    fetchMenuData: Effect;
    fetchOpera: Effect;
    mutationOpera: Effect;
    deleteOpera: Effect;
  };
  subscriptions: {
    setup: Subscription
  };
  reducers: {
    saveMenuData: Reducer<MenuModelState>;
    saveOperaData: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menuData: [],
    operaList: [],
  },

  effects: {
    // 获取导航菜单数据
    *fetchMenuData(_, { call, put }) {
      const response = yield call(operaService.fetchMenuData, { page: 2 });

      const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
        menuList.map((item: MenuDataItem): MenuDataItem => {
          // console.log(item)
          // item.locale = `menu${item.path.replace(RegExp('/', 'g'), '.')}`;
          const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : [],
          };
          return Authorized.check(item.authority, localItem, null) as MenuDataItem;
        });

      yield put({
        type: 'saveMenuData',
        payload: menuDataRender(response.data.operaList),
      });
    },

    // 获取列表
    *fetchOpera({ payload: { page = 1 } }, { call, put }) {
      const response = yield call(operaService.fetchOpera, { page });
      yield put({
        type: 'saveOperaData',
        payload: response.data.operaList,
      })
    },

    // 新增修改模块
    *mutationOpera({ payload }, { call, put }) {
      const response = yield call(operaService.mutationOpera, payload);
      if (!response.errors) {
        yield put({
          type: 'fetchOpera',
          payload: {
            page: 1
          }
        })
        message.success('操作成功');
      } else {
        console.error(response.errors);
        message.error('错误');
      }
    },

    *deleteOpera({ payload }, { call, put }) {
      const response = yield call(operaService.delectOpera, payload);
      if (!response.errors) {
        const { data: { deleteOpera: { code, summary } } } = response;
        if (code === 'success') {
          yield put({
            type: 'fetchOpera',
            payload: {
              page: 1
            }
          })
          message.success(summary);
        } else {
          message.error(summary);
        }
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }): void {
      history.listen(({ pathname, query }): void => {
        if (pathname === '/auth/opera') {
          dispatch({ type: 'fetchOpera', payload: query });
        }
      })
    }
  },

  reducers: {
    saveMenuData(state, action) {
      return {
        ...state,
        menuData: action.payload || [],
      }
    },

    saveOperaData(state, action) {
      return {
        ...state,
        operaList: action.payload || []
      }
    }
  },
};

export default MenuModel;
