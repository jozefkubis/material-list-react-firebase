import { createContext, useContext, useReducer, useEffect } from "react"
import { projectFirestore } from "../firebase/Config"

const PagesContext = createContext()

const initialState = {
  data: [],
  searchTerm: "",
  error: "",
  selectedItems: [],
  isLoading: true,
  insertItem: "",
  showAll: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, data: action.payload }
    case "setSearchTerm":
      return { ...state, searchTerm: action.payload }
    case "setError":
      return { ...state, error: action.payload }
    case "setSelectedItems":
      return { ...state, selectedItems: action.payload }
    case "setIsLoading":
      return { ...state, isLoading: action.payload }
    case "setInsertItem":
      return { ...state, insertItem: action.payload }
    default:
      throw new Error("Unknown action")
  }
}

function PagesProvider({ children }) {
  const [
    { data, searchTerm, error, selectedItems, isLoading, insertItem, showAll },
    dispatch,
  ] = useReducer(reducer, initialState)

  //MARK: get data from firebase
  useEffect(() => {
    return projectFirestore.collection("materialList").onSnapshot(
      (snapshot) => {
        dispatch({
          type: "setError",
          payload: snapshot.empty ? "Nenašli sa žiadne položky" : "",
        })
        dispatch({
          type: "setData",
          payload: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        })
        dispatch({ type: "setIsLoading", payload: false })
      },
      (err) => {
        dispatch({ type: "setError", payload: err.message })
        dispatch({ type: "setIsLoading", payload: false })
      }
    )
  }, [])

  //MARK: handle search
  const handleSearchChange = (e) =>
    dispatch({ type: "setSearchTerm", payload: e.target.value })

  //MARK: filter data
  const filteredData = data.filter(
    (oneItem) =>
      oneItem.item &&
      oneItem.item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //MARK: send data to selected
  const sendToSelected = (item) => {
    dispatch({
      type: "setSelectedItems",
      payload: [...selectedItems, item.toLowerCase()],
    })
  }

  //MARK: delete selected data from page
  const deleteAllFromPage = () => {
    dispatch({ type: "setSelectedItems", payload: [] })
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

  return (
    <PagesContext.Provider
      value={{
        dispatch,
        data,
        searchTerm,
        error,
        selectedItems,
        isLoading,
        filteredData,
        handleSearchChange,
        sendToSelected,
        deleteAllFromPage,
        hide,
        insertItem,
        showAll,
      }}
    >
      {children}
    </PagesContext.Provider>
  )
}

function usePagesContext() {
  const context = useContext(PagesContext)
  if (context === undefined) {
    throw new Error("usePagesContext must be used within a PagesProvider")
  }
  return context
}

export { usePagesContext, PagesProvider }
