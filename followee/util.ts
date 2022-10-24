import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Followee, PopulatedFollowee} from '../followee/model';

// Update this if you add a property to the Freet type!
type FolloweeResponse = {
  _id: string;
  author: string;
  followee: string;
  feedName: string;
};

const constructFolloweeResponse  = (followee: HydratedDocument<Followee>): FolloweeResponse => {
  const followeeCopy: PopulatedFollowee = {
    ...followee.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const author = followeeCopy.authorId.username;
  const followedUser = followeeCopy.followeeId.username;

  delete followeeCopy.authorId;
  
  return {
    ...followeeCopy,
    _id: followeeCopy._id.toString(),
    author: author,
    followee: followedUser,
  };
};

export {
  constructFolloweeResponse
};