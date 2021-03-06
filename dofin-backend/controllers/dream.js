const Dream = require('../models/dream');

const getDreamsByUserId = (req, res) => {
  Dream.find({ record_by: req.params.user_id }, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // getDreamsByUserId

const newDream = (req, res) => {
  Dream.create({
    record_by: req.body.record_by,
    dream: req.body.dream,
  }, (err, rec) => {
    if (err) res.send(err)
    else res.json(rec)
  })
} // newDream

const removeDreamById = (req, res) => {
  Dream.findByIdAndRemove(req.params.id)
    .exec((err, rec) => {
      if (err) res.send(err)
      else res.json(rec)
    })
} // removeDreamById

module.exports = {
  getDreamsByUserId,
  newDream,
  removeDreamById,
}
