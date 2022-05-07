import React, { Fragment, useState, Component } from 'react';
import { connect } from 'dva';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import styles from './index.less'

@connect(({ infostudent, loading }) => ({
    infostudent,
    loading: loading.models.infostudent,
}))

export default class TableList extends Component {
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

            const isEditing = (record) => record.key === editingKey;

            const edit = (record) => {
                form.setFieldsValue({
                    ...record,
                });
                setEditingKey(record.key);
            };



            const cancel = () => {
                setEditingKey('');
            };

            const save = async (key) => {
                try {
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.key);

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
                    //newData：更新过的数据



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
                })

                dispatch({
                    type: 'infostudent/fetch',
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
                                    onClick={() => save(record.key)}
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

        return (
            <Fragment>
                <h1 className={styles.title}>学生信息查询</h1>
                <EditableTable className={styles.table} />
            </Fragment>
        )
    }
}





