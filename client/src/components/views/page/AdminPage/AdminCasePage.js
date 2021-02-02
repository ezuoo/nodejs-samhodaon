import React from 'react'
import {Typography} from 'antd'

const { Title } = Typography;

function AdminCasePage() {
    console.log('admin case page');
    return (
        <React.Fragment>
            <Title level={1}>사례 페이지</Title>
        </React.Fragment>
    )
}

export default React.memo(AdminCasePage)
