/*
ui types
*/

export const RunJoinBotConfig = {
    "vad": {
        "tag": "silero_vad_analyzer",
        "args": { "stop_secs": 0.7 }
    },
    "asr": {
        "tag": "sense_voice_asr",
        "args": {
            "language": "zn",
            "model_name_or_path": "./models/FunAudioLLM/SenseVoiceSmall"
        }
    },
    "llm": {
        "tag": "openai_llm_processor",
        "base_url": "https://api.together.xyz/v1",
        "model": "Qwen/Qwen2.5-72B-Instruct-Turbo",
        "language": "zh-CN",
        "messages": []
    },
    "img_gen": {
        "tag": "TogetherImageGenProcessor",
        "args": {
            "gen_rate_s": 10,
            "model": "black-forest-labs/FLUX.1-schnell-Free"
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