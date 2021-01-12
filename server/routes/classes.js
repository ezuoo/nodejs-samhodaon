const express = require("express");
const router = express.Router();
const { Class } = require("../models/Class");

/**
 * 1개의 row로 관리된다
 * 컬럼의 값들은 모두 배열안에 존재한다.
 */

/** INSERT row */
router.post("", (req, res) => {
  let row = new Class(req.body);

  row.save((err, userInfo) => {
    if (err) return res.json({ success: false, status: "POST", error: err });
    return res.json({ success: true, status: "POST", data: row });
  });
});

/** SELECT and RETURN row  */
router.get("", (req, res) => {
  Class.find((err, data) => {
    if (err) return res.json({ success: false, status: "GET", error: err });
    if (data.length === 0) return res.json({ success: false, status: "GET", error: 'no query' });
    
    return res.json({ success: true, status: "GET", data: data });
  });
});

/** DELETE value
 *  기존에 존재하던 값에서 빼야 함.
 */
router.delete("", (req, res) => {
    console.log(req.body)
  Class.updateOne({ no: parseInt(1) }, { $pull: req.body },{multi: true}, (err, data) => {
    if (err) return res.json({ success: false, status: "DELETE", error: err });
    
    return res.json({ success: true, status: "DELETE" });
  });
});

/** UPDATE value
 * 기존에 존재하던 값에서 더해야 함.
 */
router.patch("", (req, res) => {
  Class.updateOne({ no: parseInt(1) }, { $push: req.body }, (err, data) => {
    if (err) return res.json({ success: false, status: "UPDATE", error: err });

    return res.json({ success: true, status: "UPDATE" });
  });
});

/** DELETE all row
 * 테스트용
 */
router.delete("/all", (req, res) => {
  Class.deleteMany()
    .then(() => {
      console.log("deleted data");
      return res.json({ success: true, status: "DELETE" });
    })
    .catch(function (error) {
      return res.json({ success: false, status: "DELETE", error: error });
    });
});

module.exports = router;
