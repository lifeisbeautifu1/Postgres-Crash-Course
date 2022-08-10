import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { reducer, Action } from './reducer';
import { IRestaurant, IReview } from './interfaces';
import axios from 'axios';

interface IRestaurantContext {
  state: IRestaurant[];
  dispatch: React.Dispatch<Action>;
  restaurant: IRestaurant | null;
  setRestaurant: React.Dispatch<React.SetStateAction<IRestaurant | null>>;
  reviews: IReview[];
  setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
}

export const RestaurantContext = createContext<IRestaurantContext>(
  {} as IRestaurantContext
);

interface RestaurantContextProviderProps {
  children: React.ReactNode;
}

export const RestaurantContextProvider: React.FC<
  RestaurantContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('/restaurants/');
        dispatch({ type: 'SET', payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        state,
        dispatch,
        restaurant,
        setRestaurant,
        reviews,
        setReviews,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(RestaurantContext);
