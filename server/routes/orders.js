const express = require("express");
const router = express.Router();
const { Order } = require("../models/Order");

/** POST 
 * insert data into database.
 */
router.post("", (req, res) => {
    Order.saveOrder(JSON.stringify(req.body), (data) => {
        data.save((err, row) => {
            if (err) return res.json({ success: false, msg: "문의사항 접수를 실패하였습니다", error: err });
            return res.json({ success: true, msg: "문의사항이 접수되었습니다.", row: row });
        })
    });
});

/** DELETE 
 * delete data with parameter
 */
router.delete("/:no", (req, res) => {
    const no = req.params.no;
    Order.findOneAndDelete({no: no}, (err, data) => {
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
    Order.find((err, data) => {
        if (err) return res.json({ success: false, status: "GET ALL", error: err });
        if (data.length === 0) return res.json({ success: false, status: "GET ALL", error: 'no document'});

        return res.json({ success: true, status: "GET ALL", data: data, length: data.length });
    });
})

router.get('/:no', (req, res) => {
    const no = req.params.no;
    Order.findOne({no: no}, (err, data) => {
        if (err) return res.json({ success: false, msg: "데이터 불러오기 실패", error: err });
        if (data.length === 0) return res.json({ success: false, msg: "데이터가 없습니다"});
    
        return res.json({ success: true, msg: "데이터 불러오기 성공", data: data});
    })
    
});

module.exports = router;
