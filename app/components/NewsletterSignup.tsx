"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="newsletter-container">
      <h3 className="newsletter-title">Stay Updated</h3>
      <p className="newsletter-description">
        Get notified about new films, mint dates, and exclusive updates.
      </p>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="newsletter-input"
          required
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="newsletter-button"
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
        </button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`newsletter-message ${status === "error" ? "error" : "success"}`}
        >
          {message}
        </motion.p>
      )}

      <style jsx>{`
        .newsletter-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 20px;
        }

        .newsletter-title {
          font-family: var(--font-pineapple-regular), ui-sans-serif, system-ui;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 400;
          margin: 0 0 12px;
          color: var(--fg);
        }

        .newsletter-description {
          color: var(--muted);
          margin: 0 0 32px;
          font-size: 16px;
          line-height: 1.6;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .newsletter-input {
          flex: 1;
          min-width: 250px;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: var(--fg);
          font-size: 16px;
          outline: none;
          transition: all 0.2s ease;
        }

        .newsletter-input:focus {
          border-color: var(--accent);
          background: rgba(255,255,255,0.08);
        }

        .newsletter-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .newsletter-button {
          padding: 14px 32px;
          background: var(--accent);
          color: var(--bg);
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .newsletter-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(217, 255, 91, 0.3);
        }

        .newsletter-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .newsletter-message {
          margin-top: 16px;
          font-size: 14px;
          padding: 12px;
          border-radius: 8px;
        }

        .newsletter-message.success {
          color: var(--accent);
          background: rgba(217, 255, 91, 0.1);
        }

        .newsletter-message.error {
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
        }

        @media (max-width: 600px) {
          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-input {
            min-width: 100%;
          }

          .newsletter-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

