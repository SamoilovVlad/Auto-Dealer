import './PagenationList.css';

const PaginationList = ({ currentPage, lastPage, maxItems, data, onChangePage, ListItemComponent}) => {

    const PaginationButton = ({isActive, number, onChangePage}) => {
        return (
            <button className={isActive ? 'pagenation-btn active' : 'pagenation-btn'} onClick={() => onChangePage(number)}>{number}</button>
        );
    }

    function makeListWithItemComponents() {
        const listItemsComponents = [];
        for (var i = 0; i < maxItems; i++) {
            if (data[i]) {
                listItemsComponents.push(
                    <ListItemComponent
                        key={i}
                        modelInfo={data[i].modelInfo}
                        src={data[i].img}
                        model={data[i].model}
                    />
                );
            }
        }
        return listItemsComponents;
    }

    function makePagination() {
        const buttons = [];
        for (var i = 1; i <= lastPage; i++) {
            buttons.push(<PaginationButton isActive={i === currentPage} number={i} onChangePage={onChangePage} />)
        }
        return buttons;
    }

    return (
        <>
            <ul className='model-list'>
                {makeListWithItemComponents()}
            </ul>
            <ul className='pagenation-btns-list'>{makePagination()}</ul>
        </>
    );
}

export default PaginationList;