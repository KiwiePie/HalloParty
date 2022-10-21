import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: String,
  clone_name: String,
  channel_id: String,
  secret_webhook_id: String,
  costume_id: String,
  party_id: String,
});

export default mongoose.model('Users', userSchema);
