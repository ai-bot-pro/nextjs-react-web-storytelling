// api types
export interface EngineClassInfo {
    tag?: string;
    args?: Map<string, any>;
}

export interface RunBotInfo {
    task_connector?: string;
    room_manager?: string;
    is_agent?: boolean;
    chat_bot_name?: string;
    config?: Map<string, any>;
    room_name?: string;
    room_url?: string;
    token?: string;
    config_list?: Array<EngineClassInfo>;
    services?: Map<string, any>;
}
export interface APIResponse {
    error_code?: number;
    error_detail?: string;
    data?: any;
}

export interface BotJoinResponse {
    room_name?: string;
    room_url?: string;
    config?: Map<string, any>;
    bot_id?: string;
    status?: string;
}
