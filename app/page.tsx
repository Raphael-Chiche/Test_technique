// page.tsx
"use client";

import Card from "./components/card";
import output from "../output.json";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = output.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(output.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleFavorite = (item: any) => {
    const found = favorites.find((fav: any) => fav.Name === item.Name);
    let newFavorites;
    if (found) {
      newFavorites = favorites.filter((fav: any) => fav.Name !== item.Name);
    } else {
      newFavorites = [...favorites, item];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

   useEffect(() => {
     const savedFavorites = localStorage.getItem("favorites");
     if (savedFavorites) {
       setFavorites(JSON.parse(savedFavorites));
     }
   }, []);

  const pageLimit = 5;
  let startPage = 1;
  let endPage = pageLimit;

  if (currentPage > 2) {
    startPage = currentPage - 2;
    endPage = startPage + pageLimit - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - pageLimit + 1;
    }
  }

  return (
    <main>
      <div className="grid  lg:grid-cols-2 grid-cols-1  gap-4 px-36 ">
        {currentItems.map((item) => (
          <Card
            key={item.Name}
            item={item}
            onFavoriteClick={() => toggleFavorite(item)}
            isFavorite={
              favorites.find((fav: any) => fav.Name === item.Name) !== undefined
            }
          />
        ))}
      </div>
      <div className="p-1 w-full flex justify-center">
        <button
          className="h-8 w-8 bg-white m-2 text-black font-bold rounded-full hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(startPage - 1, endPage)
          .map((pageNumber) => (
            <button
              className={`h-8 w-8 bg-white m-2 text-black rounded-sm ${
                pageNumber === currentPage ? "bg-red-500" : "hover:bg-gray-300"
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        <button
          className="h-8 w-8 bg-white m-2 text-black font-bold rounded-full hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
      <div className=" flex flex-col justify-center">
        <p className=" text-2xl">Liste des favoris</p>
        <div className=" grid grid-cols-3">
          {favorites.map((item: any) => (
            <Card
              key={item.Name}
              item={item}
              onFavoriteClick={() => toggleFavorite(item)}
              isFavorite={
                favorites.find((fav: any) => fav.Name === item.Name) !==
                undefined
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
