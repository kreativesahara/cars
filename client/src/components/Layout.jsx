import Navbar from "./navbar/navbar.jsx"
import Footer from "./footer"
function Layout ({children}) {
    return (
        <>
        <Navbar />
        <main className="body w-full">
            {children}
        </main>
        <Footer />
        </>
    )
}

export default Layout
