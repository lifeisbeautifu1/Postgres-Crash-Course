import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer, Action } from './reducer';
import { IRestaurant } from './interfaces';
import axios from 'axios';

interface IRestaurantContext {
  state: IRestaurant[];
  dispatch: React.Dispatch<Action>;
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
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => useContext(RestaurantContext);
