import mongoose from 'mongoose';

const costumeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  type: String,
  name: String,
  img_src: String,
});

export default mongoose.model('Costumes', costumeSchema);
