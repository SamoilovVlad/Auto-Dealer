import './PaginationList.css';
var index = 1000;

const PaginationList = ({ currentPage, lastPage, data, onChangePage, ListItemComponent, brand = '', cartList}) => {
    const PaginationButton = ({ disabled = false, isActive = false, pageNumber, Child, classes = ''}) => (
        <button disabled={disabled} className={`pagination-btn ${isActive ? 'active' : ''} ${classes}`} onClick={() => onChangePage(pageNumber)}>
            {Child}
        </button>
    );


    const addFirstPageButton = () => {
        return (
            <div key={'first'} className='first pagination-btns-list'>
                <PaginationButton key={-1} isActive={false} pageNumber={1} Child={1} />
            </div>
        );
    };

    const addLastPageButton = (lastPage) => {
        return (
            <div key={'last'} className='last pagination-btns-list'>
                <PaginationButton key={lastPage+1} isActive={false} pageNumber={lastPage} Child={lastPage} />
            </div>
        );
    };

    const addCurrentPagesButtons = (firstIndex, lastIndex, activePage) => {
        const buttons = [];

        for (let i = firstIndex; i <= lastIndex; i++) {
            buttons.push(<PaginationButton key={i} isActive={activePage === i} pageNumber={i} Child={i} />)
        }
        return (<div key={index++} className='pagination-btns-list'>{buttons}</div>);
    };
    const makeListWithItemComponents = () => {
        return data.map((item, index) => (
            item ?
            < ListItemComponent
                    key={index}
                    modelInfo={item.modelInfo}
                    src={item.img}
                    model={item.model}
                    brand={brand}
                    isInCart={cartList && cartList.find(auto => auto.adv_ID === item.modelInfo.adv_ID) ? true : false}
            /> : null
        ));
    };
    //Logik of working pagination btns
    const makePagination = () => {
        const buttons = [];

        const prevButton = <PaginationButton key={'prev'} disabled={currentPage < 2} isActive={false} pageNumber={currentPage - 1} Child={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>} classes='next-prev-btns prev' />;
        const nextButton = <PaginationButton key={'next'} disabled={currentPage === lastPage} isActive={false} pageNumber={currentPage + 1} Child={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'white' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>} classes='next-prev-btns next' />;

        buttons.push(prevButton);

        if (lastPage > 4) {
            if (currentPage <= 2) {
                buttons.push(addCurrentPagesButtons(1, 3, currentPage));
                buttons.push(addLastPageButton(lastPage));
            } else if (currentPage - 1 > 1 && currentPage + 1 < lastPage) {
                buttons.push(addFirstPageButton());
                buttons.push(addCurrentPagesButtons(currentPage - 1, currentPage + 1, currentPage));
                buttons.push(addLastPageButton(lastPage));
            } else {
                buttons.push(addFirstPageButton());
                buttons.push(addCurrentPagesButtons(lastPage - 2, lastPage, currentPage));
            }
        } else if (lastPage > 3) {
            if (currentPage <= 2) {
                buttons.push(addCurrentPagesButtons(1, 3, currentPage));
                buttons.push(addLastPageButton(lastPage));
            }
            else {
                buttons.push(addFirstPageButton());
                buttons.push(addCurrentPagesButtons(lastPage - 2, lastPage, currentPage));
            }
        } else if (lastPage > 1) {
            buttons.push(addCurrentPagesButtons(1, lastPage, currentPage));
        }
        buttons.push(nextButton);

        return buttons;
    };

    return(
        <>
            <ul className='model-list'>
                {makeListWithItemComponents()}
            </ul>
            {lastPage > 1 ? <ul className='pagination-btns-container'>{makePagination()}</ul> : null}
        </>
    )
};

export default PaginationList;
