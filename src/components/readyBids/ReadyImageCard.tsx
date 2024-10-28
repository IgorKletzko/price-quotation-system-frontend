
import { ImageResponse } from "@/types/mainBidFormResponse";

interface ReadyImageCardProps {
  data: ImageResponse;
}

const ReadyImageCard: React.FC<ReadyImageCardProps> = ({ data }) => {
  return (
    <div className="h-[80px] sm:h-[100px] relative">
      <img className="h-full w-full object-cover rounded-lg" src={data.imageUrl} alt="Bid Image" />

      <div
        dir="rtl"
        className="absolute top-0 -left-0 rounded-lg w-full h-full flex items-center justify-center text-white sm:text-xl bg-black bg-opacity-20"
      >
        <p className="text-lg sm:text-2xl">{data.description}</p>

      </div>
    </div>
  );
};

export default ReadyImageCard;
