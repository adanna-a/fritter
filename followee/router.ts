import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FolloweeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as followeeValidator from '../followee/middleware'
;import * as util from './util';

const router = express.Router();

/**
 * Follow a user for a specific feed
 * 
 * @name POST /api/followees
 * 
 * @param {string} feedName - The name of the feed that the user is following the other user on
 * @param {string} username - The username of the user being followed
 * @return {FolloweeResponse} - An object with followee's details 
 * @throws {400} - If the feedName is empty or a stream of empty spaces
 * @throws {413} - If the feedName content is more than 50 characters long
 */
router.post(
  '/',
  [
    followeeValidator.isFolloweeUserExists,
    followeeValidator.isValidFeedNameContent,

  ],
  async (req: Request, res: Response) => {
    const authorId = (req.session.userId as string) ?? '';
    const followee = await FolloweeCollection.addOne(authorId, req.body.username, req.body.feedName);

    res.status(201).json({
        message: `You followed user ${req.body.username} on the feed ${req.body.feedName}, successfully.`,
        followee: util.constructFolloweeResponse(followee)
    });
  }
);

/**
 * Unfollow user for a specific feed
 * 
 * @name DELETE /api/followees/:id
 * 
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of the feed
 * @throws {404} - If the followeeId is invalid
 */
router.delete(
  '/:followeeId?',
  [
    userValidator.isUserLoggedIn, 
    followeeValidator.isValidFolloweeModifier
  ],
  async (req: Request, res: Response) => {
    await FolloweeCollection.deleteOne(req.params.followeeId);
    res.status(200).json({
      message: 'You unfollowed the user from this feed successfully.'
    });
  }
);

/**
 * Delete user's feed
 * 
 * @name DELETE /api/followees?feedName=NAME
 * 
 * @return {string} - A success message
 * @throws {404} - If the user has no feed with name feedName
 */
router.delete(
    '/', 
    [
      followeeValidator.isFolloweeParamsExists
    ],
    async (req: Request, res: Response) => {
        const authorId = (req.session.userId as string) ?? '';
        await FolloweeCollection.deleteSome(authorId, req.query.feedName as string);
        res.status(200).json({
            message: 'You deleted your feed successfully.'
          });
    }
);

/**
 * Get all followees on a user's feed
 * 
 * @name GET /api/followees?feedName=NAME
 * 
 * @return {FolloweesResponse[]} - An array of followees that the user followed on a specific feed
 * @throws {404} - If feedName is not given or user does not have a feedName called feedName
 */
/**
 * Get all followees 
 */
router.get(
  '/',
  [
    followeeValidator.isFolloweeQueryExists,
  ],
  async (req: Request, res: Response) => {
    const authorId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const followees = await FolloweeCollection.findAllByFeedName(authorId, req.query.feedName as string)
    const response = followees.map(util.constructFolloweeResponse);
    res.status(200).json(response);
  }
)

export {router as followeeRouter};
