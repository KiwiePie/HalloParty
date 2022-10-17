import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  parties: [String],
});

export default mongoose.model('Servers', serverSchema);
