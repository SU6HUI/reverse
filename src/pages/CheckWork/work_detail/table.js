import React, { Fragment, Component } from 'react'
import styles from './table.less'
import { Button } from 'antd';
import { connect } from 'dva';

//获取url的id
const id = window.location.search.split('=')[1]

@connect(({ infodetail, loading }) => ({
    infodetail,
    loading: loading.models.infodetail
}))
export default class CheckWorkTable extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'infodetail/fetch',
            payload: {
                id
            }
        })
    }

    render() {
        console.log(this.props.infodetail.data);
        return (
            <Fragment>
                <div className={styles.tab}>
                    {this.props.infodetail.data &&
                        <table border="1">
                            <tr>
                                <td>作业题目</td>
                                <td>{this.props.infodetail.data.work_title}</td>
                            </tr>
                            <tr>
                                <td>作业要求1</td>
                                <td>{this.props.infodetail.data.request_1}</td>
                            </tr>
                            <tr>
                                <td>参考答案</td>
                                <td>{this.props.infodetail.data.answer_1}</td>
                            </tr>
                            <tr>
                                <td>评分标准1</td>
                                <td>{this.props.infodetail.data.standard}</td>
                            </tr>
                        </table>}
                    <Button type="primary" className={styles.btn}>点击上传</Button>
                </div>
            </Fragment>
        )
    }
}
