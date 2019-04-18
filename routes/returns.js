const express = require("express");
const router = express.Router();
const moment = require("moment");
const Joi = require("joi");

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const { customerId, movieId } = req.body;
  const rental = await Rental.lookup(customerId, movieId);
  if (!rental)
    return res
      .status(404)
      .send(`Rental with movieId=${movieId} and customerId=${customerId}`);
  if (rental.dateReturned)
    return res.status(400).send("Return already processed");
  await rental.return();
  await Movie.update({ _id: movieId }, { $inc: { numberInStock: 1 } });
  res.send(rental);
});

function validateReturn(values) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(values, schema).error;
}

module.exports = router;
