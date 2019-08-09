import { Schema, model } from 'mongoose';
import { IMember } from '../typings/interfaces';

const MemberSchema = new Schema({
  user: String,
  guild: String,
  roles: {
    type: Array,
    default: []
  },
  xp: {
    type: Number,
    default: 0
  },
  presence: String
});

const MemberModel = model<IMember>('members', MemberSchema);

export default MemberModel;
