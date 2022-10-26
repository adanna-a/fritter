import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';


// Type definition for Freet on the backend
export type Freet = {
  _id: Types.ObjectId; 
  authorId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
  topic: string;
  country: string;
};

export type PopulatedFreet = {
  _id: Types.ObjectId;
  authorId: User;
  dateCreated: Date;
  content: string;
  dateModified: Date;
  topic: string;
  country: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FreetSchema = new Schema<Freet>({
  // The author's userId
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The date the freet was created
  dateCreated: {
    type: Date,
    required: true
  },
  // The content of the freet
  content: {
    type: String,
    required: true
  },
  // The date the freet was modified
  dateModified: {
    type: Date,
    required: true
  },
  // The topic of the freet
  topic: {
    type: String,
    required: true,
  },
  // The location associated with the freet
  country: {
    type: String, 
    required: true,
  }
});

const FreetModel = model<Freet>('Freet', FreetSchema);
export default FreetModel;
