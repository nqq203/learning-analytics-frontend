import RootLayout from "./layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
    const router = useRouter();
    
    return (
        <Provider store={store}>
            {Component.unauthorized ? (
                <Component {...pageProps} />
            ) : (
                <RootLayout>
                    <Component {...pageProps} />
                </RootLayout>
            )}
        </Provider>
    )
}