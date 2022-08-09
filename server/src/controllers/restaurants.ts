import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { query } from '../db';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await query('SELECT * FROM restaurants;', []);
    res.status(StatusCodes.OK).json(restaurants.rows);
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
};
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await query('SELECT * FROM restaurants WHERE id=$1;', [
      req.params.id,
    ]);
    res.status(StatusCodes.OK).json(restaurant.rows[0]);
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
};
export const createRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  try {
    const restaurant = await query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *;',
      [name, location, price_range]
    );
    res.status(StatusCodes.OK).json(restaurant.rows[0]);
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
};
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await query(
      'DELETE FROM restaurants WHERE id=$1 returning *;',
      [req.params.id]
    );
    res.status(StatusCodes.OK).json(restaurant.rows[0]);
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
};
export const updateRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range } = req.body;
  try {
    const restaurant = await query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id=$4 returning *;',
      [name, location, price_range, req.params.id]
    );
    res.status(StatusCodes.OK).json(restaurant.rows[0]);
  } catch (error) {
    console.log(`${error}`.red.bold);
  }
};
