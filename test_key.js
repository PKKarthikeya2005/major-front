import fetch from 'node-fetch';

const API_KEY = "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";

async function testGroq() {
    console.log("Testing Groq API Key...");
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Updated model name
                messages: [
                    { role: "user", content: "Hello, are you working?" }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ API Failed! Status: ${response.status}`);
            console.error("Error Details:", errorText);
        } else {
            const data = await response.json();
            console.log("✅ API Success!");
            console.log("Response:", data.choices[0].message.content);
        }
    } catch (error) {
        console.error("❌ Network/Script Error:", error.message);
    }
}

testGroq();
