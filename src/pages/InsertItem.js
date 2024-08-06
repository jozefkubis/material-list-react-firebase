import "./InsertItem.css"
import { projectFirestore } from "../firebase/Config"
import { usePagesContext } from "../contexts/PagesContext"

const InsertItem = () => {
  const { insertItem, dispatch } = usePagesContext()

  const submitForm = async (e) => {
    e.preventDefault()

    const newItem = { item: insertItem }

    try {
      await projectFirestore.collection("materialList").add(newItem)
      dispatch({ type: "setInsertItem", payload: "" })
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
            onChange={(e) =>
              dispatch({ type: "setInsertItem", payload: e.target.value })
            }
            value={insertItem}
          />
          <button className="insert-btn">Vlozit</button>
        </form>
      </div>
    </section>
  )
}

export default InsertItem
