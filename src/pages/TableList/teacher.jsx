import React, { Fragment, useState, Component } from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Form, Typography, Button, Select, message } from 'antd';
import styles from './index.less'
import { login } from '@/services/ant-design-pro/api';
import Addteacher from './formteacher'
import { delteacher, updteacher, addteacher } from '@/services/user'
import { request } from 'umi';


const { nanoid } = require('nanoid')

const { Search } = Input
const { Option } = Select

@connect(({ infoteacher, loading }) => ({
    infoteacher,
    loading: loading.models.infoteacher,
}))

export default class TableList_teacher extends Component {
    constructor() {
        super()
        this.state = {
            showAdd: false,
            dataAdd: [],
        }
    }

    componentDidMount() {

        const { dispatch } = this.props

        dispatch({
            type: 'infoteacher/fetch',
        })
    }
    render() {

        const EditableCell = ({
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        }) => {
            return (
                <td {...restProps}>
                    {editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    ) : (
                        children
                    )}
                </td>
            );
        };



        const EditableTable = () => {
            const teacherInfoData = [];

            this.props.infoteacher.teacherInfoData && this.props.infoteacher.teacherInfoData.map(item => {
                teacherInfoData.push(item)
            })

            const [form] = Form.useForm();
            const [data, setData] = useState(teacherInfoData);
            const [editingKey, setEditingKey] = useState('');

            const isEditing = (record) => record.teacherId === editingKey;

            const edit = (record) => {
                form.setFieldsValue({
                    ...record,
                });
                setEditingKey(record.teacherId);
            };



            const cancel = () => {
                setEditingKey('');
            };

            const save = async (key) => {
                try {
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.teacherId);

                    if (index > -1) {
                        const item = newData[index];
                        newData.splice(index, 1, { ...item, ...row });
                        setData(newData);
                        setEditingKey('');
                    } else {
                        newData.push(row);
                        setData(newData);
                        setEditingKey('');
                    }

                    const values = []
                    newData.map(item => {
                        if (item.IdCard === row.IdCard) values.push(item)
                    })

                    const { dispatch } = this.props
                    let response = await updteacher(values)
                    if (response.code == 200) {
                        dispatch({
                            type: 'infoteacher/fetch',
                        })
                    }

                } catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            };

            const del = async (record) => {
                const { dispatch } = this.props

                let response = await delteacher(record)
                if (response.code == 200) {
                    dispatch({
                        type: 'infoteacher/fetch',
                    })
                }

            }

            const columns = [
                {
                    title: '教工号',
                    dataIndex: 'teacherNumber',
                    width: '8%',
                    editable: true,
                },
                {
                    title: '姓名',
                    dataIndex: 'teacherName',
                    width: '10%',
                    editable: true,
                },

                {
                    title: '性别',
                    dataIndex: 'sex',
                    width: '8%',
                    editable: true,
                },
                {
                    title: '身份证号',
                    dataIndex: 'IdCard',
                    width: '15%',
                    editable: true,
                },
                {
                    title: '学院',
                    dataIndex: 'institute',
                    width: '8%',
                    editable: true,
                },
                {
                    title: '政治面貌',
                    dataIndex: 'political',
                    width: '10%',
                    editable: true,
                },
                {
                    title: '电话号码',
                    dataIndex: 'phone',
                    width: '12%',
                    editable: true,
                },
                {
                    title: '毕业学校',
                    dataIndex: 'school',
                    width: '15%',
                    editable: true,
                },
                {
                    title: '学历',
                    dataIndex: 'educational',
                    width: '8%',
                    editable: true,
                },
                {
                    title: '入职时间',
                    dataIndex: 'entryTime',
                    width: '10%',
                    editable: true,
                },
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (_, record) => {
                        const editable = isEditing(record);
                        return editable ? (
                            <span>
                                <Typography.Link
                                    onClick={() => save(record.teacherId)}
                                    style={{
                                        marginRight: 8,
                                    }}
                                >
                                    Save
                                </Typography.Link>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <div>
                                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    Edit
                                </Typography.Link>
                                <Typography.Link onClick={() => del(record)} style={{ marginLeft: '5px' }}>
                                    Delete
                                </Typography.Link>
                            </div>

                        );
                    },
                },
            ];
            const mergedColumns = columns.map((col) => {
                if (!col.editable) {
                    return col;
                }

                return {
                    ...col,
                    onCell: (record) => ({
                        record,
                        inputType: col.dataIndex === 'age' ? 'number' : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: isEditing(record),
                    }),
                };
            });
            return (
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            );
        };


        const onSearch = async (value = '') => {
            const { dispatch } = this.props

            dispatch({
                type: 'infoteacher/fetchSearch',
                payload: value
            }).then(() => {
                //console.log(this.props.infoteacher.noFind);
                if (value && this.props.infoteacher.noFind == 1) {
                    message.error('没有这个用户')
                }
            })

        }

        const onClose = (value) => {
            if (value == true) {
                this.setState({
                    showAdd: false
                })
            }
        }

        const getData = async (values) => {
            values.teacherId = nanoid()
            this.state.dataAdd.push(values)

            let response = await addteacher(values)

            const { dispatch } = this.props

            if (response.code == 200) {
                dispatch({
                    type: 'infoteacher/fetch',
                })
            }


        }


        return (
            <Fragment>
                <h1 className={styles.title}>教师信息查询</h1>
                <Button
                    type='primary'
                    style={{ float: 'right', marginRight: '10px' }}
                    onClick={() => this.setState({
                        showAdd: true
                    })}
                >添加教师
                </Button>
                {
                    this.state.showAdd == true
                        ?
                        <Addteacher showAdd={this.state.showAdd} onClose={onClose} getData={getData}></Addteacher>
                        :
                        null
                }
                <Search placeholder="请输入教师姓名" onSearch={onSearch} className={styles.ipt} />
                <EditableTable className={styles.table} />
            </Fragment>
        )
    }
}


