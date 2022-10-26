import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Followee
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Followee on the backend
export type Followee = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  followeeId: Types.ObjectId;
  feedName: string;
};

export type PopulatedFollowee = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  followeeId: User;
  feedName: string;
}
const FolloweeSchema = new Schema<Followee>({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  },
  followeeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  feedName: {
    type: String,
    required: true
  },
});
  
const FolloweeModel = model<Followee>('Followee', FolloweeSchema);
export default FolloweeModel;
  