import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Main } from "next/document";

const RootLayout = ({ children }) => {
    return (
        <div className="app">
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout;