const mongoose = require('mongoose');
const moment = require("moment");

const CaseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  division: String,
  area: Number,
  color: Array,
  style: Array,
  section: Array,
  office: String,
  date: String,
  best: Boolean,
  title: String,
  info: String, 
  content: String,
  image: Array
});

CaseSchema.statics.saveCase = function (parameter, cb) {
    let row = new Case(parameter);
    row['_id'] = new mongoose.Types.ObjectId();
    row.date = moment().format("YYYY-MM-DD HH:mm");
    
    return cb(row);
}


const Case = mongoose.model('Case', CaseSchema);

module.exports = { Case }