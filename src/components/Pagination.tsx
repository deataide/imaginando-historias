interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const numPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(numPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + numPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-secondary text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-8 p-2">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-secondary text-light rounded-l-lg disabled:opacity-50"
      >
        Anterior
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-secondary text-light rounded-r-lg disabled:opacity-50"
      >
        Próximo
      </button>
    </div>
  );
}
