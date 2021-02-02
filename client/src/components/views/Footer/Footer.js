import React from 'react'
import { Typography } from 'antd';

const { Text } = Typography;

function Footer() {

  

    return (
        <div style={{
            height: '80px', display: 'flex', marginLeft:'12%',
            flexDirection: 'column', alignItems: 'flex-start',
            justifyContent: 'center', fontSize:'1rem'
        }}>
            <b>다온인테리어</b>
            <Text>대표자명: 정재민</Text> 
            <Text>주소 : 경기 안양시 동안구 관평로 138번길 53 초원부영상가 1층</Text>
            <Text>사업자 등록번호: 217-11-89424</Text> 
            <Text>Copyright (c)2016 DAON interior, Ltd. All Right Reserved.</Text>
            <Text strong>Ant Design (strong)</Text>
        </div>
    )
}

export default Footer
