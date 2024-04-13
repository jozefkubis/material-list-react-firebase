import "./Home.css"
import { projectFirestore } from "../firebase/Config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    return projectFirestore.collection("materialList").onSnapshot(
      (snapshot) => {
        setError(snapshot.empty ? "Nenašli sa žiadne položky" : "")
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      },
      (err) => setError(err.message)
    )
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredData = data.filter((oneItem) =>
    oneItem.item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
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
                <p>{oneItem.item.toLowerCase()}</p>
            </div>
          ))
        ) : (
          <p>Nenašli sa žiadne položky</p>
        )}
      </div>
    </section>
  )
}

export default Home
