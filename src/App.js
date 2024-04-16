import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SelectedItems from "./pages/SelectedItems"
import InsertItem from "./pages/InsertItem"
import DeleteItem from "./pages/DeleteItem"
import SharedLayout from "./pages/SharedLayout"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="selected" element={<SelectedItems />} />
        <Route path="insert" element={<InsertItem />} />
        <Route path="delete" element={<DeleteItem />} />
      </Route>
    </Routes>
  )
}

export default App
