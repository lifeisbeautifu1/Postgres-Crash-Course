import React, { useState } from 'react';
import axios from 'axios';
import { useRestaurantContext } from '../context';

const initialState = {
  name: '',
  location: '',
  price_range: '',
};

const RestaurantForm = () => {
  const { dispatch } = useRestaurantContext();
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
      const { data } = await axios.post('/restaurants/', formState);
      dispatch({ type: 'ADD', payload: data });
      setFormState(initialState);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-4 w-[400px]" onSubmit={handleSubmit}>
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
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          placeholder="Location"
          className="w-full p-2 px-3 border border-gray-200 rounded"
          name="location"
          onChange={handleChange}
          value={formState.location}
        />
      </div>
      <div className="flex items-center gap-4 w-full">
        <label htmlFor="price_range" className="w-full">
          Price Range
        </label>
        <select
          name="price_range"
          id="price_range"
          className="w-full py-2 px-3 border border-gray-200"
          onChange={handleChange}
          value={formState.price_range}
        >
          <option value="">Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
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

export default RestaurantForm;
