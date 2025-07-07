import RootLayout from "./layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterContextProvider } from "@/context/FilterContext";
import AuthGuard from "@/components/AuthGuard";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
            </ThemeProvider>
        </Provider>
    );
}