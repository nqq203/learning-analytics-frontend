import RootLayout from "./layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterContextProvider } from "@/context/FilterContext";
import AuthGuard from "@/components/AuthGuard";

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <FilterContextProvider>
                {Component.unauthorized ? (
                    <Component {...pageProps} />
                ) : (
                    <AuthGuard>
                        <RootLayout>
                            <Component {...pageProps} />
                        </RootLayout>
                    </AuthGuard>
                )}
            </FilterContextProvider>
            <ToastContainer />
        </Provider>
    );
}