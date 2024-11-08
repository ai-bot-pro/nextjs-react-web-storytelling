import React from "react";
import { Button } from "@/components/ui/button";
import DevicePicker from "@/components/DevicePicker";
import { IconAlertCircle, IconEar, IconLoader2 } from "@tabler/icons-react";

type SetupProps = {
  handleStart: () => void;
};

const buttonLabel = {
  intro: "Next",
  setup: "Let's begin!",
  loading: "Joining...",
};
export const Setup: React.FC<SetupProps> = ({ handleStart }) => {
  const [state, setState] = React.useState<"intro" | "setup" | "loading">(
    "intro"
  );

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div className="bg-white rounded-3xl cardAnim cardShadow p-9 max-w-screen-sm mx-auto outline outline-[5px] outline-gray-600/10 my-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-pretty tracking-tighter mb-4">
            Welcome to <span className="text-sky-500">Storytime</span>
          </h1>
          {state === "intro" ? (
            <>
              <p className="text-gray-600 leading-relaxed text-pretty">
                This app demos a voice-controlled storytelling chatbot. It will
                start with the bot asking you what kind of story you&apos;d like
                to hear (e.g. a fairy tale, a mystery, etc.). After each scene,
                the bot will pause to ask for your input. Direct the story any
                way you choose!
              </p>
              <p className="text-gray-600 leading-relaxed text-pretty">
                该应用程序演示了一个语音控制的讲故事聊天机器人。首先，机器人会询问您想听什么类型的故事（例如童话故事、悬疑故事等）。
                每个场景结束后，机器人都会暂停以询问您的输入。随心所欲地讲述故事！
              </p>
              <p className="flex flex-row gap-2 text-gray-600 font-medium">
                <IconEar size={24} /> For best results, try in a quiet
                environment! (为了获得最佳效果，请在安静的环境中尝试！)
              </p>
              <p className="flex flex-row gap-2 text-gray-600 font-medium text-red-500">
                <IconAlertCircle size={24} /> This demo expires after 5 minutes.
                (该演示将在 5 分钟后过期。)
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 leading-relaxed text-pretty">
                Since you&apos;ll be talking to Storybot, we need to make sure
                it can hear you! Please configure your microphone and speakers
                below.
              </p>
              <DevicePicker />
            </>
          )}
          <hr className="border-gray-150 my-2" />

          <Button
            size="lg"
            disabled={state === "loading"}
            onClick={() => {
              if (state === "intro") {
                setState("setup");
              } else {
                setState("loading");
                handleStart();
              }
            }}
          >
            {state === "loading" && (
              <IconLoader2
                size={21}
                stroke={2}
                className="mr-2 h-4 w-4 animate-spin"
              />
            )}
            {buttonLabel[state]}
          </Button>
        </div>
      </div>
      <footer className="flex-0 text-center font-mono text-sm text-gray-100 py-6">
        <span className="bg-gray-800/70 px-3 py-1 rounded-md">
          Source Code:{" "}
          <a
            href="https://github.com/ai-bot-pro/nextjs-react-web-storytelling"
            className="text-violet-300 underline decoration-violet-400 hover:text-violet-100"
          >
            https://github.com/ai-bot-pro/nextjs-react-web-storytelling
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Setup;
