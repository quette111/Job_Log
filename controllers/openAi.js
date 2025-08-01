import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const postDataForOpenAi = async (req, res) => {
console.log('in ai function sevrer side')
  const { applicationStatus, job, company } = req.body

  if (!applicationStatus || !job || !company) {
    return res.status(401).json({ error: "error bro" })
  }

  try {

     const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume advisor. I will give you the company name, position I am applying for then you give 3 actionable tips based on the company and position. Keep each point brief 1-2 sentences and do not provide any text but the 3 tips. Also, if you do not recognize the job name tell the user you dont recognize it and suggest they delete their jobLog entry and retry',
        },
        {
          role: 'user',
          content: `The company i am targeting is:\n${company}\n\nI am targeting a job in: ${job}`,
        },
      ],
    });

    const tips = response.choices[0].message.content;
 
    res.status(201).json({ tips })
  } catch (error) {
    console.log('Error', error)
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export{postDataForOpenAi}