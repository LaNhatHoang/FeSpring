import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
    const {data, setItemOffset, dataPerPage} = props

    const pageCount = Math.ceil(data.length / dataPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * dataPerPage) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div className='d-flex'>
            <div style={{width:'200px'}} className='d-none d-lg-flex ms-5'></div>
            <div className='w-100 mx-sm-3 py-3 d-flex align-items-center justify-content-center'>
                <ReactPaginate className='page-ul d-flex m-0 p-0'
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={2}    
                    activeClassName={'page-active'}
                    pageClassName={'page-li mx-1 border border-2 rounded-1 '}
                    pageLinkClassName={'px-md-3 px-2 fs-6 text-decoration-none text-dark'}
                    breakClassName={'page-li mx-1 border border-1 rounded-1 '}
                    breakLinkClassName={'px-md-3 px-2 text-decoration-none text-dark'}
                    previousClassName={'page-li d-none d-sm-block mx-1 border border-1 rounded-1 '}
                    nextClassName={'page-li d-none d-sm-block mx-1 border border-1 rounded-1 '}
                    previousLinkClassName={'px-md-3 px-2-6 text-decoration-none text-dark'}
                    nextLinkClassName={'px-md-3 px-2-6 text-decoration-none text-dark'}
                />
            </div>
        </div>
    );
}

export default Pagination;