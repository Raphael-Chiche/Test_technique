// Card.tsx
import Image from "next/image"; // Import the Image component
import { Transport } from "./transport";
import { useEffect, useState } from "react";

interface CardProps {
  item: {
    Name: string;
    PostalCode: string;
    City: string;
    NbRoomsMax: number;
    NbRoomsMin: number;
    Price: number;
    Picture: string;
    Latitude: number;
    Longitude: number;
  };
  onFavoriteClick: () => void;
  onRemoveFavorite: () => void;
  isFavorite: boolean; // Ajoutez cette ligne
}

const Card: React.FC<CardProps> = ({
  item,
  onFavoriteClick,
  onRemoveFavorite,
  isFavorite
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Call the Transport function when the component mounts
    Transport(item.Longitude, item.Latitude).then(setImages);
    setIsLoaded(true);
  }, []);


  return (
    <div className="flex p-8 m-1 w-auto rounded-xl bg-white text-[#0E215C] border-4 border-[#EFF4FF] gap-10">
      <div>
        {isLoaded && (
          <img
            src={
              item.Picture ? "/medias/" + item.Picture : "/medias/default.jpg"
            }
            alt={item.Name}
            width={200}
            height={200}
            className="rounded-xl w-32 h-32 min-w-16 min-h-16 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== "/medias/default.jpg") {
                target.src = "/medias/default.jpg";
              }
            }}
          />
        )}
        {/* Use the Image component */}
      </div>
      <div className="">
        <h1 className="text-xl font-bold text-[#0E215C] line-clamp-1">
          {item.Name}
        </h1>
        <div className="flex gap-2 text-[#849CD9] ">
          <p className="line-clamp-1">{item.PostalCode}</p>
          <p className=" truncate">{item.City}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {images.map(
            (src, index) =>
              src && (
                <Image
                  key={index}
                  src={"/svg/transports/" + src}
                  alt={src}
                  width={20}
                  height={20}
                />
              )
          )}
        </div>
        <div className="flex">
          <Image src={"/svg/Copy.svg"} alt={item.Name} width={20} height={20} />
          <p>
            de {item.NbRoomsMin} à {item.NbRoomsMax} pièces
          </p>
        </div>

        <div className="flex">
          <Image src={"/svg/Crop.svg"} alt={item.Name} width={20} height={20} />
          <p className="text-[#849CD9] line-clamp-1">
            à partir de <span className="text-[#0E215C]">{item.Price} €</span>{" "}
          </p>
        </div>
        <button onClick={onFavoriteClick} className="flex">
          <p>Ajouter au favoris</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "yellow" : "none"}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-yellow-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
