"use client";

import React, { useState } from "react";

import { useDaily } from "@daily-co/daily-react";

import { RunJoinBotConfig } from "@/app/types";
import Setup from "./Setup";
import Story from "./Story";

type State =
  | "idle"
  | "connecting"
  | "connected"
  | "started"
  | "finished"
  | "error";

export default function Call() {
  const daily = useDaily();

  const [state, setState] = useState<State>("idle");

  async function start() {
    setState("connecting");

    if (!daily) return;

    // Create a new room for the story session
    try {
      const response = await fetch("api/start-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: RunJoinBotConfig,
        }),
      });

      const { code, message, data } = (await response.json()) as {
        code: number;
        message: string;
        data: any;
      };
      if (code != 0) {
        throw new Error(message);
      }

      const room_url = data["room_url"];
      const token = data["token"];
      // Join the WebRTC session
      await daily.join({
        url: room_url,
        token,
        videoSource: false,
        startAudioOff: true,
      });

      setState("connected");

      // Disable local audio, the bot will say hello first
      daily.setLocalAudio(false);

      setState("started");
    } catch (error) {
      setState("error");
    }
  }

  async function leave() {
    await daily?.leave();
    setState("finished");
  }

  if (state === "error") {
    return (
      <div className="flex items-center mx-auto">
        <p className="text-red-500 font-semibold bg-white px-4 py-2 shadow-xl rounded-lg">
          This demo is currently at capacity. Please try again later.
        </p>
      </div>
    );
  }

  if (state === "started") {
    return <Story handleLeave={() => leave()} />;
  }

  return <Setup handleStart={() => start()} />;
}
