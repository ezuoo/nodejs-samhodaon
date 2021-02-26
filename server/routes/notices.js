const express = require("express");
const router = express.Router();
const { Notice } = require("../models/Notice");
const moment = require("moment");

/** POST 
 * insert data into database.
 */
router.post("", (req, res) => {
    Notice.saveNotice(req.body, (data) => {
        data.save((err, row) => {
            if (err) return res.json({ success: false, msg: "데이터 입력 실패", error: err });
            return res.json({ success: true, msg: "데이터 입력 완료", row: row });
        })
    });
});

/** DELETE 
 * delete data with parameter
 */
router.delete("/:no", (req, res) => {
    const no = req.params.no;
    Notice.findOneAndDelete({no: no}, (err, data) => {
        if(err) { return res.json({ success: false, msg: "데이터 삭제 실패", error: err }); }
        
        return res.json({ success: true, msg: "데이터 삭제 완료" });

    })
});

/** GET
 *  fetch data from database.
 *  There are three cases.
 *  1. all daaa
 *  2. best data 
 *  3. certain data
 *  status value : all / filter
 */
router.get("", (req, res) => {
    Notice.find((err, data) => {
        if (err) return res.json({ success: false, status: "GET ALL", error: err });
        if (data.length === 0) return res.json({ success: false, status: "GET ALL", error: 'no document'});

        return res.json({ success: true, status: "GET ALL", data: data, length: data.length });
    });
})

router.get('/:no', (req, res) => {
    const no = req.params.no;
    Notice.findOne({no: no}, (err, data) => {
        if (err) return res.json({ success: false, msg: "데이터 불러오기 실패", error: err });
        if (data.length === 0) return res.json({ success: false, msg: "데이터가 없습니다"});
    
        return res.json({ success: true, msg: "데이터 불러오기 성공", data: data});
    })
    
});




/** PATCH
 * edit data with parameter and update data 
 */
router.patch("/:no", (req, res) => {
    const no = req.params.no;
    const querystring = req.body;
   
    Notice.findOneAndUpdate({no: no}, querystring, (err, _) => {
        if (err)  return res.json({ success: false, msg: "데이터 수정 실패", error: err });
        
        Notice.find((err, row) => {
            return res.json({ success: true, msg: "데이터 수정 완료" , row: row});
        })
        

    }); 
});





module.exports = router;
