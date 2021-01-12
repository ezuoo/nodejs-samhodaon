import React from 'react'
import {Row, Button} from 'antd';

function LandingPage() {
    const onClickHandler = () => {
        alert('load more');
    };

    return (
        <>
            <div style={{width:'100%', margin:'0', height:'400px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/** main image <div style={{display:'flex'}}></div>*/}
                
                    <h1>Main Image</h1>                    
            </div>
            <br />    
            <div style={{width: '76%', margin: '1rem auto'}}>
                <h2>베스트 인테리어</h2>
                <hr />
                <br />
            
                <Row gutter={[16, 16]}>
                    { /** grid card */}
                </Row>
            
            </div>
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={onClickHandler}>Load More</Button>
            </div>
        </>
    )
}

export default LandingPage
