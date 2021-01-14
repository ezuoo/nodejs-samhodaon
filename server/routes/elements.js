const express = require("express");
const router = express.Router();
const { Element } = require("../models/Element");

/**
 * 1개의 row로 관리된다
 * 컬럼의 값들은 모두 배열안에 존재한다.
 * 완료 : 생성, 추가, 삭제, 전부 삭제,  읽기
 * 추가 기능 : 특정 필드 전부 삭제, 값 수정
 */

/** INSERT row */
router.post("", (req, res) => {
  let row = new Element(req.body);

  row.save((err, userInfo) => {
    if (err) return res.json({ success: false, status: "POST", error: err });
    return res.json({ success: true, status: "POST", data: row });
  });
});

/** SELECT and RETURN row  */
router.get("", (req, res) => {
  Element.find((err, data) => {
    if (err) return res.json({ success: false, status: "GET", error: err });
    if (data.length === 0)
      return res.json({ success: false, status: "GET", error: "no query" });

    return res.json({ success: true, status: "GET", data: data });
  });
});

/** DELETE value
 *  기존에 존재하던 값에서 빼야 함.
 */
router.delete("", (req, res) => {
  for (let item in req.body) {
    Element.updateOne(
      { no: parseInt(1) },
      { $pull: { [item]: { $in: req.body[item] } } },
      (err, data) => {
        if (err)
          return res.json({ success: false, status: "DELETE", error: err });
      }
    );
  }
  return res.json({ success: true, status: "DELETE" });
});

/** UPDATE value
 * 기존에 존재하던 값에서 더해야 함.
 */
router.patch("", (req, res) => {
  const status = req.body.status;
  const filter = { no: parseInt(1) };
  if (status === "push") {
    Element.updateOne({ no: parseInt(1) }, { $push: req.body }, (err, data) => {
      if (err)
        return res.json({ success: false, status: "UPDATE PUSH", error: err });

      return res.json({ success: true, status: "UPDATE PUSH" });
    });
  } else {

    Element.findOne(filter, (err, row) => {
      if (err) return res.json({ success: false, status: "query error", error: err });
      if (!row) return res.json({ success: false, status: "Not Found data", error: err});

      const field = req.body.field;

      row[field][row[field].indexOf(req.body.old)] = req.body.new;
      field === 'area' ? row[field].sort((a,b) => a-b) : console.log('# not area : ', field);
      
      row.save((err, data) => {
        if (err) return res.json({ success: false, status: "UPDATE EDIT ERROR", error: err });
        return res.json({ success: true, status: "UPDATE EDIT", data: data }); 
      });

       //console.log(update);
       //let update = { [field]: row[field] };
      
      /* row.updateOne(filter, {}, (err, data) => {
        if (err) return res.json({ success: false, status: "UPDATE EDIT ERROR", error: err });

        console.log('matched : ', data.n);
        console.log('modified : ', data.nModified);
        return res.json({ success: true, status: "UPDATE EDIT" });
      }); */
    });
    
  }
});

/** DELETE all row
 * 테스트용
 */
router.delete("/all", (req, res) => {
  Element.deleteMany()
    .then(() => {
      console.log("deleted data");
      return res.json({ success: true, status: "DELETE" });
    })
    .catch(function (error) {
      return res.json({ success: false, status: "DELETE", error: error });
    });
});

router.get("/test", (req, res) => {
  const filter = { no: parseInt(3) };
  const update = { division: "new new test"};
  Element.testfunc((err, data) => {
    if (err) return res.json({ success: false, msg: 'test function error'});
    return res.json({ success: true, msg: 'test function success'});
  });
});

module.exports = router;
