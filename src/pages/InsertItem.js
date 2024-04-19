import "./InsertItem.css"
import { useState } from "react"
import { projectFirestore } from "../firebase/Config"

const InsertItem = () => {
  const [insertItem, setInsertItem] = useState("")

  const submitForm = async (e) => {
    e.preventDefault()

    const newItem = { item: insertItem }

    try {
      await projectFirestore.collection("materialList").add(newItem)
      setInsertItem("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <div className="insert-div">
        <h1>Uloz polozku</h1>
      <form onSubmit={submitForm} className="insert-form">
        <input
          type="text"
          placeholder="Polozka"
          onChange={(e) => setInsertItem(e.target.value)}
          value={insertItem}
        />
        <button className="insert-btn">Vlozit</button>
      </form>
      </div>
      
    </section>
  )
}

export default InsertItem
