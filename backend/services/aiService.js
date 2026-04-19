const OpenAI = require('openai');

const getClient = () => {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === 'your_openai_api_key_here') return null;
  return new OpenAI({ apiKey: key });
};

const generateQuestions = async (role, difficulty) => {
  const client = getClient();
  if (!client) return getMockQuestions(role, difficulty);

  try {
    const prompt = `Generate exactly 5 technical interview questions for a ${role} developer at ${difficulty} difficulty level.
Include a mix of conceptual questions and scenario-based questions that test real-world skills.
Return ONLY a valid JSON array of 5 strings, no markdown, no extra text.
Example: ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]`;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content.trim();
    const questions = JSON.parse(content);
    if (Array.isArray(questions) && questions.length === 5) return questions;
    return getMockQuestions(role, difficulty);
  } catch (error) {
    console.error('OpenAI question generation error:', error.message);
    return getMockQuestions(role, difficulty);
  }
};

const evaluateAnswer = async (question, answer, role, difficulty) => {
  const client = getClient();
  if (!client) return getMockEvaluation(answer);

  try {
    const prompt = `You are an expert technical interviewer. Evaluate this interview answer strictly and fairly.

Role: ${role} Developer
Difficulty: ${difficulty}
Question: ${question}
Candidate's Answer: ${answer || '(No answer provided)'}

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "score": <integer 1-10>,
  "feedback": "<2-3 sentence overall assessment>",
  "strengths": ["<specific strength>", "<specific strength>"],
  "weaknesses": ["<specific weakness>", "<specific weakness>"],
  "improvedAnswer": "<a comprehensive model answer of 3-5 sentences>"
}`;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 1200,
    });

    const content = response.choices[0].message.content.trim();
    const evaluation = JSON.parse(content);
    return evaluation;
  } catch (error) {
    console.error('OpenAI evaluation error:', error.message);
    return getMockEvaluation(answer);
  }
};

const getMockQuestions = (role, difficulty) => {
  const bank = {
    Frontend: {
      Easy: [
        'What is the difference between HTML, CSS, and JavaScript? How do they work together to build a webpage?',
        'Explain the CSS box model and describe the role of margin, border, padding, and content.',
        'What is the DOM and how do you select and manipulate elements using JavaScript?',
        'What are the differences between var, let, and const in JavaScript? When would you use each?',
        'How does event bubbling work in JavaScript? Can you give a practical example?',
      ],
      Medium: [
        'Explain closures in JavaScript. Provide a real-world example of when you would use one.',
        'What is the virtual DOM in React and why does it improve performance compared to direct DOM manipulation?',
        'How does CSS Flexbox work? Describe key properties and when you would choose it over CSS Grid.',
        'What are React hooks? Explain useState, useEffect, and useContext with practical use cases.',
        'Explain the JavaScript event loop, the call stack, and the task queue. How does async code work?',
      ],
      Hard: [
        'How would you optimize a React application that suffers from excessive re-renders? Walk through your diagnostic process.',
        'Describe different state management solutions (Redux, Zustand, Context API, Jotai) and the trade-offs of each.',
        'Explain how the browser renders a webpage from raw HTML/CSS to pixels on screen (the critical rendering path).',
        'What is code splitting and tree shaking? How would you implement them in a production Vite or Webpack project?',
        'How would you build an accessible, keyboard-navigable modal component from scratch? What ARIA attributes are involved?',
      ],
    },
    Backend: {
      Easy: [
        'What is REST and what are its 6 guiding constraints? How do they shape API design?',
        'Explain the difference between SQL and NoSQL databases. When would you choose one over the other?',
        'What are the common HTTP methods (GET, POST, PUT, PATCH, DELETE) and when should each be used?',
        'What is middleware in Express.js? How does the middleware chain work?',
        'What is the difference between authentication and authorization? Give examples of each.',
      ],
      Medium: [
        'Explain database indexing. What types of indexes exist and when does an index hurt performance?',
        'How does JWT-based authentication work end to end? What are its advantages and risks compared to sessions?',
        'How would you design a RESTful API for a blog platform? Describe your route structure and data models.',
        'Explain the N+1 query problem with an example. How do you detect and fix it?',
        'What is the difference between horizontal and vertical scaling? When would you use each strategy?',
      ],
      Hard: [
        'Design a distributed rate-limiting system that works across multiple Node.js instances. What data store would you use and why?',
        'Explain ACID properties and the CAP theorem. How do they influence your database architecture decisions?',
        'How would you implement an event-driven microservices architecture for an e-commerce platform? Discuss message brokers and data consistency.',
        'Describe a zero-downtime database migration strategy for a 100M-row table that is actively serving traffic.',
        'How would you build a real-time notification system that scales to 1 million concurrent users?',
      ],
    },
    'Full Stack': {
      Easy: [
        'Explain the client-server model. How does an HTTP request flow from a browser button click all the way to a database query and back?',
        'What is CORS? Why does it exist and how do you configure it in an Express backend?',
        'How do cookies, sessions, and localStorage differ? When would you use each for storing user data?',
        'What is the MVC pattern? Describe how it maps to a typical full-stack web application.',
        'Explain the difference between client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG).',
      ],
      Medium: [
        'Walk through implementing JWT authentication end-to-end in a MERN stack app, from registration to protected API calls.',
        'Compare GraphQL and REST. What are the real-world advantages and disadvantages of each? When would you choose GraphQL?',
        'How would you handle secure file uploads in a full-stack application? Discuss validation, storage, and serving.',
        'Explain how WebSockets work and when you would prefer them over HTTP polling or Server-Sent Events.',
        'How would you implement role-based access control (RBAC) across both the frontend routes and backend API?',
      ],
      Hard: [
        'Design a scalable real-time collaborative document editor (like Google Docs). How do you handle conflict resolution and operational transforms?',
        'How would you architect a full-stack application to handle 1 million concurrent users? Discuss caching, load balancing, and database sharding.',
        'Describe a complete CI/CD pipeline for a full-stack app with blue-green deployment. How do you handle database migrations in this flow?',
        'How would you design a multi-tenant SaaS application? Discuss data isolation strategies, customization, and per-tenant billing.',
        'Explain your approach to observability in a full-stack production app. What would you monitor, alert on, and trace?',
      ],
    },
  };

  return bank[role]?.[difficulty] || bank['Full Stack']['Medium'];
};

const getMockEvaluation = (answer) => {
  const wordCount = (answer || '').trim().split(/\s+/).filter(Boolean).length;
  const score = Math.min(10, Math.max(1, Math.round(Math.min(wordCount / 12, 6)) + 3));

  const evaluations = [
    {
      score,
      feedback: `Your answer shows ${score >= 7 ? 'a solid' : score >= 5 ? 'a developing' : 'a limited'} grasp of the concept. ${wordCount < 15 ? 'The response lacks depth — consider expanding with examples and explanations.' : 'You touched on the main ideas, but could go deeper with concrete examples.'} Interviewers at top companies expect you to demonstrate applied knowledge, not just definitions.`,
      strengths: [
        score >= 7 ? 'Demonstrates clear conceptual understanding' : 'Attempts to address the core topic',
        wordCount > 40 ? 'Answer is well-developed with sufficient detail' : 'Concise and to the point',
      ],
      weaknesses: [
        score < 8 ? 'Missing concrete real-world examples or code snippets' : 'Could explore edge cases and trade-offs more',
        'Does not discuss potential pitfalls or alternative approaches',
      ],
      improvedAnswer: `A strong answer would: (1) Define the concept clearly in 1-2 sentences. (2) Explain how it works internally or mechanically. (3) Give a concrete real-world example or code snippet. (4) Discuss trade-offs, edge cases, or when NOT to use this approach. (5) Mention best practices or related concepts that show breadth of knowledge.`,
    },
  ];

  return evaluations[0];
};

module.exports = { generateQuestions, evaluateAnswer };
