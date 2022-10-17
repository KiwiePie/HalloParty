import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  clone_name: String,
  secret_webhook_id: String,
  costume_id: String,
  party_id: String,
});

export default mongoose.model('Users', userSchema);
