import RootLayout from "./layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { TokenProvider } from "@/context/TokenProvider";  
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FilterContextProvider} from "@/context/FilterContext";
export default function App({ Component, pageProps }) {
    const router = useRouter();
      
      return (
        <Provider store={store}>
            <TokenProvider>
                <FilterContextProvider>
                        {Component.unauthorized ? (
                            <Component {...pageProps} />
                        ) : (
                            <RootLayout>
                                <Component {...pageProps} />
                            </RootLayout>
                        )}
                </FilterContextProvider>
            </TokenProvider>
            
            <ToastContainer />
        </Provider>
    );
}