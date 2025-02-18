import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/pages/signup.module.css"; // Reusing the same CSS module

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Save tokens in localStorage (or your preferred storage)
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        // Redirect to the dashboard or home page
        router.push("/contact");
      } else {
        const data = await response.json();
        setError(data.detail || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.brand}>Swipe</span>
          <button className={styles.close}>&times;</button>
        </div>

        <h2 className={styles.title}>Se connecter</h2>
        <p className={styles.subtitle}>
          Vous n'avez pas de compte ?{" "}
          <Link href="/signup" className={styles.link}>
            Créer un compte
          </Link>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email Field */}
          <div className={styles.inputContainer}>
            <Image
              src="/images/email.jpg"
              alt="Email"
              width={24}
              height={24}
              className={styles.icon}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
              required
            />
          </div>
          {/* Password Field */}
          <div className={styles.inputContainer}>
            <Image
              src="/images/padlock.jpg"
              alt="Mot de passe"
              width={24}
              height={24}
              className={styles.icon}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Connexion..." : "Continuer"}
          </button>
        </form>

        <p className={styles.footerText}>
          Klarna <span className={styles.remember}>se souviendra de vous</span> pour que vous vous connectiez plus rapidement.
        </p>

        <p className={styles.legal}>
          Protégé par reCAPTCHA :{" "}
          <Link href="#" className={styles.link}>
            Politique
          </Link>{" "}
          et{" "}
          <Link href="#" className={styles.link}>
            conditions
          </Link>{" "}
          de Google.
        </p>
        <p className={styles.legal}>
          En continuant, j’accepte les{" "}
          <Link href="#" className={styles.link}>
            Conditions d’utilisation
          </Link>{" "}
          ·{" "}
          <Link href="#" className={styles.link}>
            Confidentialité
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
