import React from "react";
import starIcon from "../assets/star.png"

interface StarProps {
  star: number;
}

const StarRating: React.FC<StarProps> = ({ star }) => {
  // Ensure star value is between 0 and 6
  const validStar = Math.max(0, Math.min(star, 6));

  return (
    <div className="flex mt-4 gap-1">
   
      {Array.from({ length: validStar }).map((_,index) => (
        <img key={index} src={starIcon} className="w-4 sm:w-6" alt="star" />

      ))}
    </div>
  );
};

export default StarRating 
