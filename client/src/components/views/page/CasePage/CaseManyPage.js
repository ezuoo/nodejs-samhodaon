import React, {useState} from 'react'
import axios from 'axios';
import {Row, Col, Button, Typography, Layout } from 'antd';


import GridCard from '../../commons/GridCard';
import BodyTop from '../../commons/BodyTop';
import Filter from './Section/SideBar';


const { Title } = Typography;
const { Footer, Content } = Layout;

function CaseManyPage() {
    const [CaseData, setCaseData] = useState([]);
   
    const fetchData = React.useCallback(async () => {
      const ret = await axios.get('/api/cases');
      const res = ret.data;
      setCaseData(res.data);
    }, []);

    const onClickHandler = () => {
       alert('load more');
   };    

    React.useEffect(() => {
      fetchData();
    }, [fetchData]);

    return (
      <>
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
      <Layout style={{ backgroundColor: "white" }}>
          <BodyTop title="CaseManyPage" />
          <Content>
            <Row gutter={[8, 8]} style={{ /* border: "1px solid black", */ marginTop: "1.5rem" }}>
              
              {/* SIDER BAR */}
              <Col span={4}>
                <Filter setCaseData={setCaseData} />
              </Col>

              {/* BODY CONTENT SECTION */}
              <Col span={17} style={{ border: "1px solid black" }}>
                <Title level={3}>시공사례</Title>

                <hr />
                <br />

                <Row gutter={[16, 16]}>
                  {CaseData &&
                    CaseData.map((cases, index) => (
                      <React.Fragment key={index}>
                        <GridCard casedata={cases} />
                      </React.Fragment>
                    ))}
                </Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={onClickHandler}>Load More</Button>
                </div>
              </Col>
              {/* <Col span={3} style={{border: '1px solid black'}}> col-6</Col> */}
            </Row>
          </Content>

          <Footer>

          </Footer>
        </Layout>
      </div>
      </>
    );
}

export default React.memo(CaseManyPage)



