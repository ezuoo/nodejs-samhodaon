const mongoose = require('mongoose');
const moment = require("moment");

const NoticeSchema = mongoose.Schema({
  no: Number,
  key: String,
  date: String,
  title: String,
  content: String
});

NoticeSchema.statics.saveNotice = function (parameter, cb) {
    Notice.find((_, data) => {
        parameter['no'] = data.length + 1;
        parameter['key'] = (data.length + 1).toString();
        parameter['date'] = moment().format("YYYY-MM-DD HH:mm");
        let row = new Notice(parameter);
        return cb(row);
    })
}


const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = { Notice }