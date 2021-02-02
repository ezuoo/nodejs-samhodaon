import React from 'react'
import {  Layout, Typography } from 'antd';

const {Title} = Typography;
const { Header } = Layout;

function AdminPageNav() {
    console.log('admin page nav');
    return (
        <Header style={{ display:'flex', backgroundColor: '#fff', height: '80px', justifyContent: 'center'}}>
              <div style={{width:'90%', height: '100%', paddingTop: '2rem'}}>
                  <a href="/admin"><Title level={3}>DAON</Title></a>
              </div>
        </Header>
    )
}

export default React.memo(AdminPageNav)
