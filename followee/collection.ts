import type {HydratedDocument, Types} from 'mongoose';
import UserCollection from '../user/collection';
import type {Followee} from './model';
import FolloweeModel from './model';

class FolloweeCollection {
  /**
   * Add a followee to the collection
   * 
   * @param {string} authorId - The id of the author of the feed, the follower
   * @param {string} followeeUsername - The username of the user being followed
   * @param {string} feedName - name of the feed that the user's tweets will show on
   * @return {Promise<HydratedDocument<Followee>>} - The newly created Followee
   */
  static async addOne(authorId: Types.ObjectId | string, followeeUsername: string, feedName: string): Promise<HydratedDocument<Followee>> {
    const followeeUser = await UserCollection.findOneByUsername(followeeUsername);
    const followeeId = followeeUser._id;
    const followee = new FolloweeModel({
        authorId,
        followeeId,
        feedName,
    });
    await followee.save() // saves the followee to MongoDB
    return followee;
  }

  /**
   * Find a followee by followeeId
   *
   * @param {string} followeeId - The id of the followee to find
   * @return {Promise<HydratedDocument<Followee>> | Promise<null> } - The followee with the given followeeId, if any
   */
   static async findOne(followeeId: Types.ObjectId | string): Promise<HydratedDocument<Followee>> {
    return FolloweeModel.findOne({_id: followeeId}).populate('authorId');
  }

  /**
   * Find a followee by feedName
   * 
   * @param {string} feedName - The name of the feed
   * @param {string} authorId - The id of the author of the feed
   * @return {Promise<HydratedDocument<Followee>> | Promise<null>} - The user with the given username, if any
   */
   static async findOneByFeedName(feedName: String, authorId: String | Types.ObjectId): Promise<HydratedDocument<Followee>> {
    return FolloweeModel.findOne({
      authorId: authorId,
      feedName: feedName,
    });
  }
  /**
   * Get all followees for a user
   * 
   * @param {string} authorId
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the followees 
   */
   static async findAll(authorId: Types.ObjectId | string): Promise<Array<HydratedDocument<Followee>>> {
    return FolloweeModel.find({authorId}).populate('authorId', 'user');
  }

  /**
   * Get all the followees for a user's feed
   * 
   * @param {string} authorId - The id of the user that created the feed
   * @param {string} feedName - The name of the feed
   * @return {Promise<HydratedDocument<Followee>[]>} - An array of all the followees for the user's specific feed
   */
  static async findAllByFeedName(authorId: Types.ObjectId | string, feedName: string): Promise<HydratedDocument<Followee>[]> {
    return FolloweeModel.find({authorId, feedName}).populate('followeeId')
  }

  /**
   * Delete a followee from a feed
   * 
   * @param {string} followeeId - The followeeId of followee to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
   static async deleteOne(followeeId: Types.ObjectId | string): Promise<boolean> {
    const followee = await FolloweeModel.deleteOne({_id: followeeId});
    return followee !== null;
  } 

  /**
   * Delete all followees for a user's feed
   * 
   * @param {string} authorId - The id of the user that created the feed
   * @param {string} feedName - The name of the feed
   */
   static async deleteSome(authorId: Types.ObjectId | string, feedName: Types.ObjectId | string): Promise<void> {
    await FolloweeModel.deleteMany({authorId, feedName});
  }

  /**
   * Delete all feeds for a user
   * 
   * @param {string} authorId - The id of the user that created the feed
   */
   static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await FolloweeModel.deleteMany({authorId});
  }
}

export default FolloweeCollection;
