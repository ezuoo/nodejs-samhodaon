import React from "react";
import {Typography} from 'antd'

const { Title } = Typography;

function AdminPage() {
    console.log('admin page');
  return (
    <React.Fragment>
        <Title level={1}>Col 19</Title>
    </React.Fragment>
  );
}

export default AdminPage;
/* 
const data = [
  '관리자 로그인',
  '필터 관리 - 추가 / 수정 / 삭제',
  '사례 관리 - 추가 / 수정 / 삭제',
  '슬라이드 뷰 관리 - 추가 / 수정 / 삭제',
  '회사 소개 - 수정',
  '견적 문의 목록 리스트'
];

 <>
       <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
           <div style={{ width: '80%'}}>
            <Divider orientation="left">TODO LIST</Divider>
                <List
                size="small"
            
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                />
           </div>
       </div>
      </>

*/

/*  if (Object.values(x)[0] === null) {
                const url = `/admin/${key}`;
                return (
                  <Menu.Item key={index + 1} icon={<MailOutlined />}>
                    <Link to={url}>{Object.keys(x)}</Link>
                  </Menu.Item>
                );
              } else {
                return (
                  <SubMenu key={key} icon={<MailOutlined />} title={<span>{Object.keys(x)}</span>} style={{ fontSize: "16px" }}>
                    {Object.values(x)[0] !== null &&
                      Object.values(x)[0].map((y, index) => {
                        const url = `/admin/${key}/${index + 1}`;
                        return (
                          <Menu.Item key={index + 1}>
                            <Link to={url}>{y}</Link>
                          </Menu.Item>
                        );
                      })}
                  </SubMenu>
                );
              } */
