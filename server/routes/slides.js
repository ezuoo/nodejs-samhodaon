const express = require('express');

const { Slide } = require("../models/Slide");

const router = express.Router();

/**
 *  각 API에 에러핸들링 해야함.
*/
router.get('', (req, res) => {
    Slide.find((err, data) => {
        if (err) return res.json({ success: false, msg: "데이터 불러오기 실패", data: err });
        if (data.length === 0) return res.json({ success: false, msg: "데이터가 없습니다", data: data});

        return res.json({ success: true, msg: "데이터 불러오기 성공", data: data});
    });
})


router.post('', (req, res) => {
    let row = new Slide(req.body);
    Slide.find((err, data) => {
        if (err) return res.json({ success: false, msg: "데이터 불러오기 실패", data: err });
        
        if (data.length === 0) {
            row.save((err, newData) => {
                if (err) return res.json({ success: false, msg: "데이터 저장 실패", data: err });
                return res.json({ success: true, msg: "데이터 저장 완료", data: newData});
            });
        }

        Slide.saveElement(req.body, (err, newData) => {
            if (err) return res.json({ success: false, msg: "데이터 저장 실패", data: err });
            return res.json({ success: true, msg: "데이터 저장 완료", data: newData });
        });
    }); 
});


module.exports = router;