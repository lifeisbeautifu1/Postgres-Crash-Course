import { Rating } from './';
import { IReview } from '../interfaces';

interface ReviewProps {
  review: IReview;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  return (
    <div className="rounded shadow border-2 border-gray-100">
      <div className="p-4 flex items-center justify-between gap-10 border-b border-gray-100">
        <h1 className="capitalize font-semibold">{review.name}</h1>
        <Rating rating={review.rating} />
      </div>
      <div className="p-4 text-gray-600 text-sm">{review.review}</div>
    </div>
  );
};

export default Review;
