import axios from 'axios';
import { useEffect } from 'react';
import { Rating, Review, ReviewForm } from '../components';
import { useParams } from 'react-router-dom';
import { useRestaurantContext } from '../context';

const Details = () => {
  const { id } = useParams();
  const { restaurant, setRestaurant, setReviews, reviews } =
    useRestaurantContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/restaurants/' + id);
        setRestaurant(data);
        const { data: reviewsData } = await axios.get('/reviews/' + id);
        setReviews(reviewsData);
        setRestaurant(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setReviews, setRestaurant]);
  return (
    <div className="mt-20 h-full w-full flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">{restaurant?.name}</h1>
      <h2 className="text-yellow-400 font-semibold flex gap-2">
        <Rating rating={restaurant?.average_rating!} />{' '}
        {restaurant?.reviews_count} Reviews
      </h2>
      <ReviewForm />
      <div className="my-8 w-[500px] m-auto flex flex-col gap-10">
        {reviews.map((r) => (
          <Review key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
};

export default Details;
