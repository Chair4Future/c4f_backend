module.exports = (mongoose) => {

  var schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    business: { type: String },
    publications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publication'
    }],
  }, { versionKey: false });

  return mongoose.model('Tag', schema);
}