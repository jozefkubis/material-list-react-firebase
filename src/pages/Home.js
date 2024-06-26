import "./Home.css"
import { projectFirestore } from "../firebase/Config"
import { useState, useEffect } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

const Home = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [selectedItems, setSelectedItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //MARK: get data from firebase
  useEffect(() => {
    return projectFirestore.collection("materialList").onSnapshot(
      (snapshot) => {
        setError(snapshot.empty ? "Nenašli sa žiadne položky" : "")
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        setIsLoading(false)
      },
      (err) => {
        setError(err.message)
        setIsLoading(false) // Nastaví načítanie na false aj v prípade chyby
      }
    )
  }, [])

  //MARK: handle search
  const handleSearchChange = (e) => setSearchTerm(e.target.value);


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

  //MARK: delete item from page
  /**
   * This function is called when the user clicks the delete all button.
   * It sets the display of the element that called it to "none"
   * 
   * @param {event} e The event that triggered this function call
   */
  const hide = (e) => {
    // Get the element that triggered this function call
    const element = e.currentTarget
    // Set the display of that element to "none" 
    element.style.display = "none"
  }

  //MARK: return home
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
          {isLoading ? (
            <p className="loading-text">Načítava sa...</p> // Zobrazenie indikátora načítania
          ) : error ? (
            <p>{error}</p>
          ) : (
            searchTerm &&
            filteredData.map((oneItem) => (
              <div key={oneItem.id}>
                <button onClick={() => sendToSelected(oneItem.item)}>
                  {oneItem.item.toLowerCase()}
                </button>
              </div>
            ))
          )}
          {!isLoading && filteredData.length === 0 && !error && (
            <p className="loading-text">Nenašli sa žiadne položky</p>
          )}
        </div>
        <div className="selected-delete">
          <h1 className="selected-h">Vybrane položky</h1>
          <button className="delete-page-btn" onClick={deleteAllFromPage}>
            <RiDeleteBin6Line className="delete-icon" />
          </button>
        </div>

        <div className="selected-items">
          {selectedItems.map((oneItem, index) => (
            <div key={index} onClick={(e) => hide(e)} className="selected-item-div">
              <button className="selected-item-btn">{oneItem}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home


