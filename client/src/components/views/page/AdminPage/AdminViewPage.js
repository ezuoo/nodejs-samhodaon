import React from 'react'
import {Typography} from 'antd'

const { Title } = Typography;

function AdminViewPage() {
    
    return (
        <React.Fragment>
            <Title level={1}>슬라이드 뷰 페이지</Title>
        </React.Fragment>
    )
}

export default React.memo(AdminViewPage)
