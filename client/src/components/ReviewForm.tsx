import axios from 'axios';
import React, { useState } from 'react';
import { useRestaurantContext } from '../context';

const initialState = {
  name: '',
  review: '',
  rating: 0,
};

const ReviewForm = () => {
  const { restaurant, setReviews, setRestaurant } = useRestaurantContext();

  const [formState, setFormState] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/reviews/' + restaurant?.id, {
        ...formState,
        rating: Number(formState.rating),
      });
      setReviews((prevState) => [...prevState, data]);
      setFormState(initialState);
      setRestaurant((prevState) => ({
        ...prevState!,
        reviews_count: +prevState?.reviews_count! + 1,
        average_rating:
          (+prevState?.average_rating! * +prevState?.reviews_count! +
            +formState.rating) /
          (+prevState?.reviews_count! + 1),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-4 w-[500px]" onSubmit={handleSubmit}>
      <div className="flex gap-4 items-center w-full">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full p-2 px-3 border border-gray-200 rounded"
          name="name"
          onChange={handleChange}
          value={formState.name}
        />
      </div>
      <div className="flex gap-4 items-center w-full">
        <label htmlFor="review">Review: </label>
        <input
          type="text"
          id="review"
          placeholder="Review"
          className="w-full p-2 px-3 border border-gray-200 rounded"
          name="review"
          onChange={handleChange}
          value={formState.review}
        />
      </div>
      <div className="flex items-center gap-4 w-full">
        <label htmlFor="rating" className="w-full">
          Rating
        </label>
        <select
          name="rating"
          id="rating"
          className="w-full py-2 px-3 border border-gray-200"
          onChange={handleChange}
          value={formState.rating}
        >
          <option value="0" disabled>
            Rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button
        type="submit"
        className="py-2 px-3 bg-indigo-500 text-white rounded hover:bg-indigo-500/90 font-semibold"
      >
        Add Restaurant
      </button>
    </form>
  );
};

export default ReviewForm;
