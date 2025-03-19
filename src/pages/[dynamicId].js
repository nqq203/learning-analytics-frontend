'use client'
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import ErrorPage from "./NotFound";

export default function DynamicPage() {
    const router = useRouter();
    const param = useParams();
    const { asPath } = router;
    
    const renderPage = useCallback(() => {
      if (asPath.startsWith("/")) {
        // router.push("/");
      }
      return <ErrorPage />  
    }, [asPath]);

    return renderPage();
};