const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = new mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: { type: String, required: true, minlength: 5, maxlength: 50 },
        isGold: { type: Boolean, default: false },
        phone: { type: String, required: true, minlength: 5, maxlength: 50 }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: { type: Date },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema).error;
}

module.exports = { Rental, validate: validateRental };
