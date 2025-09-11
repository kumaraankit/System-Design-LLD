import OpenAi from 'openai';

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

export const checkIfUrlIsMalicious = async (url) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Is the following URL malicious? ${url}`
                }
            ]
        });
        return response.choices[0].message.content.trim().toLowerCase() === 'safe';
    } catch (error) {
        console.error("Error checking URL:", error);
        throw new Error("Failed to check URL");
        return false
    }
};
