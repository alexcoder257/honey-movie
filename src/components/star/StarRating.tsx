import React from "react";
import Star from "./Star"; // Import the Star component

const StarRating = ({ rating }: { rating: number }) => {
  // Calculate the number of full stars and whether to include a half star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center text-primary">
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} filled={true} />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && <Star filled={false} half={true} />}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} filled={false} />
      ))}
    </div>
  );
};

export default StarRating;
