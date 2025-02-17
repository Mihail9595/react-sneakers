import Card from '../components/Card';


const Home = ({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddTocart,
    isLoading,
}) => {


    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => { onAddToFavorite(obj) }}
                onPlus={(obj) => { onAddTocart(obj) }}
                loading={isLoading}
                {...item}
            />
        ))

    }
    return (
        <div className='content p-40'>

            <div className='d-flex align-center mb-40 justify-between'>
                <h1> {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='search-block d-flex'>
                    <img src="img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => setSearchValue("")} className='clear cu-p' src="img/btn-remove.svg" alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder='Поиск...' />
                </div>
            </div>

            <div className='d-flex flex-wrap'>
                {renderItems()}
            </div>

        </div>
    );
}

export default Home;


