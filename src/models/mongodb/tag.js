module.exports = (mongoose) => {

  var schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    usage: {
      type: Number,
      default: 1
    },
    rating: {
      type: Number,
      default: 1
    },
    publications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publication'
    }],
  }, { versionKey: false });

  return mongoose.model('Tag', schema);
}