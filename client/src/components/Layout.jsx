import Navbar from "./navbar/navbar.jsx"
import Footer from "./footer"
function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className=" px-4 min-h-screen min-w-[400px] max-w-[2000px] mx-auto">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
