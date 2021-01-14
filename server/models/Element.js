const mongoose = require("mongoose");

/**
 * 선택 요소를 저장해놓는다.
 *
 */
const ElementSchema = mongoose.Schema({
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

/* ClassSchema.methods.editValue = async function (parameter, cb) {
  let classes = this;
  const field = parameter.field;
  const query = { no : parseInt(1)};
  
  

  //const update = { $set: { field: classes[field] } };
  const update = {no : parseInt(2)};

  classes.f
  return cb(null, null);
}; */
ElementSchema.methods.edit = function(body , cb) {
    let element = this;
    element.

    cb(null, body);
}

ElementSchema.statics.testfunc =  function (cb) {
  const query = Element.find();
  query.updateOne({no:2}, {color: ["gray","red","black","white", "brown"]});
  //query.replaceOne({no:2},{no: 2});
  //console.log(query.schema);
  query
    .exec()
    .then((data) => {
     cb(null, data);
    })
    .catch((error) => cb(error, null));
}

const Element = mongoose.model("Element", ElementSchema);

module.exports = { Element };
