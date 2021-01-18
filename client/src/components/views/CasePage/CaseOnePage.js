import React from "react";

function CaseOnePage(props) {
    let caseId = props.match.params.caseId;

    // server 쪽 get method 수정 필요 !!!
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
        <h1>CaseOnePage</h1>
      </div>
      <br />
      <div style={{ width: "76%", margin: "1rem auto" }}>
        <h2>{caseId}</h2>
        <hr />
        <br />

       
      </div>
    </>
  );
}

export default CaseOnePage;
