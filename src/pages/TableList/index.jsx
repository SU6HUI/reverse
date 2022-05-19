import React, { Fragment, useState, Component } from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Form, Typography, Button, Select } from 'antd';
import styles from './index.less'
import { login } from '@/services/ant-design-pro/api';
import Addstudent from './form'


const { nanoid } = require('nanoid')

const { Search } = Input
const { Option } = Select

//2022-05-07
//目前有两个问题：1.分页器 2.目前编辑模块采用的是studentId当作key 3.查询只能查全名(可以后端配正则)

@connect(({ infostudent, loading }) => ({
    infostudent,
    loading: loading.models.infostudent,
}))

export default class TableList extends Component {
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
            type: 'infostudent/fetch',
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
            const originData = [];


            this.props.infostudent.originData && this.props.infostudent.originData.map(item => {
                originData.push(item)
            })

            const [form] = Form.useForm();
            const [data, setData] = useState(originData);
            const [editingKey, setEditingKey] = useState('');

            const isEditing = (record) => record.studentId === editingKey;

            const edit = (record) => {
                form.setFieldsValue({
                    ...record,
                });
                setEditingKey(record.studentId);
            };



            const cancel = () => {
                setEditingKey('');
            };

            const save = async (key) => {
                try {
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.studentId);

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

                    //console.log(values);

                    const { dispatch } = this.props

                    dispatch({
                        type: 'infostudent/fetchUpd',
                        payload: {
                            //更改的那条数据
                            values
                        }
                    }).then(() => {
                        dispatch({
                            type: 'infostudent/fetch',
                        })
                    })



                } catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            };

            const del = (record) => {
                const { dispatch } = this.props

                dispatch({
                    type: 'infostudent/fetchDel',
                    payload: {
                        values: record
                    }
                }).then(() => {
                    dispatch({
                        type: 'infostudent/fetch',
                    })
                })
            }

            const columns = [
                {
                    title: '学号',
                    dataIndex: 'studentNumber',
                    width: '8%',
                    editable: true,
                },
                {
                    title: '姓名',
                    dataIndex: 'studentName',
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
                    title: '年级',
                    dataIndex: 'state',
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
                    title: '学院专业',
                    dataIndex: 'institute',
                    width: '18%',
                    editable: true,
                },
                {
                    title: '班级',
                    dataIndex: 'studentClass',
                    width: '12%',
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
                                    onClick={() => save(record.studentId)}
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

        const onSearch = (value = '') => {
            console.log(value);
            const { dispatch } = this.props
            dispatch({
                type: 'infostudent/fetchSearch',
                payload: {
                    keywords: value
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

        const getData = (values) => {

            values.studentId = nanoid()

            this.state.dataAdd.push(values)

            const { dispatch } = this.props

            dispatch({
                type: 'infostudent/fetchAdd',
                payload: {
                    values
                }
            }).then(() => {
                dispatch({
                    type: 'infostudent/fetch',
                })
            })



        }


        return (
            <Fragment>
                <h1 className={styles.title}>学生信息查询</h1>
                <Button
                    type='primary'
                    style={{ float: 'right', marginRight: '10px' }}
                    onClick={() => this.setState({
                        showAdd: true
                    })}
                >添加学生
                </Button>
                {
                    this.state.showAdd == true
                        ?
                        <Addstudent showAdd={this.state.showAdd} onClose={onClose} getData={getData}></Addstudent>
                        :
                        null
                }
                <Search placeholder="请输入学生姓名" onSearch={onSearch} className={styles.ipt} />
                <EditableTable className={styles.table} />
            </Fragment>
        )
    }
}


