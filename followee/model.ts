// import type {Types, PopulatedDoc, Document} from 'mongoose';
// import {Schema, model} from 'mongoose';
// import type {User} from '../user/model';

// /**
//  * This file defines the properties stored in a Feed
//  * DO NOT implement operations here ---> use collection file
//  */

// // Type definition for Feed on the backend
// export type Feed = {
//   _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
//   authorId: Types.ObjectId;
//   name: string;
//   followedUsers: Array<Types.ObjectId>; // {type: Array<string>};
// };
  
// // Mongoose schema definition for interfacing with a MongoDB table
// // Feeds stored in this table will have these fields, with the
// // type given by the type property, inside MongoDB
// const FeedSchema = new Schema<Feed>({
//   name: {
//     type: String,
//     required: true,
//   },
//   followedUsers: Array,
// });
  
// const FeedModel = model<Feed>('Feed', FeedSchema);
// export default FeedModel;

import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Followee
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Followee = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  followeeId: Types.ObjectId;
  feedName: string;
};

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
  