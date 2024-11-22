/*
ui types
*/
export const asr_model = process.env.NEXT_PUBLIC_ASR_MODEL_NAME_OR_PATH ? process.env.NEXT_PUBLIC_ASR_MODEL_NAME_OR_PATH : "./models/FunAudioLLM/SenseVoiceSmall";
export const llm_model = process.env.NEXT_PUBLIC_TOGEHTER_LLM_MODEL ? process.env.NEXT_PUBLIC_TOGEHTER_LLM_MODEL : "Qwen/Qwen2.5-72B-Instruct-Turbo";
export const img_gen_model = process.env.NEXT_PUBLIC_TOGEHTER_IMG_GEN_MODEL ? process.env.NEXT_PUBLIC_TOGEHTER_IMG_GEN_MODEL : "black-forest-labs/FLUX.1-schnell-Free";
export const RunJoinBotConfig = {
    "vad": {
        "tag": "silero_vad_analyzer",
        "args": { "stop_secs": 0.7 }
    },
    "asr": {
        "tag": "sense_voice_asr",
        "args": {
            "language": "zn",
            "model_name_or_path": asr_model
        }
    },
    "llm": {
        "tag": "openai_llm_processor",
        "base_url": "https://api.together.xyz/v1",
        "model": llm_model,
        "language": "zh-CN",
        "messages": []
    },
    "img_gen": {
        "tag": "TogetherImageGenProcessor",
        "args": {
            "gen_rate_s": 10,
            "model": img_gen_model,
        }
    },
    "tts": {
        "tag": "tts_edge",
        "args": {
            "voice_name": "zh-CN-YunjianNeural",
            "language": "zh-CN",
            "gender": "Male"
        }
    }
};