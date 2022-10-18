import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import LikeCollection from '../like/collection';

/**
 * Checks if like with freetId in req.parms and user in req.session exists
 */
const isLiked = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.freetId);

    const freetId = req.params.freetId;
    const userId = req.session.userId;

    const like = validFormat ?  await LikeCollection.findOne(freetId, userId) : '';
    if (!like) {
        res.status(404).json({
            error: {
                freetNotFound: `Like with freet ID ${req.params.freetId} and user ID ${req.session.userId} does not exist.`
            }
            });
            return;
    }

    next();
};

/**
 * Checks if like with freetId in req.parms and user in req.session does not exist
 */
 const notLiked = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.freetId);

    const freetId = req.params.freetId;
    const userId = req.session.userId;

    const like = validFormat ?  await LikeCollection.findOne(freetId, userId) : '';
    if (like) {
        res.status(404).json({
            error: {
                freetNotFound: `Like with freet ID ${req.params.freetId} and user ID ${req.session.userId} exists.`
            }
            });
            return;
    }

    next();
};

export {
    isLiked,
    notLiked,
  };
  