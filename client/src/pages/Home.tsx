import { RestaurantForm, RestaurantsList } from '../components';

const Home = () => {
  return (
    <div className="mt-20 h-full w-full flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-10 mb-6">Yelp</h1>
      <RestaurantForm />
      <RestaurantsList />
    </div>
  );
};

export default Home;
