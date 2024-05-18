"use client";
import React, { FC, useEffect, useState } from "react";
import { Character } from "@/types/characters.type";
import { searchCharacters } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

import CharacterCard from "@/components/CharacterCard";

const SearchPage: FC = () => {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("query");
  const [characters, setCharacters] = useState<Character[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const charactersPerPage = 18;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchCharacters(
          querySearch,
          charactersPerPage,
          currentPage
        );
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.total / charactersPerPage));
      } catch (error) {
        console.error(error);
      }
    };

    if (querySearch) {
      fetchData();
    }
  }, [querySearch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
  return (
    <div className="py-4 bg-slate-200 text-center w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-dark mb-4">
        Procura por <span>&quot;{querySearch}&quot;</span>
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );

};

export default SearchPage;
