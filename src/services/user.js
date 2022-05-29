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
  return request('/api/users/delstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}
/**更改学生信息 */
export async function updstudent(params) {
  return request('/api/users/updstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params[0])
  })
}

/**查找学生信息 */
export async function searchstudent(keywords) {
  return request(`/api/users/infostudent?keywords=${keywords}`, {
    method: 'GET',
  })
}

/**添加学生信息 */
export async function addstudent(params) {
  //console.log(params);
  return request('/api/users/addstudent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

/**更改密码（目前只有学生） */
export async function updpassword(params) {
  return request('/api/users/updpwd', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params.values[0])
  })
}

/**获取教师信息 */
export async function infoteacher() {
  return request(`/api/users/infoteacher`, {
    method: 'GET',
  })
}

/**添加教师信息 */
export async function addteacher(params) {
  console.log(params);
  return request('/api/users/addteacher', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

/**修改教师信息 */
export async function updteacher(params) {
  return request('/api/users/updteacher', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params[0])
  })
}

/**删除教师信息 */
export async function delteacher(params) {
  //console.log(params);
  return request('/api/users/delteacher', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

/**查找教师信息 */
export async function searchteacher(keywords) {
  return request(`/api/users/infoteacher?keywords=${keywords}`, {
    method: 'GET',
  })
}