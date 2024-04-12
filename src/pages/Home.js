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

  return (
    <section className="home-section">
      <div className="home-div">
        <h1>Zoznam materialu v RZP posadke</h1>
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

      <div className="home-items">{error && <p>{error}</p>}</div>
    </section>
  )
}

export default Home
