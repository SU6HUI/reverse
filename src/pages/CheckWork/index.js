import React, { Fragment } from 'react'
import styles from './index.less'
import { Button } from 'antd';

export default function CheckWork() {
  return (
    <Fragment>
      <h1>作业详情</h1>
      <div className={styles.tab}>
        <table border="1">
          <tr>
            <td>作业题目</td>
            <td>自我介绍</td>
          </tr>
          <tr>
            <td>作业要求1</td>
            <td>个人信息</td>
          </tr>
          <tr>
            <td>作业要求2</td>
            <td>自我介绍</td>
          </tr>
          <tr>
            <td>参考答案</td>
            <td>自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍</td>
          </tr>
          <tr>
            <td>评分标准1</td>
            <td>自我介绍</td>
          </tr>
          <tr>
            <td>评分标准2</td>
            <td>自我介绍</td>
          </tr>
        </table>
        <Button type="primary" className={styles.btn}>点击上传</Button>
      </div>

    </Fragment>

  )
}
