import React, { Fragment, useState, Component } from 'react';
import { connect } from 'dva';
import { Table, Input, Popconfirm, Form, Typography, Button, Select, message } from 'antd';
import styles from './index.less'
import { login } from '@/services/ant-design-pro/api';
import Addmanager from './formmanager'
import { request } from 'umi';
import { addmanager, updmanager, delmanager } from '@/services/user'



const { nanoid } = require('nanoid')

const { Search } = Input
const { Option } = Select

//2022-05-07
//目前有两个问题：1.分页器 2.目前编辑模块采用的是managerId当作key 3.查询只能查全名(可以后端配正则)

@connect(({ infomanager, loading }) => ({
    infomanager,
    loading: loading.models.infomanager,
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
            type: 'infomanager/fetch',
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
            const managerInfoData = [];


            this.props.infomanager.managerInfoData && this.props.infomanager.managerInfoData.map(item => {
                managerInfoData.push(item)
            })

            const [form] = Form.useForm();
            const [data, setData] = useState(managerInfoData);
            const [editingKey, setEditingKey] = useState('');

            const isEditing = (record) => record.managerId === editingKey;

            const edit = (record) => {
                form.setFieldsValue({
                    ...record,
                });
                setEditingKey(record.managerId);
            };



            const cancel = () => {
                setEditingKey('');
            };

            const save = async (key) => {
                try {
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.managerId);

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

                    let response = await updmanager(values)
                    //console.log(response);
                    if (response.code == 200) {
                        dispatch({
                            type: 'infomanager/fetch',
                        })
                    }



                } catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            };

            const del = async (record) => {
                const { dispatch } = this.props

                let response = await delmanager(record)
                if (response.code == 200) {
                    dispatch({
                        type: 'infomanager/fetch',
                    })
                }

            }

            const columns = [
                {
                    title: '教工号',
                    dataIndex: 'managerNumber',
                    width: '8%',
                    editable: true,
                },
                {
                    title: '姓名',
                    dataIndex: 'managerName',
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
                    title: '职位',
                    dataIndex: 'position',
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
                                    onClick={() => save(record.managerId)}
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
            const { dispatch } = this.props

            dispatch({
                type: 'infomanager/fetchSearch',
                payload: value
            }).then(() => {
                if (value && this.props.infomanager.noFind == 1) {
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

            values.managerId = nanoid()

            this.state.dataAdd.push(values)

            const { dispatch } = this.props

            let response = await addmanager(values)
            if (response.code == 200) {
                dispatch({
                    type: 'infomanager/fetch',
                })
            } else {
                message.error('添加失败')
            }


        }


        return (
            <Fragment>
                <h1 className={styles.title}>管理员信息查询</h1>
                <Button
                    type='primary'
                    style={{ float: 'right', marginRight: '10px' }}
                    onClick={() => this.setState({
                        showAdd: true
                    })}
                >添加管理员
                </Button>
                {
                    this.state.showAdd == true
                        ?
                        <Addmanager showAdd={this.state.showAdd} onClose={onClose} getData={getData}></Addmanager>
                        :
                        null
                }
                <Search placeholder="请输入管理员姓名" onSearch={onSearch} className={styles.ipt} />
                <EditableTable className={styles.table} />
            </Fragment>
        )
    }
}


