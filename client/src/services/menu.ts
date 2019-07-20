import request from "@/utils/request";
import { OperaDataItem } from "@/models/menu";


// 获取导航菜单
export async function fetchMenuData({ page = 1 }): Promise<Object> {
  console.log(page)
  return request('/graphql', {
    method: 'POST',
    data: {
      query: `query {
        operaList{
          name
          locale: uri
          path: url
          icon: iconfont
          children {
            name
            locale: uri
            path: url
            icon: iconfont
          }
        }
      }`
    }
  });
}

// 获取Opera
export async function fetchOpera({ page = 1 }): Promise<Object> {
  console.log(page)
  return request('/graphql', {
    method: 'POST',
    data: {
      query: `query {
        operaList{
          key: id
          value: id
          id
          title: name
          name
          parentId
          uri
          isMenu
          url
          iconfont
          describe
          status
          sort
          children {
            key: id
            value: id
            id
            title: name
            name
            parentId
            uri
            isMenu
            url
            iconfont
            describe
            status
            sort
            children{
              key: id
              value: id
              id
              title: name
              name
              parentId
              uri
              isMenu
              url
              iconfont
              describe
              status
              sort
            }
          }
        }
      }`
    }
  });
}

// 新增编辑Opera
export async function mutationOpera(payload: OperaDataItem) {
  return request('/graphql', {
    method: 'POST',
    data: {
      variables: JSON.stringify(payload),
      query: `mutation Mutation(
        $id: Int,
        $name: String!,
        $parentId: Int,
        $uri: String!,
        $isMenu: Boolean,
        $url: String,
        $iconfont: String,
        $describe: String,
        $sort: Int,
        ) {
        mutationOpera(input: {
          id: $id,
          name: $name,
          parentId: $parentId,
          uri: $uri,
          isMenu: $isMenu,
          url: $url,
          iconfont: $iconfont,
          describe: $describe,
          sort: $sort
        }){
          id
          name
        }
      }`
    }
  })
}

//删除Opera
export async function delectOpera(payload: { id: number }) {
  return request('/graphql', {
    method: 'POST',
    data: {
      variables: JSON.stringify(payload),
      query: `mutation Delete(
        $id: Int!
      ){
        deleteOpera(id: $id) {
          code
          summary
        }
      }`
    }
  })
}
