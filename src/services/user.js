/* eslint-disable */
import { request } from 'umi';

/**获取学生信息 */
export async function infostudent() {
  return request(`/api/users/infostudent`, {
    method: 'GET',
  })
}

/**删除学生信息 */
export async function delstudent(params) {
  //console.log(params.values);
  return request('/api/users/delstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.values)
  })
}
/**更改学生信息 */
export async function updstudent(params) {
  return request('/api/users/updstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.values[0])
  })
}

/**查找学生信息 */
export async function searchstudent(params) {
  const { keywords } = params
  return request(`/api/users/infostudent?keywords=${keywords}`, {
    method: 'GET',
  })
}

export async function addstudent(params) {
  //console.log(params);
  return request('/api/users/addstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.values)
  })
}

export async function updpassword(params) {
  return request('/api/users/updpwd', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.values[0])
  })
}
