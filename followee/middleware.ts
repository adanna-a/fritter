import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FolloweeCollection from '../followee/collection';


/**
 * Checks if the content of the feedName in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
 const isValidFeedNameContent = (req: Request, res: Response, next: NextFunction) => {
    const {content} = req.body as {content: string};
    if (!content.trim()) {
      res.status(400).json({
        error: 'Feed name content must be at least one character long.'
      });
      return;
    }
  
    if (content.length > 50) {
      res.status(413).json({
        error: 'Feed name must be no more than 50 characters.'
      });
      return;
    }
  
    next();
  };

/**
 * Checks if the current user is the author of the freet whose freetId is in req.params
 */
 const isValidFolloweeModifier = async (req: Request, res: Response, next: NextFunction) => {
    const followee = await FolloweeCollection.findOne(req.params.followeeId);
    const userId = followee.authorId._id;
    if (req.session.userId !== userId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other users\' followees.'
      });
      return;
    }
  
    next();
  };

/**
 * Checks if a followee with feedName in req.body exists
 */
 const isFolloweeExists = async (req: Request, res: Response, next: NextFunction) => {
    const {feedName} = req.body as {feedName: string;};

    if (!feedName) {
        res.status(400).json({error: `Missing the feedName`})
    }

    const userId = req.session.userId;
    const followee = await FolloweeCollection.findOneByFeedName(feedName, userId);

    if (followee) {
        next();
    } else {
        res.status(401).json({error: 'There is no followee under this feed'});
    }
 }

 /**
 * Checks if a followee with feedName in req.params exists
 */
  const isFolloweeParamsExists = async (req: Request, res: Response, next: NextFunction) => {
    const {feedName} = req.params as {feedName: string;};

    if (!feedName) {
        res.status(400).json({error: `Missing the feedName`})
    }

    const userId = req.session.userId;
    const followee = await FolloweeCollection.findOneByFeedName(feedName, userId);

    if (followee) {
        next();
    } else {
        res.status(401).json({error: 'There is no followee under this feed'});
    }
 }

 /**
 * Checks if a followee with feedName in req.params exists
 */
  const isFolloweeQueryExists = async (req: Request, res: Response, next: NextFunction) => {
    const {feedName} = req.query as {feedName: string;};

    if (!feedName) {
        res.status(400).json({error: `Missing the feedName`})
    }

    const userId = req.session.userId;
    const followee = await FolloweeCollection.findOneByFeedName(feedName, userId);

    if (followee) {
        next();
    } else {
        res.status(401).json({error: 'There is no followee under this feed'});
    }
 }

  export {
    isValidFeedNameContent,
    isValidFolloweeModifier,
    isFolloweeExists,
    isFolloweeParamsExists,
    isFolloweeQueryExists
  };