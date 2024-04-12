// page.tsx
"use client";

import Card from "./components/card";
import output from "../output.json";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = output.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(output.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main>
      <div className="grid grid-cols-3 gap-4 px-36 ">
        {currentItems.map((item) => (
          <Card key={item.Name} item={item} />
        ))}
      </div>
      <div className="p-1 w-full flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button className="h-8 w-8 bg-white m-2 text-black rounded-sm" key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </main>
  );
}
