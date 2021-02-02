import React from 'react'
import {Typography} from 'antd'

const { Title } = Typography;
function AdminQnaPage() {
    return (
        <React.Fragment>
            <Title level={1}>견적문의 페이지</Title>
        </React.Fragment>
    )
}

export default React.memo(AdminQnaPage)

