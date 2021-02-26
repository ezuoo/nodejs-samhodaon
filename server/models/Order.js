const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  no: Number,
  data: String  
}); 


OrderSchema.statics.saveOrder = function (parameter, cb) {
  let newData = {};
  Order.find((_, data) => {
      newData['no'] = data.length + 1;
      newData['data'] = parameter;
      let row = new Order(newData);
      return cb(row);
  })
}

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order }