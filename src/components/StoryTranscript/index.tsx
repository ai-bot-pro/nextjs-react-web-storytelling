"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppMessage } from "@daily-co/daily-react";
import { DailyEventObjectAppMessage } from "@daily-co/daily-js";

import styles from "./StoryTranscript.module.css";
import { TypewriterEffect } from "../ui/typewriter";

export default function StoryTranscript() {
  const [partialText, setPartialText] = useState<string>("");
  const [sentences, setSentences] = useState<string[]>([]);
  const intervalRef = useRef<any | null>(null);

  useEffect(() => {
    // const t = setTimeout(() => setSentences([]), 8000);
    // return () => clearTimeout(t);
    // clearInterval(intervalRef.current);
    // intervalRef.current = setInterval(() => {
    //   if (sentences.length > 2) {
    //     setSentences((s) => s.slice(1));
    //   }
    // }, 5000);
    // return () => clearInterval(intervalRef.current);
  }, [sentences]);

  useAppMessage({
    onAppMessage: (e: DailyEventObjectAppMessage<any>) => {
      if (e.data && e.data.type === "bot-tts-text") {
        // console.log("story DailyEventObjectAppMessage->", e);
        if (e.data.data && e.data.data.text) {
          //setPartialText("");
          setSentences((s) => [...s, e.data.data.text]);
        } else {
          //setPartialText(e.data.data.text);
        }
      }
      if (e.data && e.data.type === "tts-stopped") {
        // console.log("tts-stopped DailyEventObjectAppMessage->", e);
        setSentences([]);
      }
    },
  });

  return (
    <div className={`${styles.container} `}>
      <TypewriterEffect words={sentences} />
      {/* {sentences.map((sentence, index) => (
        <p key={index} className={`${styles.transcript} ${styles.sentence}`}>
          <span>{sentence}</span>
        </p>
      ))} */}
      {partialText && (
        <p className={`${styles.transcript}`}>
          <span>{partialText}</span>
        </p>
      )}
    </div>
  );
}
