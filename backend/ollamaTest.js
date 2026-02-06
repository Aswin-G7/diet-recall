import ollama from 'ollama';

async function streamChat() {
  const message = { role: 'user', content: 'how many calories, protien, sugar and fat does 2 eggs have. send only in json without any explanations and quotes or any marks. only strict json should be your result' };
  
  const response = await ollama.chat({ 
    model: 'gpt-oss:20b-cloud', 
    messages: [message], 
    stream: true 
  });

  for await (const part of response) {
    process.stdout.write(part.message.content); // Prints chunks as they arrive
  }
}

streamChat();