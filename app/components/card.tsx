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
    Latitude : number;
    Longitude : number;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
      // Call the Transport function when the component mounts
      Transport(item.Longitude, item.Latitude).then(setImages);
    }, []);
  return (
    <div className="flex p-8 m-1 w-auto rounded-xl bg-white text-[#0E215C] border-4 border-[#EFF4FF] gap-20">
      <div>
        <Image
          src={item.Picture ? "/medias/" + item.Picture : "/medias/default.jpg"}
          alt={item.Name}
          width={200}
          height={200}
          className="rounded-xl w-32 h-32 object-cover"
        />{" "}
        {/* Use the Image component */}
      </div>
      <div className="">
        <h1 className="text-xl font-bold text-[#0E215C] ">{item.Name}</h1>
        <div className="flex gap-2 text-[#849CD9] ">
          <p>{item.PostalCode}</p>
          <p className=" truncate">{item.City}</p>
        </div>
        <div className="flex gap-2">
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
          <p className="text-[#849CD9] ">
            à partir de <span className="text-[#0E215C]">{item.Price} €</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
