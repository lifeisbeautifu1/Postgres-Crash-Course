import { IRestaurant } from './interfaces';

export type State = IRestaurant[];

export type Action =
  | {
      type: 'ADD';
      payload: IRestaurant;
    }
  | {
      type: 'DELETE';
      payload: IRestaurant;
    }
  | {
      type: 'UPDATE';
      payload: IRestaurant;
    }
  | {
      type: 'SET';
      payload: IRestaurant[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD': {
      return [...state, action.payload];
    }
    case 'DELETE': {
      return state.filter((r) => r.id !== action.payload.id);
    }
    case 'UPDATE': {
      return state.map((r) =>
        r.id === action.payload.id ? action.payload : r
      );
    }
    case 'SET': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
