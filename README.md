# test1

This repository is set up with an enterprise baseline for secure-by-default delivery on Azure.

## Engineering Baseline

- **Authentication/Authorization:** Microsoft Entra ID (OIDC/OAuth2) is required. Deny-by-default authorization, role-based access (`Admin`, `Manager`, `User`, `Auditor`), least privilege.
- **Data layer:** Azure SQL Serverless with EF Core migrations only. No manual production schema edits.
- **Secrets management:** Managed Identity + Azure Key Vault only. No secrets in source control, logs, issues, or workflow configs.
- **Compliance controls:** PDPA-aware data minimization, purpose limitation, retention policy support, sensitive access auditing, and PII-safe logging.
- **Observability:** Structured logging with correlation IDs; no internal stack traces or sensitive data leaked to clients.
- **Deployment model:** Tenant-agnostic IaC parameters and GitHub Actions OIDC federation.

## CI Gate Policy

All changes are expected to pass:

1. Build
2. Lint/format
3. Tests
4. Security checks
5. Secret scanning
6. IaC validation (when IaC exists)

The workflow in `.github/workflows/ci-gates.yml` provides these gate categories with conditional execution so an empty or partially scaffolded repository remains green while still enforcing checks once relevant project files are added.

## Required Azure Parameters (tenant-agnostic)

Use parameterized IaC values:

- `tenantId`
- `subscriptionId`
- `resourceGroupName`
- `location`
- `appNamePrefix`
- `entraClientId`
- `sqlServerName` / SQL settings

## Definition of Done

Each feature/bugfix should include:

- Plan and file-level impact
- Implementation
- Tests (unit/integration where applicable)
- Security and compliance notes (PDPA/ISO-aligned)
- Deployment notes (IaC/Actions impact)
- Risk, mitigation, and rollback notes
