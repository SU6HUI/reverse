import React, { Fragment, Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { Button, Table, Tag, Space } from 'antd';
import CheckWorkTable from './work_detail/table'

import { connect } from 'dva';

//要根据教师id显示作业
//用router window.open容易xxxx

@connect(({ infowork, loading }) => ({
  infowork,
  loading: loading.models.infowork
}))
export default class CheckWork extends Component {
  state = {
    workData: []
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'infowork/fetch',
    }).then(() => {
      this.setState({
        workData: this.props.infowork.workData
      })
    })
  }
  openDetail = (id) => {
    window.open('/checkwork/info?id=' + id, '_self')
  }
  render() {
    const delWork = id => {
      const { dispatch } = this.props

      dispatch({
        type: 'infowork/delfetch',
        payload: {
          id
        }
      }).then(() => {
        dispatch({
          type: 'infowork/fetch',
        }).then(() => {
          this.setState({
            workData: this.props.infowork.workData
          })
        })
      })
    }
    const columns = [
      {
        title: '作业题目',
        dataIndex: 'work_title',
        key: 'work_title',
        render: (text, record) => (
          <div>
            <a onClick={() => {
              this.openDetail(record.work_id)
            }}>{text}</a>
          </div>
        ),
        width: '20%'
      },
      {
        title: '年级',
        dataIndex: 'state',
        key: 'state',
        width: '10%'
      },
      {
        title: '学院',
        dataIndex: 'institute',
        key: 'institute',
        width: '15%'

      },
      {
        title: '班级',
        dataIndex: 'studentClass',
        key: 'studentClass',
        width: '15%'
      },
      {
        title: '作业要求',
        dataIndex: 'request_1',
        key: 'request_1',
        width: '15%'
      },
      {
        title: '作业标准',
        dataIndex: 'standard',
        key: 'standard',
        width: '15%'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={e => delWork(record.work_id)}>删除</a>
          </Space>
        )
      }

    ];


    return (
      <Fragment>
        <h1 style={{ height: "72px", fontWeight: 700, margin: '20px' }}>作业详情</h1>
        <Table columns={columns} dataSource={this.state.workData} />;

        {/* <CheckWorkTable /> */}

      </Fragment>
    )
  }
}

