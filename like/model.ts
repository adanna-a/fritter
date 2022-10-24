import { Freet } from '../freet/model';
import {Schema, Types, model} from 'mongoose';
import { User } from '../user/model';

/**
 * This file defines the properties stored in a Like
 */

// Type definition for Like on the backend
export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: Types.ObjectId;
  freetId: Types.ObjectId;
};

export type PopulatedLike = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  freetId: Freet;
}
// Mongoose schema definition for interfacing with a MongoDB table
// Likes stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const LikeSchema = new Schema<Like>({
  // The userId of the user that likes the freet
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The liked freet's freetId
  freetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
});

const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;