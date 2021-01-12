const mongoose = require('mongoose');


/**
const QnaSchema = mongoose.Schema({
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
  content: String
});

 */

const Qna = mongoose.model('Qna', QnaSchema);

module.exports = { Qna }