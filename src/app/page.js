"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Typewriter from "./typewriter";
import OpenAI from "openai";

export default function Home() {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [response2, setResponse2] = useState("");

  function sendTest() {
    setLoading(true);
    setResponse("");
    setResponse2("");
    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
    );

    async function main(input) {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: input }],
          model: "gpt-3.5-turbo",
        });
        console.log(completion);
        setResponse2(completion.choices[0].message.content);
      } catch (error) {
        console.error(error);
      }
    }

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
    main(document.getElementById("input").value);
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
            action={() => {
              sendTest();
            }}
          >
            <label className="dark:text-white text-black" htmlFor="input">
              Input:
            </label>
            <textarea id="input" name="input" required />
            <button type="submit">Submit</button>
          </form>
        )}
        <div className={styles.responseContainer}>
          {response ? (
            <div className={styles.responseColumn}>
              <h1>Gemini</h1>
              <Typewriter text={response} delay={10} />
            </div>
          ) : null}
          {response2 ? (
            <div className={styles.responseColumn}>
              <h1>ChatGPT</h1>
              <Typewriter text={response2} delay={10} />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
