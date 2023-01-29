const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ruleSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    punition: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['punition', 'conseil'],
      default: 'punition'
    }
  });

ruleSchema.path('title').validate(function (value) {
    return value.length > 0;
}, 'Le titre ne doit pas être vide !');

ruleSchema.path('punition').validate(function (value) {
    return value.length > 0;
}, 'Le champs punition ne peut pas être vide');

ruleSchema.path('type').validate(function (value) {
    return value === 'punition' || value === 'conseil';
}, 'Le type doit être soit "punition" ou "conseil"');

const Rule = mongoose.model("Rule", ruleSchema);

module.exports = Rule;
