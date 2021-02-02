import React from "react";
import axios from 'axios';
import BodyTop from '../../commons/BodyTop';
function CaseOnePage(props) {
    let caseId = props.match.params.caseId;

    const fetchData = React.useCallback(async () => {
      const ret = await axios.get(`/api/cases/${caseId}`);
      const caseData = ret.data;
      console.log(caseData)
  },[caseId]);
 
  React.useEffect(() => {
    fetchData();
  }, [fetchData])



    // server 쪽 get method 수정 필요 !!!
  return (
    <>
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <BodyTop title="CaseOnePage" />
        <br />
        <div style={{ width: "76%", margin: "1rem auto" }}>
          <h2>{caseId}</h2>
          <hr />
          <br />
        </div>
      </div>
      
    </>
  );
}

export default CaseOnePage;
