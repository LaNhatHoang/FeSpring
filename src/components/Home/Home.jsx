import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Filter from "./Filter";
import Container from "./Container";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Footer from "./Footer";
import axios from "axios";
import { baseUrl } from "../../redux/apiRequest";
import Book from "./Book";

const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const [openProfile, setOpenProfile] = useState(false)
  const [filter, setFilter] = useState(false)
  const [data, setData] = useState([])
  const [currentData, setCurrentData] = useState([])
  const [itemOffset, setItemOffset] = useState(0)
  const [bookId, setBookId] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const calcDataPerPage = (width) => {
    if (width > 1400) {
      return 18
    } else if (width > 1200) {
      return 12
    } else if (width > 992) {
      return 9
    } else if (width > 768) {
      return 12
    } else if (width > 576) {
      return 9
    } else {
      return 10
    }
  }

  const dataPerPage = calcDataPerPage(window.innerWidth)

  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get(`${baseUrl}/api/v1/book/all`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      var arr = []
      for (var i = 0; i < 100; i++) {
        res.data.map((item) => (arr.push(item)))
      }
      setData(arr)
      setCurrentData(arr.slice(itemOffset, itemOffset + dataPerPage))
    }
    getApi()
  }, [])

  useEffect(() => {
    setCurrentData(data.slice(itemOffset, itemOffset + dataPerPage))
    window.scroll({ top: 0, behavior: 'instant' })
  }, [itemOffset])


  return (
    <div className="Home position-relative">
      <div id="Book-container" onClick={() => setOpenProfile(false)} >
        <NavBar openProfile={openProfile} setOpenProfile={setOpenProfile} filter={filter} setFilter={setFilter} />
        <div className="d-flex">
          <Filter filter={filter} setFilter={setFilter} />
          <Container currentData={currentData} setBookId={setBookId} setScrollY={setScrollY} />
        </div>
        <Pagination data={data} dataPerPage={dataPerPage} setItemOffset={setItemOffset} />
        <Footer />
      </div>
      {bookId !== 0 ? <Book scrollY={scrollY} bookId={bookId} setBookId={setBookId} /> : <></>}
    </div>
  );
};

export default Home;
