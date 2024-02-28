"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  function sendTest() {
    setLoading(true);
    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
    );

    async function run(input) {
      try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = input;
        const result = await model.generateContent(prompt);

        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    run(document.getElementById("input").value);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <form
            className={styles.contactForm}
            name="contact-form"
            action={() => sendTest()}
          >
            <label className="dark:text-white text-black" htmlFor="input">
              Input:
            </label>
            <textarea id="input" name="input" required />
            <button type="submit">Submit</button>
          </form>
        )}
        {response ? <p className={styles.response}>{response}</p> : null}
      </div>
    </main>
  );
}
