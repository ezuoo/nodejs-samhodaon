import React from 'react'
import {Row, Button} from 'antd';
import BodyTop from '../../commons/BodyTop';
function LandingPage() {
    const onClickHandler = () => {
        alert('load more');
    };

    return (
        <>
            <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
                <BodyTop title="Main Page" />
                <br />    
                <div style={{width: '76%', margin: '1rem auto'}}>
                    <h2>베스트 인테리어</h2>
                    <hr />
                    <br />
                
                    <Row gutter={[16, 16]}>
                        { /** grid card */}
                    </Row>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={onClickHandler}>Load More</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage
