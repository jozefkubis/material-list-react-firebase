import "./Home.css"
import { projectFirestore } from "../firebase/Config"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"

const Home = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [selectedItems, setSelectedItems] = useState([])

  //MARK: get data from firebase
  useEffect(() => {
    return projectFirestore.collection("materialList").onSnapshot(
      (snapshot) => {
        setError(snapshot.empty ? "Nenašli sa žiadne položky" : "")
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      },
      (err) => setError(err.message)
    )
  }, [])

  //MARK: handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  //MARK: filter data
  const filteredData = data.filter(
    (oneItem) =>
      oneItem.item &&
      oneItem.item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //MARK: send data to selected
  const sendToSelected = (item) => {
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      item.toLowerCase(),
    ])
  }

  //MARK: delete selected data from page
  const deleteAllFromPage = () => {
    setSelectedItems([])
  }

  return (
    <div>
      <section className="home-section">
        <div className="home-div">
          <h1>Zoznam materialu v posadke RZP</h1>
          <form>
            <input
              className="search-input"
              type="search"
              placeholder="Vyhľadávanie"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className="home-items">
          {error && <p>{error}</p>}
          {searchTerm ? (
            filteredData.map((oneItem) => (
              <div key={oneItem.id}>
                <button onClick={() => sendToSelected(oneItem.item)}>
                  {oneItem.item.toLowerCase()}
                </button>
              </div>
            ))
          ) : (
            <p>Hladaj položku</p>
          )}
          {/* {filteredData.length === 0 && <p>Nenašli sa žiadne položky</p>} */}
        </div>

        <div className="selected-items">
          <h1>Vybrane položky</h1>
          {selectedItems.map((oneItem, index) => (
            <div key={index}>
              <p>{oneItem}</p>
            </div>
          ))}
        </div>
      </section>
      <button onClick={deleteAllFromPage}>Vycisti stranu</button>
    </div>
  )
}

export default Home
