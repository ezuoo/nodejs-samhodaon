import React from 'react';
import { Table, Button, Tooltip, Form, Popconfirm, Input, Space } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import './style.css';

import axios from 'axios';

function AdminTable(props) {
    const [form] = Form.useForm();
    const [count, setCount] = React.useState(props.data.length + 1);
    const [editingKey, setEditingKey] = React.useState('');
    const [dataSource, setDataSource] = React.useState([]);  

    const EditableContext = React.createContext(null); 
    const isEditing = (record) => record.key === editingKey;
    
    const query = (data) => {
      switch (data.status) {
        case 'save':
          // to do error handling
          axios.patch('/api/elements', data);
          break;
        case 'del':
          axios.delete(`/api/elements?${data.field}=${data.value}`);
          break;
        default:
          break;
      }
    }

    const setUpData = React.useCallback(() => {
      let newData = props.data.map((v,index)=> ({
            key : `${props.field}${index + 1}`,
            category : props.name, 
            data : v
          })
      )
      setDataSource(newData)
    },[props.name])

    React.useLayoutEffect(() =>{
          setUpData();
    },[setUpData]); 

    const EditableRow = ({ index, ...datas }) => {
      return (
        <Form form={form} component={false}>
          <EditableContext.Provider value={form}>
            <tr {...datas} />
          </EditableContext.Provider>
        </Form>
      );
    };
    const EditableCell = ({ title, editing, children, dataIndex, record, ...restProps }) => {
      const inputRef = React.useRef(null);
      

      const childNode = ( editing === true ? (
          <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{required: true, message: '값을 입력해주세요.'}]}>
              <Input ref={inputRef} />
          </Form.Item>
      ) : (children) );
      
       return <td {...restProps}>{childNode}</td>;
    
    
    };

    const handelAdd = () => {
      const cnt = count;
      const data = dataSource;
      const newData = {
        key: `${props.field}${cnt}`,
        category: props.name,
        data: ''
      };
      form.setFieldsValue({ data: newData.data, ...newData}); 
      setEditingKey(newData.key);
      setCount(cnt + 1);
      setDataSource([...data, newData])
    
    };

    const handleEdit = (record) => {
      form.setFieldsValue({ data: record.data, ...record});
      setEditingKey(record.key);
    };

    const handleSave = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...dataSource];
          const index = newData.findIndex((item) => key === item.key);
          
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setDataSource(newData);
            setEditingKey('');
            query({ status : 'save', field: props.field, value : newData.map( x => x.data)});
          } else {
            newData.push(row);
            setDataSource(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (record) => {
        const data = [...dataSource];
        setDataSource(data.filter((item) => item.key !== record.key));
        query({status: 'del', field: props.field, value : record.data });
    }
    
    const handleCancel = () => {
        setEditingKey('');
    };
    
    const columns = [
        {
          title: '분류',
          dataIndex: 'category',
          width: '15%',
          align: 'center',
          editable: false,
        },
        {
          title: '데이터',
          dataIndex: 'data',
          width: '40%',
          align: 'center',
          editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            width: '30%',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return dataSource.length >= 1 ? 
                (
                    editable === true ? 
                    (
                        <Space size="middle">
                            <Button onClick={()=>handleSave(record.key)}>저장</Button>
                            <Button onClick={handleCancel}>취소</Button>
                        </Space>
                    ) 
                    : 
                    (
                        <Space size="middle">
                            <Button onClick={()=>handleEdit(record)}> 수정</Button>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                                 <Button>삭제</Button>
                            </Popconfirm>
                        </Space>
                    )
                    
                )
                : null
            }
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return { ...col, onCell: (record) => ({
                                    record,
                                    dataIndex: col.dataIndex,
                                    title: col.title,
                                    editing: isEditing(record)
                          })
        };
    });

    const components = {  
      body: { row: EditableRow, cell: EditableCell }
    }

    return (
        <div>
            <div style={{ /* display: 'flex', justifyContent:'flex-end', */marginBottom: '1rem'}}>
                <Tooltip title="새 데이터 추가">
                    <Button onClick={handelAdd} shape="circle" icon={<PlusOutlined />} />
                </Tooltip>
            </div>
            <Table 
                bordered 
                columns={mergedColumns} 
                components={components} 
                dataSource={dataSource}
                pagination={false} 
                rowClassName={() => 'editable-row'} 
            />
        </div>
     
    )
}

export default React.memo(AdminTable)
