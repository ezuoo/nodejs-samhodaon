const mongoose = require('mongoose');

/**
 * 선택 요소를 저장해놓는다.
 * 
 */
const ClassSchema = mongoose.Schema({
  no: {
      type: Number,
      default: 1
  },
  division: Array,
  area: Array,
  color: Array,
  style: Array,
  section: Array
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = { Class }