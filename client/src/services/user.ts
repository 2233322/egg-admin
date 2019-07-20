import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/graphql', {
    method: 'POST',
    data: {
      query: `query {
        user(id: 1){
          id,
          name,
          email
        }
      }`
    }
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
