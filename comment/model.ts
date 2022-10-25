import { Freet } from 'freet/model';
import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for Comment on the backend
export type Comment = {
    _id: Types.ObjectId; 
    authorId: Types.ObjectId;
    freetId: Types.ObjectId;
    dateCreated: Date;
    content: string;
};

export type PopulatedComment = {
    _id: Types.ObjectId;
    authorId: User;
    freetId: Freet;
    dateCreated: Date;
    content: string;
};

const CommentSchema = new Schema<Comment>({
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    freetId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Freet'
      },
    dateCreated: {
      type: Date,
      required: true
    },
    content: {
      type: String,
      required: true
    },
  });
  
  const CommentModel = model<Comment>('Comment', CommentSchema);
  export default CommentModel;