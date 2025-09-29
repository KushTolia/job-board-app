import React from "react";

// A special constant for the ellipsis
const DOTS = "...";

/**
 * A custom hook to calculate the pagination range.
 */
const usePagination = ({ totalPages, siblingCount = 1, currentPage }) => {
    const paginationRange = React.useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = Array.from(
                { length: leftItemCount },
                (_, i) => i + 1
            );
            return [...leftRange, DOTS, totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = Array.from(
                { length: rightItemCount },
                (_, i) => totalPages - rightItemCount + i + 1
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = Array.from(
                { length: rightSiblingIndex - leftSiblingIndex + 1 },
                (_, i) => leftSiblingIndex + i
            );
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalPages, siblingCount, currentPage]);

    return paginationRange || [];
};

const Pagination = ({ meta, onPageChange }) => {
    if (!meta || meta.last_page <= 1) {
        return null;
    }

    const { current_page: currentPage, last_page: totalPages } = meta;

    const paginationRange = usePagination({
        currentPage,
        totalPages,
        siblingCount: 1,
    });

    const onNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <nav aria-label="Job pagination">
            <ul className="pagination justify-content-center">
                <li
                    className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={onPrevious}
                        aria-label="Previous"
                    >
                        &laquo;
                    </button>
                </li>

                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li
                                key={`dots-${index}`}
                                className="page-item disabled"
                            >
                                <span className="page-link">...</span>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={pageNumber}
                            className={`page-item ${
                                pageNumber === currentPage ? "active" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}

                <li
                    className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                    <button
                        className="page-link"
                        onClick={onNext}
                        aria-label="Next"
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
            <p className="text-center text-muted small mt-2">
                Page {currentPage} of {totalPages}
            </p>
        </nav>
    );
};

export default Pagination;
