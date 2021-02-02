import React from 'react';
import { Table, Input, Popconfirm, Form, Typography, Space, Tooltip, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

const originData = [];

for (let i = 0; i < 3; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32
    });
  }

const EditableCell = 
    ({editing, dataIndex, title, record, index, children, ...restProps}) => {
    const inputNode =  <Input />;
   
    return (
      <td {...restProps}>
        {editing ? ( <Form.Item name={dataIndex} style={{ margin: 0 }} 
                            rules={[{ required: true, message: `${title} 값을 입력하세요`}]}>
                        {inputNode}
                    </Form.Item>) 
                    : 
                    ( children )}
      </td>
    );
  }; 
 

function TableTest() {
    console.log('================================render================================')
    const [form] = Form.useForm();
    const [data, setData] = React.useState(originData);
    const [editingKey, setEditingKey] = React.useState('');
    const [addCheck, setAddCheck] = React.useState(false);
    const isEditing = (record) => record.key === editingKey;

    const add = () => {
        console.log('handling add');
    } 

    const del = (record) => {
        console.log('del : ', record)
    }

    const edit = (record) => {
        form.setFieldsValue({ age: '', ...record});
        setEditingKey(record.key);
        console.log('edit :', record)
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
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    
    const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: false,
    },
    {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
        const editable = isEditing(record);
        if(addCheck === true) {
            return (
                <Space size="middle">
                     <Button onClick={() => {
                        /* insert(record.key); */
                        setAddCheck(false);
                     }} style={{ marginRight: 8}} >
                        Save
                    </Button>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                         <a href='#!'>Cancel</a>
                     </Popconfirm>
                </Space>
            )
        }

        return editable ? (
            <span>
            <a href='#!' onClick={() => save(record.key)} style={{ marginRight: 8}} >
                Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a href='#!'>Cancel</a>
            </Popconfirm>
            </span>
        ) : (
            <Space size="middle">
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                </Typography.Link>
                <Popconfirm title="Sure to delete?" onConfirm={() => del(record)}>
                    <a href='#!'>Delete</a>
                </Popconfirm>
            </Space>
        );
        }
    }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
       
        return {
            ...col, onCell: (record) => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
            })
        };
    });


    return (
        <div>
            <div style={{ /* display: 'flex', justifyContent:'flex-end', */marginBottom: '1rem'}}>
                <Tooltip title="새 데이터 추가">
                    {<Button onClick={add} shape="circle" icon={<PlusOutlined />} />}
                </Tooltip>
            </div>
            <Form form={form} component={false}>
                <Table components={{ body: { cell: EditableCell}}} 
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    pagination={false}
                    />
            </Form>
        </div>
    )
}

export default React.memo(TableTest)

