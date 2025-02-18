import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Pages/emailverification.module.css";

const EmailVerification: React.FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Retrieve the user's email from the query parameters
  const userEmail =
    typeof router.query.email === "string" ? router.query.email : "";

  // Function to partially mask the email
  const getPartialEmail = (email: string) => {
    const [local, domain] = email.split("@");
    if (local.length > 2) {
      return local.substring(0, 2) + "**@" + domain;
    }
    return local + "**@" + domain;
  };

  const displayedEmail = userEmail ? getPartialEmail(userEmail) : "ka**@gmail.com";

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Call the verify-email endpoint with email and code
      const response = await fetch("http://localhost:8000/verify-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, code }),
      });
      
      if (response.ok) {
        // On success, redirect the user to the login page
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.detail || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={handleGoBack} className={styles.backButton}>
            ←
          </button>
          <span className={styles.brand}>Swipe</span>
          <button className={styles.closeButton}>&times;</button>
        </div>

        {/* Title */}
        <h2 className={styles.title}>
          Nous devons vérifier votre adresse e-mail
        </h2>

        {/* Subtitle showing the partially masked email */}
        <p className={styles.subtitle}>
          Un code de vérification a été envoyé à{" "}
          <strong>{displayedEmail}</strong>.{" "}
          <span className={styles.link}>Pas mon adresse e-mail ?</span>
        </p>

        {/* Form for entering the verification code */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Entrer le code"
              value={code}
              onChange={handleCodeChange}
              className={styles.input}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <p className={styles.infoText}>
            Vous n’avez pas reçu l’e-mail ? Vérifiez votre dossier spam/courriers
            indésirables.
          </p>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Vérification..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
