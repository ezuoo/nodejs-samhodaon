const express = require("express");
const router = express.Router();
const { Case } = require("../models/Case");
const moment = require("moment");



/** INSERT row */
router.post("", (req, res) => {
        let row = new Case(req.body);
        row.date = moment().format("YYYY-MM-DD HH:mm");

        row.save((err, userInfo) => {
            if (err) return res.json({ success: false, status: "POST", error: err });
            return res.json({ success: true, status: "POST", data: row });
        });
});

/** SELECT and RETURN row  */
router.get("", (req, res) => {
        Case.find((err, data) => {
            if (err) throw err;
            if (!data) return res.json({ success: false, status: "GET", error: err });

            return res.json({ success: true, status: "GET", data: data });
        });
});

/** DELETE row by id */
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Case.findByIdAndDelete(id, (err, data) => {
        if(err) { return res.json({ success: false, error: error, status: "DELETE" }); }
        
        return res.json({ success: true, status: "DELETE" });

    })
});

/** DELETE all row */ 
router.delete("", (req, res) => {
        Case.deleteMany()
        .then(() => {
            console.log("deleted data");
            return res.json({ success: true, status: "DELETE" });

        }).catch(function (error) {
            return res.json({ success: false, error: error, status: "DELETE" });
        });
});

/** UPDATE row by id */
router.patch("/:id", (req, res) => {
        const id = req.params.id;
        const querystring = req.body;

        Case.findByIdAndUpdate(id, querystring, (err, query) => {

            if (err) return res.json({ success: false, status: "PATCH", error: err });
            return res.json({ success: true, status: "PATCH", data: query });

        }); 
});

module.exports = router;
