import Navbar from "./navbar/navbar.jsx"
import Footer from "./footer"
function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className=" px-4 min-h-screen mx-auto">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
