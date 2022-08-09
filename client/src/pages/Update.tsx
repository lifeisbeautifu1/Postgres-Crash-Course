import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurantContext } from '../context';
import { IRestaurant } from '../interfaces';

const Update = () => {
  const { dispatch } = useRestaurantContext();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get('/restaurants/' + id);
        setFormState(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurant();
  }, [id]);

  const [formState, setFormState] = useState<IRestaurant>({
    id: 1,
    name: '',
    location: '',
    price_range: 1,
  });

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
      const { data } = await axios.patch(
        '/restaurants/' + formState.id,
        formState
      );
      dispatch({ type: 'UPDATE', payload: data });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-20 h-full w-full flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-10 mb-10">Update Restaurant Info</h1>
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
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default Update;
