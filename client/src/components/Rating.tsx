import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; ++i) {
    if (i <= rating) {
      stars.push(<IoIosStar />);
    } else if (Math.ceil(rating) === i) {
      stars.push(<IoIosStarHalf />);
    } else {
      stars.push(<IoIosStarOutline />);
    }
  }
  return (
    <div className="flex items-center text-2xl text-yellow-400">{stars}</div>
  );
};

export default Rating;
