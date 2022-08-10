import { useRestaurantContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { IRestaurant } from '../interfaces';
import axios from 'axios';
import Rating from './Rating';

const RestaurantsList = () => {
  const { state, dispatch } = useRestaurantContext();
  const navigate = useNavigate();

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    restaurant: IRestaurant
  ) => {
    e.stopPropagation();
    navigate('/restaurants/' + restaurant.id + '/update');
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    restaurant: IRestaurant
  ) => {
    e.stopPropagation();
    try {
      await axios.delete('/restaurants/' + restaurant.id);
      dispatch({ type: 'DELETE', payload: restaurant });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table className="bg-gray-100 shadow-md text-left mt-12">
      <thead className="bg-indigo-400 text-white">
        <tr>
          <th className="p-4 px-8">Name</th>
          <th className="p-4 px-8">Location</th>
          <th className="p-4 px-8">Price</th>
          <th className="p-4 px-8">Rating</th>
          <th className="p-4 px-8">Update</th>
          <th className="p-4 px-8">Delete</th>
        </tr>
      </thead>
      <tbody>
        {state.map((r) => (
          <tr
            key={r.id}
            onClick={(e) => navigate('/restaurants/' + r.id)}
            className="text-gray-500 cursor-pointer hover:bg-gray-200/90"
          >
            <td className="py-3 px-8">{r.name}</td>
            <td className="py-3 px-8">{r.location}</td>
            <td className="py-3 px-8">{r.price_range}</td>
            <td className="py-3 px-8">
              <h2 className="text-yellow-400 font-semibold flex gap-2">
                <Rating rating={r?.average_rating!} /> {r?.reviews_count}{' '}
                Reviews
              </h2>
            </td>
            <td className="py-3 px-8">
              <button
                onClick={(e) => handleUpdate(e, r)}
                className="py-2 px-3 bg-blue-300 text-white hover:bg-blue-400/90 rounded shadow cursor-pointer"
              >
                Update
              </button>
            </td>
            <td className="p-3">
              <button
                onClick={(e) => handleDelete(e, r)}
                className="py-2 px-3 bg-red-400 text-white hover:bg-red-400/90 rounded shadow cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RestaurantsList;
