import express from 'express';

import {
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  createRestaurant,
  deleteRestaurant,
} from '../controllers/restaurants';

const router = express.Router();

router.get('/', getRestaurants);

router.get('/:id', getRestaurant);

router.post('/', createRestaurant);

router.delete('/:id', deleteRestaurant);

router.patch('/:id', updateRestaurant);

export default router;
