import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useToken } from "@/context/TokenProvider"; 
import styles from "@/styles/LoginForm.module.css";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { saveTokens } = useToken(); 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://api.example.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Sai tài khoản hoặc mật khẩu!");

            const data = await response.json();
            saveTokens(data.accessToken, data.refreshToken); 
            router.push("/"); // Chuyển hướng về Dashboard
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>
                    <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        className={styles.inputField}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className={styles.inputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.loginButton}>
                        Đăng nhập
                    </button>
                </form>
                <p className={styles.forgotPassword}>Quên mật khẩu?</p>
            </div>
        </div>
    );
}

LoginPage.unauthorized = true;
