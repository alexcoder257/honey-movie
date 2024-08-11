import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

type Props = {
  filled: boolean;
  half?: boolean;
};

const Star = ({ filled, half }: Props) => {
  return (
    <div>
      {
        filled ? (
          <FaStar /> // Full star
        ) : half ? (
          <FaRegStarHalfStroke /> // Half star or empty star for visual representation
        ) : (
          <FaRegStar />
        ) // Empty star
      }
    </div>
  );
};

export default Star;
