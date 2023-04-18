import ItemBook from './ItemBook'

const Container = (props) => {
    const {currentData, setBookId, setScrollY} = props

    return (
        <div className="Container bg-body-secondary d-flex flex-wrap w-100 bg-white mt-5 mx-3 rounded-1">
            {
                currentData.map((book, index)=>(<ItemBook setScrollY={setScrollY} setBookId={setBookId} key={index} id={book.id} name={book.name} author={book.author} urlImage={book.urlImage} />))
            }
        </div>
    )
}
export default Container