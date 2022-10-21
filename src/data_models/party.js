import mongoose from 'mongoose';

const partySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  server_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  users: [String],
  channels: [String],
  guessed_users: [String],
});

export default mongoose.model('Parties', partySchema);
