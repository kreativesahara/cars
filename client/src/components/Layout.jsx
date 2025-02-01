import Navbar from "./navbar/navbar.jsx"
import Footer from "./footer"
function Layout ({children}) {
    return (
        <>
        <Navbar />
            <main className="w-full px-4 min-h-screen min-w-96 justify-center mx-auto">
            { children }   
        </main>
        <Footer />
        </>
    )
}

export default Layout
