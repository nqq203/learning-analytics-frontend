import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/LoginForm.module.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/"); // Chuyển hướng về Dashboard
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        {/* Hiển thị logo từ thư mục public/images */}
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
