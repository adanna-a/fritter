import type {HydratedDocument, Types} from 'mongoose';
import type {Comment} from './model';
import CommentModel from './model';
import UserCollection from '../user/collection';

class CommentCollection {
  /**
   * Add a comment to the collection
   *
   * @param {string} authorId - The id of the author of the comment
   * @param {string} freetId - The id of the freet being commented on
   * @param {string} content - The content of the comment
   * @return {Promise<HydratedDocument<Comment>>} - The newly created comment
   */
   static async addOne(authorId: Types.ObjectId | string, freetId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Comment>> {
    const date = new Date();
    const comment = new CommentModel({
      authorId,
      freetId,
      dateCreated: date,
      content,
    });
    await comment.save(); // Saves Comment to MongoDB
    return comment.populate('authorId');
  }

  /**
   * Find a comment by commentId
   *
   * @param {string} commentId - The id of the comment to find
   * @return {Promise<HydratedDocument<Comment>> | Promise<null> } - The comment with the given commentId, if any
   */
  static async findOne(commentId: Types.ObjectId | string): Promise<HydratedDocument<Comment>> {
    return CommentModel.findOne({_id: commentId}).populate('authorId');
  }

  /**
   * Get all the comments in the database
   *
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the comments
   */
  static async findAll(): Promise<Array<HydratedDocument<Comment>>> {
    // Retrieves freets and sorts them from most to least recent
    return CommentModel.find({}).sort({dateModified: 1}).populate('authorId');
  }

  /**
   * Get all the comments in by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Comment>[]>} - An array of all of the freets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Comment>>> {
    const author = await UserCollection.findOneByUsername(username);
    return CommentModel.find({authorId: author._id}).populate('authorId');
  }

  /**
   * Get all the comments under a given freet
   *
   * @param {string} freetId - The id of the freet being commented on
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
   static async findAllByFreet(freetId: Types.ObjectId | string): Promise<Array<HydratedDocument<Comment>>> {
    return CommentModel.find({freetId}).populate('freetId');
  }


  /**
   * Delete a comment with given commentId.
   *
   * @param {string} commentId - The commentId of freet to delete
   * @return {Promise<Boolean>} - true if the comment has been deleted, false otherwise
   */
  static async deleteOne(commentId: Types.ObjectId | string): Promise<boolean> {
    const freet = await CommentModel.deleteOne({_id: commentId});
    return freet !== null;
  }

  /**
   * Delete all the frecets by the given author
   *
   * @param {string} authorId - The id of author of freets
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await CommentModel.deleteMany({authorId});
  }
}

export default CommentCollection;