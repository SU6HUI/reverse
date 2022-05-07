/* eslint-disable */
import { request } from 'umi';

/**获取学生信息 */
export async function infostudent() {
  return request('/api/users/infostudent', {
    method: 'GET',
  })
}

/**删除学生信息 */
export async function delstudent(params) {
  console.log(params.values);
  return request('/api/users/delstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.values)
  })
}
