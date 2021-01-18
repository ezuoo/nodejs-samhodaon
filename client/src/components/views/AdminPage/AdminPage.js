import React from 'react'
import {Row, Button} from 'antd';

function AdminPage() {
    /**
     * 1. 관리자 로그인
     * 2. 필터 수정
     * 3. case 업로드 
     * 4. case 수정
     * 5. case 삭제 (선택 or 전부)
     * 6. 
     */
    const onClickHandler = () => {
        alert('load more');
    };

    return (
        <>
            <div style={{width:'100%', margin:'0', height:'400px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/** main image <div style={{display:'flex'}}></div>*/}
                
                    <h1>admin page</h1>                    
            </div>
            <br />    
            <div style={{width: '76%', margin: '1rem auto'}}>
                <h2>admin page</h2>
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

export default AdminPage
