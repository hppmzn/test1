# Enterprise Multi-AI Agent Chatbot (Azure Static Web Apps Ready)

A simple, professional, user-friendly chatbot frontend designed as a deployment-ready starter for **Azure Static Web Apps** with placeholders for enterprise integrations:

- Multi-model routing (GPT, Claude, Gemini)
- GitHub Enterprise connectivity point
- Microsoft Entra ID SSO integration point
- SharePoint, Email, and Teams knowledge connectors
- Future ITSM adapter slot
- Security headers and frontend data-protection posture

## Run locally

Because this is a static app, you can open `/home/runner/work/test1/test1/index.html` directly in a browser, or use any local static server.

## Deploy to Azure Static Web Apps

1. Push this repository to GitHub.
2. In Azure Portal, create a **Static Web App**.
3. Set app location to `/` and output location to `/`.
4. Keep `staticwebapp.config.json` in the repository root for routing and security headers.

## Integration notes

The current implementation provides secure integration placeholders so you can wire in your backend APIs for:

- GitHub Enterprise OAuth/token flow
- Entra ID OIDC SSO
- Microsoft Graph access (SharePoint/Email/Teams)
- ITSM tool API integration

For production, implement backend token handling in Azure Functions or your secure API tier (do not expose secrets in frontend code).
