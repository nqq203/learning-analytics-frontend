import RootLayout from "./layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { TokenProvider,useToken  } from "@/context/TokenProvider";  
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./login";
import AuthWrapper from "@/context/AuthWrapper";
export default function App({ Component, pageProps }) {
    const router = useRouter();
      
      return (
        <Provider store={store}>
            <TokenProvider>
                {/* {Component.unauthorized ? 
                (
                    <Component {...pageProps} />
                ) 
                : 
                (
                    <RootLayout>
                        <Component {...pageProps} />
                    </RootLayout>
                )} */}

                <AuthWrapper Component={Component} pageProps={pageProps}></AuthWrapper>
            </TokenProvider>
            <ToastContainer />
        </Provider>
    );
}