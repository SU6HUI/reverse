import React, { Fragment, Component } from 'react'
import styles from './table.less'
import { Button } from 'antd';
import { connect } from 'dva';

//获取url的id
const id = window.location.search.split('=')[1]

@connect(({ infowork, loading }) => ({
    infowork,
    loading: loading.models.infowork
}))
export default class CheckWorkTable extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'infowork/detailfetch',
            payload: {
                id
            }
        })
    }
    openDetail = () => {
        let value = window.location.search
        let id = value.split('=')[1]
        window.open('/checkwork/commit?id=' + id, '_self')
    }

    render() {
        //console.log(this.props.infowork);
        return (
            <Fragment>
                <div className={styles.tab}>
                    {this.props.infowork.data &&
                        <table border="1">
                            <tr>
                                <td>作业题目</td>
                                <td>{this.props.infowork.data.work_title}</td>
                            </tr>
                            <tr>
                                <td>作业要求1</td>
                                <td>{this.props.infowork.data.request_1}</td>
                            </tr>
                            <tr>
                                <td>参考答案</td>
                                <td>{this.props.infowork.data.answer_1}</td>
                            </tr>
                            <tr>
                                <td>评分标准1</td>
                                <td>{this.props.infowork.data.standard}</td>
                            </tr>
                        </table>}
                    <Button
                        type="primary"
                        className={styles.btn}
                        onClick={(e) => this.openDetail(e)}
                    >点击上传</Button>
                </div>
            </Fragment>
        )
    }
}
