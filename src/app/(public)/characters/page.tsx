'use client'
import React, { useState, useEffect, Suspense } from 'react';
import Pagination from '@/components/Pagination';
import { Character } from '@/types/characters.type';
import CharacterCard from '@/components/CharacterCard';
import { getCharacters } from '@/utils/api';
import Skeleton from '@/components/Skeleton';

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const charactersPerPage = 18;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters(currentPage, charactersPerPage);
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.total / charactersPerPage));
      } catch (error) {
        console.error(error)
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-4 bg-slate-200 text-center w-full min-h-screen flex flex-col items-center justify-center">

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
