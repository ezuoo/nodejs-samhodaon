const mongoose = require('mongoose');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const CaseSchema = mongoose.Schema({
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



const Case = mongoose.model('Case', CaseSchema);

module.exports = { Case }