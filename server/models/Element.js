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

ElementSchema.statics.pushElement = function (parameter, cb) {
  const filter = { no: 1};
  const update = { $push : { [parameter.field] : parameter.value} };

  Element.updateOne(filter, update, (err, data) => {
    if (err) return cb(err, null);

    return cb(null, data);
  });
};

ElementSchema.statics.editElement = function (parameter, cb) {
  const field = parameter.field;
  const index = `${field}.$`;
  const filter = { [field] : parameter.old };
  const update =  { [index]: parameter.new };
  
  let query = Element.find({ no: 1 });

  query.updateOne(filter, update);

  query.exec()
    .then((data) => cb(null, data))
    .catch((error) => cb(error, null));
};

ElementSchema.statics.saveElement = function (parameter, cb) {
  const filter = { no: 1};
  const update = { [parameter.field] : parameter.value };

  Element.updateOne(filter, update, (err, data) => {
    if (err) return cb(err, null);

    return cb(null, data);
  });
};

ElementSchema.statics.pullElement = function (parameter, cb) {
  const field = Object.keys(parameter)[0];
  const value = Object.values(parameter)[0];
  const filter = {[field] : value };
  const update = { $pull: filter };
 
  let query = Element.find({no:1});
  query.updateOne(filter, update);

  query.exec()
    .then((data) => cb(null, data))
    .catch((error) => cb(error, null));
};




ElementSchema.statics.testfunc = function (parameter, cb) {
  const field = parameter.field;

  /* field === 'area' ? row[field].sort((a,b) => a-b) : console.log('# not area : ', field); */
  const query = Element.find({ no: 2 });
  let test = `${field}.$`;

  const update = {
    [test]: parameter.new,
  };

  query.updateOne({ color: parameter.old }, update);
  //query.replaceOne({no:2},{color : });
  //console.log(query.schema);
  query
    .exec()
    .then((data) => {
      cb(null, data);
    })
    .catch((error) => cb(error, null));
};

const Element = mongoose.model("Element", ElementSchema);

module.exports = { Element };
