import { usePagesContext } from "../contexts/PagesContext"
import "./Home.css"
// import { projectFirestore } from "../firebase/Config"
// import { useEffect, useReducer } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

const Home = () => {
  const {
    isLoading,
    searchTerm,
    handleSearchChange,
    error,
    filteredData,
    sendToSelected,
    deleteAllFromPage,
    hide,
    selectedItems,
  } = usePagesContext()

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
            <div
              key={index}
              onClick={(e) => hide(e)}
              className="selected-item-div"
            >
              <button className="selected-item-btn">{oneItem}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
