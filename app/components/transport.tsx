const url =
  "https://preprod.kitlenid.fr/api/transport?lon=2.0680184&lat=48.8969373";

import { log } from "console";

export const Transport = async (lon: number, lat: number) => {
  try {
    const response = await fetch(
      "https://preprod.kitlenid.fr/api/transport?lon=" + lon + "&lat=" + lat
    );

    const data = await response.json();
    const lignes = data.map((item: any) => item.ligne);

    const imageMap: { [key: string]: string } = {
      "RER A": "Paris_transit_icons_-_RER_A.svg",
      "RER B": "Paris_transit_icons_-_RER_B.svg",
      "RER C": "Paris_transit_icons_-_RER_C.svg",
      "RER D": "Paris_transit_icons_-_RER_D.svg",
      "RER E": "Paris_transit_icons_-_RER_E.svg",

      "M1": "Paris_transit_icons_-_Metro_1.svg",
      "M2": "Paris_transit_icons_-_Metro_2.svg",
      "M3": "Paris_transit_icons_-_Metro_3.svg",
      "M3bis": "Paris_transit_icons_-_Metro_3bis.svg",
      "M4": "Paris_transit_icons_-_Metro_4.svg",
      "M5": "Paris_transit_icons_-_Metro_5.svg",
      "M6": "Paris_transit_icons_-_Metro_6.svg",
      "M7": "Paris_transit_icons_-_Metro_7.svg",
      "M7bis": "Paris_transit_icons_-_Metro_7bis.svg",
      "M8": "Paris_transit_icons_-_Metro_8.svg",
      "M9": "Paris_transit_icons_-_Metro_9.svg",
      "M10": "Paris_transit_icons_-_Metro_10.svg",
      "M11": "Paris_transit_icons_-_Metro_11.svg",
      "M12": "Paris_transit_icons_-_Metro_12.svg",
      "M13": "Paris_transit_icons_-_Metro_13.svg",
      "M14": "Paris_transit_icons_-_Metro_14.svg",
      "M15": "Paris_transit_icons_-_Metro_15.svg",
      "M16": "Paris_transit_icons_-_Metro_16.svg",
      "M17": "Paris_transit_icons_-_Metro_17.svg",
      "M18": "Paris_transit_icons_-_Metro_18.svg",
      "M19": "Paris_transit_icons_-_Metro_19.svg",

      "T1": "Paris_transit_icons_-_Tram_1.svg",
      "T2": "Paris_transit_icons_-_Tram_2.svg",
      "T3a": "Paris_transit_icons_-_Tram_3a.svg",
      "T3b": "Paris_transit_icons_-_Tram_3b.svg",
      "T4": "Paris_transit_icons_-_Tram_4.svg",
      "T5": "Paris_transit_icons_-_Tram_5.svg",
      "T6": "Paris_transit_icons_-_Tram_6.svg",
      "T7": "Paris_transit_icons_-_Tram_7.svg",
      "T8": "Paris_transit_icons_-_Tram_8.svg",
      "T9": "Paris_transit_icons_-_Tram_9.svg",
      "T10": "Paris_transit_icons_-_Tram_10.svg",
      "T11": "Paris_transit_icons_-_Tram_11.svg",
      "T12": "Paris_transit_icons_-_Tram_12.svg",
      "T13": "Paris_transit_icons_-_Tram_13.svg",

      "Transilien H": "Paris_transit_icons_-_Train_H.svg",
      "Transilien J": "Paris_transit_icons_-_Train_J.svg",
      "Transilien K": "Paris_transit_icons_-_Train_K.svg",
      "Transilien L": "Paris_transit_icons_-_Train_L.svg",
      "Transilien N": "Paris_transit_icons_-_Train_N.svg",
      "Transilien P": "Paris_transit_icons_-_Train_P.svg",
      "Transilien R": "Paris_transit_icons_-_Train_R.svg",
      "Transilien U": "Paris_transit_icons_-_Train_U.svg",
      "Transilien V": "Paris_transit_icons_-_Train_V.svg",
    };

    const images = lignes.map((ligne: string) => {
      return ligne in imageMap ? imageMap[ligne] : undefined;
    });

    console.log(images);
    return images;
  } catch (Error) {
    console.error("Error:", Error);
  }
};

Transport(2.0680184, 48.8969373);