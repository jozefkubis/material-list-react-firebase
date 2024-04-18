import "./DeleteItem.css"
import { projectFirestore } from "../firebase/Config"
import { useState, useEffect } from "react"
import { IoMdClose } from "react-icons/io"

const DeleteItem = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [showAll, setShowAll] = useState(false)

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

  //MARK: delete item from firebase
  const deleteItem = async (id) => {
    try {
      await projectFirestore.collection("materialList").doc(id).delete()
      setData(data.filter((oneItem) => oneItem.id !== id))
    } catch (error) {
      setError("Chyba pri odstraňovaní položky: " + error.message)
    }
  }

  return (
    <section>
      <div className="delte-div">
        <h1>Vymaz položku</h1>
        <form>
          <input
            type="search"
            placeholder="Vyhladavanie"
            value={searchTerm}
            onChange={handleSearchChange}
          />{" "}
          <br />
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Skryť všetky položky" : "Rozbal všetky položky"}
          </button>
        </form>
      </div>

      <div>
        {error && <p>{error}</p>}
        {searchTerm ? (
          filteredData.map((oneItem) => (
            <div key={oneItem.id}>
              {oneItem.item.toLowerCase()}{" "}
              <button
                onClick={() => deleteItem(oneItem.id)}
                className="delete-button"
              >
                <IoMdClose />
              </button>
            </div>
          ))
        ) : (
          <p>Hladaj položku</p>
        )}
        {showAll &&
          data.map((oneItem) => (
            <div key={oneItem.id}>
              {oneItem.item.toLowerCase()}
              <button
                onClick={() => deleteItem(oneItem.id)}
                className="delete-button"
              >
                <IoMdClose />
              </button>
            </div>
          ))}
      </div>
    </section>
  )
}

export default DeleteItem
