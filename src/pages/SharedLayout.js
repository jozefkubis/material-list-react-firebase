import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import { PagesProvider } from "../contexts/PagesContext"

const SharedLayout = () => {
  return (
    <main>
      <Navbar />
      <PagesProvider>
        <Outlet />
      </PagesProvider>
      <Footer />
    </main>
  )
}

export default SharedLayout
