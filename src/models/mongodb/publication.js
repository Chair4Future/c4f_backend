module.exports = (mongoose) => {

  var schema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    resume: { type: String },
    text: {
      type: String,
      required: true
    },
    brand_image: { type: String },
    detailed_image: { type: String },
    datetime: {
      type: Date,
      required: true,
      default: Date.now()
    },
    likes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    company: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    approved:{
      type: Boolean,
      required: true,
      default: false
    }
  }, { versionKey: false });

  return mongoose.model('Publication', schema);
}