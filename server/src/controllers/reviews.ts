import { Request, Response } from 'express';
import { query } from '../db';
import { StatusCodes } from 'http-status-codes';

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await query('SELECT * FROM reviews WHERE rid=$1;', [
    req.params.id,
  ]);
  res.status(StatusCodes.OK).json(reviews.rows);
};
export const addReview = async (req: Request, res: Response) => {
  const { name, review, rating } = req.body;
  const newReview = await query(
    'INSERT INTO reviews (rid, name, review, rating) VALUES ($1, $2, $3, $4) returning *;',
    [req.params.id, name, review, rating]
  );
  res.status(StatusCodes.OK).json(newReview.rows[0]);
};
