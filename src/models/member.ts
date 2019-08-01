import { Schema, model, Document } from 'mongoose';

export interface IMember extends Document {
  user: string;
  guild: string;
  roles: Array<string>;
  xp: number;
  presence: string;
}

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
