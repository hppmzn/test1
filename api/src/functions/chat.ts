import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function chatHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('Chat function triggered');

  // Parse request body
  let message = '';
  try {
    const body = await request.json() as { message?: string };
    message = body.message ?? '';
  } catch {
    return {
      status: 400,
      jsonBody: { error: 'Invalid JSON body' },
    };
  }

  if (!message.trim()) {
    return {
      status: 400,
      jsonBody: { error: 'Message is required' },
    };
  }

  // Stub response — replace with real AI call when integrating providers
  const stubbedReply = generateStubReply(message);

  return {
    status: 200,
    jsonBody: {
      reply: stubbedReply,
      model: 'stub',
      timestamp: new Date().toISOString(),
    },
  };
}

function generateStubReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! How can I assist you today?';
  }
  if (lower.includes('task') || lower.includes('todo')) {
    return "You have 4 open tasks. Your most urgent one is due Mar 19 — don't forget to submit your expense report!";
  }
  if (lower.includes('meeting')) {
    return 'Your last meeting was "Weekly Sync - Engineering" on Mar 17. Key action items: Alice to update API docs, Bob to schedule design review.';
  }
  if (lower.includes('file') || lower.includes('document')) {
    return 'I found 4 recently viewed files. The most recent is "Q1 Strategy Deck.pptx" viewed 2 hours ago.';
  }
  return `I received your message: "${message}". This is a stub response — real AI integration coming soon! 🤖`;
}

app.http('chat', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'chat',
  handler: chatHandler,
});
