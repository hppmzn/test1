import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recentFiles, lastMeeting, suggestedTasks, myTasks as initialTasks } from '../data/dummyData';

function FileIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    PowerPoint: '📊',
    Excel: '📗',
    Word: '📘',
    PDF: '📄',
  };
  return <span>{icons[type] ?? '📁'}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [prompt, setPrompt] = useState('');

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handlePromptSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (prompt.trim()) {
      navigate(`/chat?q=${encodeURIComponent(prompt.trim())}`);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-8">
        <h2 className="text-2xl font-bold">Good morning! 👋</h2>
        <p className="text-indigo-100 mt-1">Here's what's happening today, Mar 17, 2026.</p>
      </div>

      <div className="flex-1 px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Previously Viewed Files */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📂</span> Previously Viewed Files
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="text-2xl"><FileIcon type={file.type} /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.viewedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Meeting Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <span>📅</span> Last Meeting Summary
            </h3>
            <p className="text-xs text-gray-500 mb-3">{lastMeeting.title} · {lastMeeting.date}</p>
            <p className="text-sm text-gray-700 mb-4">{lastMeeting.summary}</p>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Action Items</p>
              <ul className="space-y-1">
                {lastMeeting.actionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span><span className="font-medium">{item.owner}:</span> {item.task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggested Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>✨</span> Suggested Tasks
            </h3>
            <ul className="space-y-2">
              {suggestedTasks.map((task, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-sm text-indigo-800 cursor-pointer hover:bg-indigo-100 transition-colors"
                >
                  <span>🤖</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column - My Tasks */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>✅</span> My Tasks
            </h3>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center text-xs transition-colors ${
                      task.done
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {task.done && '✓'}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">Due {task.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tasks completed</span>
                <span className="font-medium text-indigo-600">
                  {tasks.filter((t) => t.done).length}/{tasks.length}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${(tasks.filter((t) => t.done).length / tasks.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Meetings today</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Unread messages</span>
                <span className="font-medium text-red-500">7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Prompt Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4">
        <form onSubmit={handlePromptSubmit} className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI anything… e.g. 'Summarize my tasks for today'"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            disabled={!prompt.trim()}
          >
            Ask AI ✨
          </button>
        </form>
      </div>
    </div>
  );
}
