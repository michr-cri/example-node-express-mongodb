var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-auto-increment');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var ApplicationSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, '{PATH} is required.'],
            trim: true,
            minlength: 2,
            maxlength: 32,
            uniqueCaseInsensitive: true
        }
    },
    {collection: 'applications'}
);

ApplicationSchema.plugin(uniqueValidator);
AutoIncrement.initialize(mongoose);
ApplicationSchema.plugin(AutoIncrement.plugin, {model: 'application', field: '_id', startAt: 100, incrementBy:1});
module.exports = mongoose.model('application', ApplicationSchema);