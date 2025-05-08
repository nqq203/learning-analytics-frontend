import { useToken } from "@/context/TokenProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import RootLayout from "@/pages/layout";
import "../styles/global.css";
function AuthWrapper({ Component, pageProps }) {
    const router = useRouter();
    const { accessToken,isLoading } = useToken();

    
    useEffect(() => {
        
      if (!accessToken && router.pathname !== "/login" && isLoading==false) {  
        router.push("/login");
      }
      
    }, [accessToken, router,isLoading]);
    
    if (isLoading) return null;

    
    

    if (router.pathname === "/login") {
        
      return <Component {...pageProps} />;
    }
  
    
    return (
        (router.pathname != "/login" & accessToken ) ? (
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        ) : null
      );
  }
  export default AuthWrapper;
  