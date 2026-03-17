export const recentFiles = [
  { id: '1', name: 'Q1 Strategy Deck.pptx', type: 'PowerPoint', viewedAt: '2 hours ago' },
  { id: '2', name: 'Budget 2026.xlsx', type: 'Excel', viewedAt: 'Yesterday' },
  { id: '3', name: 'Project Roadmap.docx', type: 'Word', viewedAt: '2 days ago' },
  { id: '4', name: 'Team OKRs.pdf', type: 'PDF', viewedAt: '3 days ago' },
];

export const lastMeeting = {
  title: 'Weekly Sync - Engineering',
  date: 'Mar 17, 2026',
  attendees: ['Alice', 'Bob', 'Carol', 'David'],
  summary:
    'Discussed Q2 priorities. Agreed to ship the new dashboard by end of month. Alice to follow up on API documentation. Bob will schedule design review.',
  actionItems: [
    { owner: 'Alice', task: 'Update API documentation' },
    { owner: 'Bob', task: 'Schedule design review' },
    { owner: 'Carol', task: 'Review test coverage report' },
  ],
};

export const suggestedTasks = [
  'Review the pull request from Bob on the new auth flow',
  'Prepare slides for the all-hands meeting on Friday',
  'Follow up with Carol on the Q2 budget approval',
];

export const myTasks = [
  { id: '1', title: 'Finalize Q2 roadmap document', due: 'Mar 20', done: false },
  { id: '2', title: 'Review design mockups for new feature', due: 'Mar 21', done: false },
  { id: '3', title: 'Submit expense report', due: 'Mar 19', done: true },
  { id: '4', title: 'Schedule 1:1 with manager', due: 'Mar 22', done: false },
  { id: '5', title: 'Update team wiki page', due: 'Mar 24', done: false },
];
