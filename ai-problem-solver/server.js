const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/solve", async (req, res) => {

    try {

        const { problem } = req.body;

        if (!problem) {
            return res.status(400).json({
                error: "Please enter a problem."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6",
            input: `You are LifeMate, a helpful personal AI companion.

Help the user with study, career, coding, goals, productivity, learning, resume, interviews, planning, daily life, or personal concerns.

Give clear and practical answers in simple language.
Break complicated things into small steps.
Be supportive and honest.

User's message:

${problem}`
        });

        res.json({
            solution: response.output_text
        });

    } catch (error) {

        console.error("OpenAI Error:", error);

        res.status(500).json({
            error: error.message ||
                "Something went wrong while talking to LifeMate."
        });
    }
});

app.listen(3000, () => {
    console.log("🤖 LifeMate running at http://localhost:3000");
});