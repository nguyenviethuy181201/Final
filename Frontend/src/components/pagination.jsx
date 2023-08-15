import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, hasComments }) => {
    const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

    const renderPageNumbers = () => {
        if (totalPages <= 4) {
            // Display all page numbers without ellipsis
            return pageNumbers.map((item) => (
                <li key={item}>
                    <button
                        className={`pagination-button ${currentPage === item ? 'active bg-green-500' : ''} hover:bg-green-500`}
                        onClick={() => handlePageClick(item)}
                        disabled={totalPages === 1}
                    >
                        {item}
                    </button>
                </li>
            ));
        }

        // Display current page and 3 neighboring pages
        const visiblePages = [];
        if (currentPage <= 3) {
            visiblePages.push(...pageNumbers.slice(0, 4));
            visiblePages.push('ellipsis');
            visiblePages.push(...pageNumbers.slice(totalPages - 1));
        } else if (currentPage >= totalPages - 1) {
            visiblePages.push(...pageNumbers.slice(0, 1));
            visiblePages.push('ellipsis');
            visiblePages.push(...pageNumbers.slice(currentPage - 3));
        } else {
            visiblePages.push(...pageNumbers.slice(0, 1));
            visiblePages.push('ellipsis');
            visiblePages.push(...pageNumbers.slice(currentPage - 3, currentPage + 2));
            visiblePages.push('ellipsis');
            visiblePages.push(...pageNumbers.slice(totalPages - 1));
        }

        return visiblePages.map((item, index) => (
            <li key={index}>
                {item === 'ellipsis' ? (
                    <span className="ellipsis">...</span>
                ) : (
                    <button
                        className={`pagination-button ${currentPage === item ? 'active bg-green-500' : ''} hover:bg-green-500`}
                        onClick={() => handlePageClick(item)}
                    >
                        {item}
                    </button>
                )}
            </li>
        ));

    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
        if (hasComments) {
            scrollToComment();
        }
    };

    const handlePreviousClick = () => {
        onPageChange(currentPage - 1);
        if (hasComments) {
            scrollToComment();
        }
    };

    const handleNextClick = () => {
        onPageChange(currentPage + 1);
        if (hasComments) {
            scrollToComment();
        }
    };

    const scrollToComment = () => {
        const commentSection = document.getElementById('comment');
        commentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };


    return (
        <div className="pagination">
            <ul className="flex space-x-2 justify-center">
                {totalPages <= 5 ? null : (
                    <li>
                        <button
                            className="pagination-button"
                            onClick={handlePreviousClick}
                        >
                            Previous
                        </button>
                    </li>
                )}
                {renderPageNumbers()}
                {totalPages <= 5 ? null : (
                    <li>
                        <button
                            className="pagination-button"
                            disabled={currentPage === totalPages}
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;