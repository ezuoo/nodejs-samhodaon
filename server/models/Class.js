const mongoose = require("mongoose");

/**
 * 선택 요소를 저장해놓는다.
 *
 */
const ClassSchema = mongoose.Schema({
  no: {
    type: Number,
    default: 1,
  },
  division: Array,
  area: Array,
  color: Array,
  style: Array,
  section: Array,
});

ClassSchema.methods.editValue = function (parameter, cb) {
  const classes = this;
  const field = parameter.field;

  console.log(`parameter : `, parameter);
  console.log('index : ', classes[field].indexOf(parameter.old));

  classes[field][classes[field].indexOf(parameter.old)] = parameter.new;
  console.log('edit value1 : ', classes[field]);

  field === 'area' ? classes[field].sort((a,b) => a-b) : console.log('not area : ', field);
  
  console.log(classes);
  cb(null,null);
  // update 문 안됨..........................................
  

};

const Class = mongoose.model("Class", ClassSchema);

module.exports = { Class };
