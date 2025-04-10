import React from 'react'
import {IconButton} from '@material-tailwind/react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageNumbers: (number | '...')[]
  onPageChange: (page: number) => void
}

const Pagination = ({currentPage, totalPages, pageNumbers, onPageChange}: PaginationProps) => {
  return totalPages > 1 ? (
    <div className='flex items-center justify-center p-4'>
      <div className='flex items-center gap-2'>
        {pageNumbers.map((page, index) => (
          <IconButton
            key={index}
            variant={currentPage === page ? 'text' : 'outlined'}
            size='sm'
            className={`mx-1 ${currentPage === page ? 'bg-gray-700 text-white' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </IconButton>
        ))}
      </div>
    </div>
  ) : null
}

export default Pagination
