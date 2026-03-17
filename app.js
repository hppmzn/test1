const models = [
  { id: 'gpt-4.1', name: 'GPT-4.1 (Complex incidents & root-cause)' },
  { id: 'claude-sonnet', name: 'Claude Sonnet (Policy & communication)' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Knowledge summarization)' }
];

const connectors = [
  { name: 'GitHub Enterprise', status: 'Ready for OAuth app registration' },
  { name: 'Microsoft Entra ID SSO', status: 'Ready for OIDC/OpenID Connect flow' },
  { name: 'SharePoint Knowledge Base', status: 'Ready for Microsoft Graph ingestion' },
  { name: 'Outlook/Email', status: 'Ready for mailbox event connector' },
  { name: 'Microsoft Teams', status: 'Ready for Teams message/event connector' },
  { name: 'Future ITSM Integration', status: 'Reserved API adapter slot available' }
];

const modelSelect = document.getElementById('modelSelect');
const connectorList = document.getElementById('connectorList');
const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const clearChatButton = document.getElementById('clearChat');

function appendMessage(text, role) {
  const message = document.createElement('div');
  message.className = `message ${role}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getAgentReply(input, modelId) {
  const lowerInput = input.toLowerCase();
  let route = 'general support';

  if (lowerInput.includes('incident') || lowerInput.includes('problem')) {
    route = 'incident triage';
  } else if (lowerInput.includes('policy') || lowerInput.includes('security')) {
    route = 'governance and security';
  } else if (lowerInput.includes('knowledge') || lowerInput.includes('sharepoint')) {
    route = 'knowledge retrieval';
  }

  return [
    `Model selected: ${modelId}`,
    `Routing profile: ${route}`,
    'Enterprise data connectors are configured as secure placeholders.',
    'Next step: bind this UI to your Azure Functions / API backend for live model calls.'
  ].join('\n');
}

function renderModelOptions() {
  models.forEach((model) => {
    const option = document.createElement('option');
    option.value = model.id;
    option.textContent = model.name;
    modelSelect.appendChild(option);
  });
}

function renderConnectors() {
  connectors.forEach((connector) => {
    const item = document.createElement('li');
    item.textContent = `${connector.name}: ${connector.status}`;
    connectorList.appendChild(item);
  });
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();

  if (!message) {
    return;
  }

  appendMessage(message, 'user');
  appendMessage(getAgentReply(message, modelSelect.value), 'agent');
  messageInput.value = '';
  messageInput.focus();
});

clearChatButton.addEventListener('click', () => {
  chatWindow.textContent = '';
  appendMessage('Conversation cleared. Security note: no local persistence is enabled.', 'agent');
});

renderModelOptions();
renderConnectors();
appendMessage('Welcome. Select a model and ask your enterprise support question.', 'agent');
