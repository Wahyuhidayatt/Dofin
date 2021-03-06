const mongoose = require('mongoose'),
      db  = require("./db");

const incomeSchema = mongoose.Schema({
  record_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
})

const Income = db.model('Income', incomeSchema)

module.exports = Income