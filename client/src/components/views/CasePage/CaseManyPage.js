import React, {useEffect, useState} from 'react'
import {Row, Button} from 'antd';
import axios from 'axios';
import GridCard from '../GridCard/GridCard';




function CaseManyPage() {
    
    const [CaseData, setCaseData] = useState([]);

    useEffect(() => {
         axios.get('/api/case', {
            headers: {
                'Content-Type': 'application/json',
                'menu' : 'all'
            }
        }).then(response => {
            setCaseData(response.data.data);
            console.log(response.data.data);
        });
    }, []);

    const onClickHandler = () => {
        alert('load more');
        console.log(CaseData);
    };

    return (
      <>
        <div
          style={{
            width: "100%",
            margin: "0",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "gray",
          }}
        >
          <h1>CaseManyPage</h1>
        </div>
        <br />
        <div style={{ width: "76%", margin: "1rem auto" }}>
          <h2>CaseManyPage</h2>
          <hr />
          <br />
         
          <Row gutter={[16, 16]}>
            {/** grid card */}
            {CaseData && CaseData.map((cases, index) => (
                 <React.Fragment key={index}>
                     <GridCard casedata = {cases} />
               </React.Fragment>
            ))}
          </Row>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={onClickHandler}>Load More</Button>
        </div>
      </>
    );
}

export default React.memo(CaseManyPage)



