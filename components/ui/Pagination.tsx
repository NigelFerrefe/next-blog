'use client';

import { Button } from '@/components/ui/Button';
import { getVisiblePages } from '@/utils/helpers';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
  nextPage?: number | null;
  prevPage?: number | null;
  isFetching?: boolean;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  isFetching,
  onPageChange,
}: Props) => {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-20 flex justify-center">
      <div className="flex w-fit items-center gap-4">
        <Button
          onClick={() => prevPage && onPageChange(prevPage)}
          disabled={!prevPage || isFetching}
          variant="ghost"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {visiblePages.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={isFetching}
            variant={pageNumber === currentPage ? 'default' : 'ghost'}
            className={pageNumber === currentPage ? 'font-bold' : ''}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          onClick={() => nextPage && onPageChange(nextPage)}
          disabled={!nextPage || isFetching}
          variant="ghost"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
