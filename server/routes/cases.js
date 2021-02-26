const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Case } = require("../models/Case");
const moment = require("moment");


/** GET
 *  fetch data from database.
 *  There are three cases.
 *  1. all daaa
 *  2. best data 
 *  3. certain data
 *  status value : all / filter
 */
router.get("", (req, res) => {
    if(Object.keys(req.query).length === 0) {
        Case.find((err, data) => {
            if (err) return res.json({ success: false, status: "GET ALL", error: err });
            if (data.length === 0) return res.json({ success: false, status: "GET ALL", error: 'no document'});
    
            return res.json({ success: true, status: "GET ALL", data: data, length: data.length });
        });
    } else {
         let where = [];
        for(let [key,value] of Object.entries(req.query)) value.toString().split(",").map( x => where.push( { [key] : x } ));
        const filter = { $or: where };
      
        Case.find(filter, (err, data) => {
            if (err) return res.json({ success: false, status: "GET FILTER", error: err });
            if (data.length === 0) return res.json({ success: false, status: "GET FILTER", error: 'no document'});
    
            return res.json({ success: true, status: "GET FILTER", data: data, length: data.length });
        });
    }
    
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Case.findById(id, (err, data) => {
        if (err) return res.json({ success: false, msg: "데이터 불러오기 실패", error: err });
        if (data.length === 0) return res.json({ success: false, msg: "데이터가 없습니다"});
    
        return res.json({ success: true, msg: "데이터 불러오기 성공", data: data});
    })
    
});/* 
router.get("", (req, res) => {
    const menu = req.headers.menu;
  
    if(menu === 'all') {
        Case.find((err, data) => {
            if (err) return res.json({ success: false, status: "GET ALL", error: err });
            if (data.length === 0) return res.json({ success: false, status: "GET ALL", error: 'no document'});
    
            return res.json({ success: true, status: "GET ALL", data: data, length: data.length });
        });
    } else { // status === 'filter'
        delete req.body.menu;
        let where = [];
        console.log(req.body);
        for(let key in req.body) {
            if(typeof req.body[key] === 'object') req.body[key].forEach(value => where.push({[key]:value}));
            else where.push({[key]:req.body[key]});
        } 

        const filter = { $and: where };
        
        Case.find(filter, (err, data) => {
            if (err) return res.json({ success: false, status: "GET FILTER", error: err });
            if (data.length === 0) return res.json({ success: false, status: "GET FILTER", error: 'no document'});
    
            return res.json({ success: true, status: "GET FILTER", data: data, length: data.length });
        });
    }
    
}); */


/** POST 
 * insert data into database.
 */
router.post("", (req, res) => {
    Case.saveCase(req.body, (data) => {
        data.save((err, row) => {
            if (err) return res.json({ success: false, msg: "데이터 입력 실패", error: err });
            return res.json({ success: true, msg: "데이터 입력 완료", row: row });
        })
    });
});


/** PATCH
 * edit data with parameter and update data 
 */
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const querystring = req.body;
   
    Case.findByIdAndUpdate(id, querystring, (err, query) => {
        if (err)  return res.json({ success: false, msg: "데이터 수정 실패", error: err });
        return res.json({ success: true, msg: "데이터 수정 완료" });

    }); 
});


/** DELETE 
 * delete data with parameter
 */
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Case.findByIdAndDelete(id, (err, data) => {
        if(err) { return res.json({ success: false, msg: "데이터 삭제 실패", error: err }); }
        
        return res.json({ success: true, msg: "데이터 삭제 완료" });

    })
});

/** DELETE 
 * delete all data
 */ 
/* router.delete("", (req, res) => {
        Case.deleteMany()
          .then((data) => res.json({ success: true, status: "DELETE ALL" }))
          .catch((err) => res.json({ success: false, status: "DELETE ALL", error: err }));
}); */

module.exports = router;
