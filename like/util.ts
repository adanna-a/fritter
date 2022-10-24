import type {HydratedDocument, Types} from 'mongoose';
import moment from 'moment';
import type {Like, PopulatedLike} from '../like/model';
// import {UserCollection} from '../user/collection';

// Update this if you add a property to the Like type!
type LikeResponse = {
    _id: string;
    likeAuthor: string;
    freet: string;
};

/**
 * Transform a raw Like object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Like>} like - A freet
 * @returns {LikeResponse} - The like object formatted for the frontend
 */
 const constructLikeResponse = (like: HydratedDocument<Like>): LikeResponse => {
    const likeCopy: PopulatedLike = {
      ...like.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };

    const {username} = likeCopy.userId;

    const {content} = likeCopy.freetId;

    delete likeCopy.userId;
    delete likeCopy.freetId;

    return {
      ...likeCopy,
      _id: likeCopy._id.toString(),
      likeAuthor: username,
      freet: content,
    };
  };
  
  export {
    constructLikeResponse
  };