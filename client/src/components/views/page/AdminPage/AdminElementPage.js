import React from 'react'
import axios from 'axios'
import {Typography, Row, Tabs} from 'antd'

import ElementTable from '../AdminPage/Section/AdminTable';


const { Title } = Typography;
const { TabPane } = Tabs;

const callback = (key) => {
    console.log(key);
  }
const toKR = (name) => {
    switch (name) {
        case 'division':
            return '공간'
        case 'color':
            return '색상'
        case 'area':
            return '평수'
        case 'style':
            return '스타일'
        case 'section':
            return '영역'
        default:
            break;
    }
}

function AdminElementPage() {
    const [elements, setElements] = React.useState();

    const fetchElements = React.useCallback(async () => {
        const response = await axios.get('/api/elements');
        const result = response.data.data[0];
        const filteredData = Object.entries(result).filter((value)=> typeof value[1] === 'object')
        setElements(filteredData)
    },[])

    
    
    React.useEffect(() => {
        fetchElements();
    },[fetchElements]);

    /* console.log('elements : ', elements) */
    return (
        <React.Fragment>
            <Title level={2}>필터 관리</Title>
            <Row style={{/* border: '1px solid black', */ backgroundColor: 'white', marginTop: '3rem', minHeight: '70vh'}}>
                <Tabs onChange={callback} type="card" style={{width: '100%'}}>
                    {elements && elements.map( (v,index)=> {
                             const tabName = toKR(v[0]);
                            return (<TabPane tab={tabName} key={index+1} style={{width: '90%',marginLeft:'3rem'}}>
                                            <ElementTable name={tabName} field={v[0]} data={v[1]} />
                                    </TabPane>)
                        })
                    }
                </Tabs>
                
            </Row>
        </React.Fragment>
    )
}

export default React.memo(AdminElementPage);
