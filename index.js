require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 5001;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
    //   model: "text-davinci-003",
      messages:[{
        role: "user",
        content:prompt
      }],
      max_tokens:256
    });
    return res.status(200).json({
      success: true,
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error.Error + error.message + error.prompt);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));