import { useState } from 'react';

export default function Settings() {
  const [aiProvider, setAiProvider] = useState('azure-openai');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Stub: settings not persisted in this scaffold
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

      <div className="max-w-2xl space-y-6">
        {/* AI Provider */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">AI Provider</h3>
          <div className="space-y-3">
            {[
              { value: 'azure-openai', label: 'Azure OpenAI', desc: 'Use Azure-hosted GPT models' },
              { value: 'openai', label: 'OpenAI', desc: 'Use OpenAI API directly' },
              { value: 'anthropic', label: 'Anthropic Claude', desc: 'Use Claude via Anthropic API' },
            ].map((opt) => (
              <label key={opt.value} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="provider"
                  value={opt.value}
                  checked={aiProvider === opt.value}
                  onChange={(e) => setAiProvider(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                  <p className="text-xs text-gray-500">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">API Configuration</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key…"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-400 mt-1">Your key is stored locally and never sent to our servers.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint URL (optional)</label>
              <input
                type="url"
                placeholder="https://your-resource.openai.azure.com/"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              {saved ? '✓ Saved!' : 'Save Settings'}
            </button>
          </form>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-sm text-gray-600">Multi-Agent AI Console · v0.1.0</p>
          <p className="text-xs text-gray-400 mt-1">Scaffold build — AI integration coming soon.</p>
        </div>
      </div>
    </div>
  );
}
