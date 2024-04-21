import "./DeleteItem.css"
import { projectFirestore } from "../firebase/Config"
import { useState, useEffect } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";


const DeleteItem = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Pridaný stav pre indikátor načítania

  //MARK: get data from firebase
  useEffect(() => {
    return projectFirestore.collection("materialList").onSnapshot(
      (snapshot) => {
        setError(snapshot.empty ? "Nenašli sa žiadne položky" : "")
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        setIsLoading(false) // Nastaví načítanie na false po načítaní dát
      },
      (err) => {
        setError(err.message)
        setIsLoading(false) // Nastaví načítanie na false aj v prípade chyby
      }
    )
  }, [])

  //MARK: handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleShowAll = (e) => {
    e.preventDefault()
    setShowAll(!showAll)
  }

  //MARK: filter data
  const filteredData = data.filter(
    (oneItem) =>
      oneItem.item &&
      oneItem.item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //MARK: delete item from firebase
  const deleteItem = async (id) => {
    try {
      await projectFirestore.collection("materialList").doc(id).delete()
      setData(data.filter((oneItem) => oneItem.id !== id))
    } catch (error) {
      setError("Chyba pri odstraňovaní položky: " + error.message)
    }
  }

  //MARK: show all items
  const allItems = data.filter((oneItem) => oneItem && oneItem.item)


  //MARK: return section
  return (
    <section>
      <div className="delete-div">
        <h1>Vymaz položku</h1>
        <form className="delete-search-form">
          <input
            type="search"
            placeholder="Vyhladavanie"
            value={searchTerm}
            onChange={handleSearchChange}
          />{" "}
          <br />
          <button onClick={handleShowAll}>
            {showAll ? "Skryť všetky položky" : "Rozbal všetky položky"}
          </button>
        </form>
      </div>

      <div>
        {isLoading ? (
          <p>Načítava sa...</p> // Zobrazenie indikátora načítania
        ) : error ? (
          <p>{error}</p>
        ) : (
          searchTerm &&
          filteredData.map((oneItem) => (
            <div className="div-item" key={oneItem.id}>
              <button className="button">{oneItem.item.toLowerCase()}</button>
              <button
                onClick={() => deleteItem(oneItem.id)}
                className="delete-button"
              >
                <RiDeleteBin6Line className="delete-icon"/>
              </button>
            </div>
          ))
        )}
        {!isLoading && !showAll && filteredData.length === 0 && !error && (
          <p>Nenašli sa žiadne položky</p>
        )}
        {showAll &&
          allItems.map((oneItem) => (
            <div className="div-item" key={oneItem.id}>
              <button className="button">{oneItem.item.toLowerCase()}</button>
              <button
                onClick={() => deleteItem(oneItem.id)}
                className="delete-button"
              >
                <RiDeleteBin6Line className="delete-icon"/>
              </button>
            </div>
          ))}
      </div>
    </section>
  )
}

export default DeleteItem
