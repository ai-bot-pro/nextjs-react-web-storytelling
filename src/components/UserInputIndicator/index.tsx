import React, { useState, useEffect } from "react";

import { useAppMessage } from "@daily-co/daily-react";
import { DailyEventObjectAppMessage } from "@daily-co/daily-js";
import styles from "./UserInputIndicator.module.css";
import { IconMicrophone } from "@tabler/icons-react";
import { TypewriterEffect } from "../ui/typewriter";
import AudioIndicator from "../AudioIndicator";

interface Props {
  active: boolean;
}

export default function UserInputIndicator({ active }: Props) {
  const [transcription, setTranscription] = useState<string[]>([]);

  useAppMessage({
    onAppMessage: (e: DailyEventObjectAppMessage<any>) => {
      if (e.data && e.data.type === "user-transcription") {
        console.log("user DailyEventObjectAppMessage->", e);
        if (e.data.data.user_id === "" && e.data.data.final) {
          setTranscription((t) => [...t, ...e.data.data.text.split(" ")]);
        }
      }
    },
  });

  useEffect(() => {
    if (active) return;
    const t = setTimeout(() => setTranscription([]), 4000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className={`${styles.panel} ${active ? styles.active : ""}`}>
      <div className="relative z-20 flex flex-col">
        <div
          className={`${styles.micIcon} ${active ? styles.micIconActive : ""}`}
        >
          <IconMicrophone size={42} />
          {active && <AudioIndicator />}
        </div>
        <footer className={styles.transcript}>
          <TypewriterEffect words={transcription} />
        </footer>
      </div>
    </div>
  );
}
