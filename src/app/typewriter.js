import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import styles from "./page.module.scss";

export default function Typewriter({ text, delay }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  // Typing logic goes here

  return (
    <div className={styles.response}>
      <Markdown>{currentText}</Markdown>
    </div>
  );
}
