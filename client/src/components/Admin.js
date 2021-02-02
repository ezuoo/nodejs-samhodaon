import React from 'react';
import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";
import { Layout,Row, Col} from 'antd';


import Nav from './views/page/AdminPage/Section/AdminNav';
import Sider from './views/page/AdminPage/Section/AdminSider';

import AdminPage from "./views/page/AdminPage/AdminPage";
import AdminElementPage from './views/page/AdminPage/AdminElementPage'
import AdminCasePage from './views/page/AdminPage/AdminCasePage'


import TestTable from './views/page/AdminPage/Section/TableTest'
import TestTableAdd from './views/page/AdminPage/Section/TableTestAdd'
const {  Content  } = Layout;

/* 각 페이별 세부 카테고리는 탭으로 구성한다. */
/* const page = [
    import('./views/page/AdminPage/AdminElementPage'), 
    import('./views/page/AdminPage/AdminCasePage'),
    import('./views/page/AdminPage/AdminViewPage'),
    import('./views/page/AdminPage/AdminQnaPage')
]; */

const data = [
    {'필터' : ["추가","수정","삭제"]},
    {'사례' : ["추가","수정","삭제"]},
    {'슬라이드 뷰' : ["추가","수정","삭제"]},
    {'견적문의': null }
];

function Admin() {
    return (
        <>
         <Layout>
            <Nav />
            <Content style={{display:'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' , justifyContent: 'center', paddingTop:'5rem'}}>
                <div style={{width:'84%', minHeight: '100vh'}}>
                    <Row style={{ height: '100%'}}>
                    <Router>
                        <Col span={5}>
                            <Sider data={data} />   
                        </Col>

                        <Col span={19} style={{paddingLeft: '5%'}}>
                                <Switch>{/* render={() => <AdminPage />} */}
                                    <Route exact path="/admin" component={AdminPage}/>
                                    <Route  path="/admin/sub1" component={AdminElementPage} />
                                    <Route  path="/admin/sub2" component={AdminCasePage} />
                                    {/* <Route path="/admin/sub2" component={page[1]} />
                                    <Route path="/admin/sub3" component={page[2]} />
                                    <Route path="/admin/sub4" component={page[3]} /> */}
                                    <Route path="/admin/test" component={TestTable} />
                                    <Route path="/admin/testadd" component={TestTableAdd} />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            
                        </Col>
                    </Router>
                    </Row>
                </div>
            </Content>
         </Layout>
        </>
        
    );
}

export default React.memo(Admin);

const NotFoundPage = () => {
    return (<h1> NotFoundPage</h1>);
}


