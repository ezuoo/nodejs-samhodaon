const express = require("express");
const router = express.Router();
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
    const status = req.body.status;

    if(status === 'all') {
        Case.find((err, data) => {
            if (err) return res.json({ success: false, status: "GET ALL", error: err });
            if (data.length === 0) return res.json({ success: false, status: "GET ALL", error: 'no document'});
    
            return res.json({ success: true, status: "GET ALL", data: data, length: data.length });
        });
    } else { // status === 'filter'
        delete req.body.status;
        let where = [];
        
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
    
});


/** POST 
 * insert data into database.
 */
router.post("", (req, res) => {
        let row = new Case(req.body);
        row.date = moment().format("YYYY-MM-DD HH:mm");

        row.save((err, userInfo) => {
            if (err) return res.json({ success: false, status: "POST", error: err });
            return res.json({ success: true, status: "POST", data: userInfo });
        });
});


/** PATCH
 * edit data with parameter and update data 
 */
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const querystring = req.body;

    Case.findByIdAndUpdate(id, querystring, (err, query) => {

        if (err) return res.json({ success: false, status: "PATCH", error: err });
        return res.json({ success: true, status: "PATCH", data: query });

    }); 
});


/** DELETE 
 * delete data with parameter
 */
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Case.findByIdAndDelete(id, (err, data) => {
        if(err) { return res.json({ success: false, status: "DELETE ID", error: err }); }
        
        return res.json({ success: true, status: "DELETE ID" });

    })
});

/** DELETE 
 * delete all data
 */ 
router.delete("", (req, res) => {
        Case.deleteMany()
          .then((data) => res.json({ success: true, status: "DELETE ALL" }))
          .catch((err) => res.json({ success: false, status: "DELETE ALL", error: err }));
});

module.exports = router;
