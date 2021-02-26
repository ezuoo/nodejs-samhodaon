const mongoose = require('mongoose');

/**
 * 메인 슬라이드 뷰 이미지를 저장한다.
 */

const SlideSchema = mongoose.Schema({
    no: {
        type: Number,
        default: 1,
    },
    image: Array,
    limit: {
        type: Number,
        default: 1,
    }
});

SlideSchema.statics.saveElement = function (parameter, cb) {
    const filter = { no: 1};
    let result = parameter;
    result['no'] = 1;
    Slide.updateOne(filter, parameter, (err, data) => {
      if (err) return cb(err, null);
  
      return cb(null, result);
    });
  };

const Slide = mongoose.model('Slide', SlideSchema);

module.exports = { Slide }