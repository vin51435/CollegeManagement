const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stuMarksSchema = new Schema({
  subjects: [String],
  submarks: [Number],
  stuAcc: {
    type: Schema.Types.ObjectId,
    ref: 'stuDetail',
  },
});

module.exports = mongoose.model('StudentMarks', stuMarksSchema);
