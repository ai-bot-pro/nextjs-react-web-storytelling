export const post = async (
    serverUrl: string,
    serverAuth: string | null,
    payload: any,
) => {
    const response = await fetch(`${serverUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${serverAuth}`
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res: any = await response.json();
    if (serverUrl.includes("api.cortex.cerebrium.ai")) {
        return res["result"];
    }
    return res;
};
