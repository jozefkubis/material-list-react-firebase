import "./SelectedItems.css"
import { projectFirestore } from "../firebase/Config"
import { useEffect, useState } from "react"

const SelectedItems = ({ selectedItems }) => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = projectFirestore.collection("materialList").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Nenašli sa žiadne položky")
        } else {
          setError("")
          setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        }
      },
      (err) => setError(err.message)
    )
    return unsubscribe // Odhlásenie od listenera pri odmontovaní komponentu
  }, [])

  // Predpokladajme, že 'selectedItems' je pole ID položiek, ktoré chcete zobraziť
  const itemsToShow = data.filter((item) => selectedItems.includes(item.id))

  return (
    <section>
      <div className="selected-items">
        <h1>Vybrané položky</h1>
        {error && <p>{error}</p>}
        {itemsToShow.length > 0 &&
          itemsToShow.map((oneItem) => (
            <div key={oneItem.id} className="selected-item">
              <p>{oneItem.item}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default SelectedItems
