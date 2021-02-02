import React from "react";

function BodyTop(props) {
  return (
    <div>
      <div
        style={{width: "100%", margin: "0", height: "300px", display: "flex",
            alignItems: "center", justifyContent: "center", backgroundColor: "gray"}}>
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}

export default React.memo(BodyTop);
