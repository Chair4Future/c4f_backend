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
    brand_image: { 
      type: String,
      default: null
    },
    detailed_image: { 
      type: String,
      default: null
    },
    datetime: {
      type: Date,
      required: true
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