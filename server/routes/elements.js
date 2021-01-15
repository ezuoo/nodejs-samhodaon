const express = require("express");
const router = express.Router();
const { Element } = require("../models/Element");

/**
 * 1개의 row로 관리된다
 * 컬럼의 값들은 모두 배열안에 존재한다.
 * 완료 : 생성, 추가, 삭제, 전부 삭제,  읽기
 * 추가 기능 : 특정 필드 전부 삭제, 값 수정
 */

/** POST
 *  insert data in database
 */
router.post("", (req, res) => {
  let row = new Element(req.body);

  row.save((err, data) => {
    if (err) return res.json({ success: false, status: "POST", error: err });
    return res.json({ success: true, status: "POST", data: data });
  });
});

/** GET
 *  fetch data from database
 */
router.get("", (req, res) => {
  Element.find((err, data) => {
    if (err) return res.json({ success: false, status: "GET", error: err });
    if (data.length === 0) return res.json({ success: false, status: "GET", error: "no query" });

    return res.json({ success: true, status: "GET", data: data });
  });
});

/** UPDATE 
 * There are two cases.
 * 1. push data 
 * 2. edit existing data
*/
router.patch("", (req, res) => {
  const status = req.body.status;

  if (status === "push") {
    Element.pushElement(req.body, (err, data) => {
      if (err) return res.json({ success: false, status: "PATCH (PUSH)", error: err });

      return res.json({ success: true, status: "PATCH (PUSH)" });
    });
  } else {
    Element.editElement(req.body, (err, data) => {
      if (err) return res.json({ success: false, status: "PATCH (EDIT)", error: err });
      return res.json({ success: true, status: "PATCH (EDIT)" });
    });
  }
});

/** DELETE 
 *  There are two cases.
 *  1. delete item 
 *  2. delete document
 */
router.delete("", (req, res) => {
  const status = req.body.status;

  if(status === 'item') {
    Element.pullElement(req.body, (err, data) => {
      if(err) return res.json({ success: false, status: "DELETE (ITEM)", error: err});
      return res.json({ success: true, status: "DELETE (ITEM)"});
    });
  } else { // status === document
    Element.deleteOne()
      .then((data) => res.json({ success: true, status: "DELETE (DOCUMENT)" }))
      .catch((err) => res.json({ success: false, status: "DELETE (DOCUMENT)", error: err }));
  }
});

module.exports = router;
