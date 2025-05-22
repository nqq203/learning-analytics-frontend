// import DashboardPage from "@/components/Dashboard";

// export default function Home() {
//     return (
//         <DashboardPage></DashboardPage>
//     );
// }

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/register");
  }, []);

  return null;
}

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import DashboardPage from "@/components/Dashboard";

// export default function Home() {
//     const router = useRouter();

//     useEffect(() => {
//         const isAuthenticated =true
//         //  localStorage.getItem("isAuthenticated");
//         const isAuthenticated = localStorage.getItem("isAuthenticated");
//         if (!isAuthenticated) {
//             router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
//         }
//     }, []);

//     return <DashboardPage />;
// }
