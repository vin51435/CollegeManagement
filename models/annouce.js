const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announceSchema = new Schema({
  author: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const announce = mongoose.model('announce', announceSchema);

module.exports = announce;
