# PRD-TKT-001: Ticket Management System
**Initiative:** Unified In-IDE Ticket Management | **Platform:** ENGO.STUD
**Author:** Akshat Jindal — Principal Technical PM | **Date:** 2026-11-06
**Status:** 🟡 Draft — Pending Engineering Review
**Linked ADR:** [ADR-001: Unified FDE Single-Pane Architecture](.zenith/knowledge/adrs/ADR-001-architecture-foundation.md)
**Source of Truth:** `.zenith/pm.json`

---

## 1. Executive Summary & Problem Statement

### 1.1 Executive Summary

ENGO.STUD's mission is to collapse the fragmented Forward Deployed Engineer (FDE) toolchain into a **single-pane, zero-context-switch canvas**. The Ticket Management System is the **connective tissue** of this canvas — it bridges client intent (PRDs), engineering execution (code commits), and quality gates (AI-powered test results) into one live, Git-persisted Kanban lifecycle.

This PRD defines the full scope of Ticket Management as a first-class subsystem within ENGO.STUD v3.x, covering task lifecycle, AI-driven automation, real-time collaboration, and deep Monaco editor integration.

### 1.2 Problem Statement

> **Traditional engineering workflows impose a 30%+ productivity tax through context switching.** Engineers toggle between Jira (tickets), VS Code (code), Confluence (specs), and Slack (status updates) — none of which share a live state.

Specifically, the current state causes:

| Pain Point | Observed Impact |
|---|---|
| Manual ticket status updates (Jira) | ~45 min/engineer/day lost to admin |
| No link between a commit and its parent ticket | Broken traceability; audit failures |
| Ticket backlog diverges from actual code state | Sprint planning based on stale data |
| Bug triage requires cross-tool navigation | P1 resolution time inflated by 60% |
| Zero AI assistance in ticket decomposition | PRDs take 2–4 hrs to convert to sprint tasks |

### 1.3 Opportunity

By embedding ticket management **inside** the IDE and wiring it directly to Git commits, test runners, and AI agents, ENGO.STUD can:

- **Eliminate manual status updates** via autonomous agent state transitions
- **Guarantee full traceability** from PRD → Epic → Task → Commit → Test Result
- **Reduce sprint planning time by 70%** through AI-powered ticket decomposition
- **Surface bugs as first-class tickets** auto-populated from test failures

---

## 2. Target User Personas

### 👤 Persona 1 — Akshat Jindal · *Lead FDE & Technical PM*
> **Goal:** Own the full delivery lifecycle end-to-end without leaving ENGO.STUD.

- **Context:** Writes PRDs, decomposes epics, assigns sprint tasks, monitors burn-down.
- **Pain:** Switching between Notion (PRDs), Jira (tickets), and GitHub (commits) for status sync.
- **Key Need:** One-click PRD → Epic → Task decomposition with AI assistance. Real-time sprint board that reflects code state.
- **Success Metric:** PRD-to-sprint-ready tasks generated in < 2 minutes.

---

### 👤 Persona 2 — Sarah Chen · *Full-Stack Developer*
> **Goal:** Work on tickets without ever leaving the editor.

- **Context:** Picks up assigned tasks, opens linked files in Monaco, commits code, marks task done.
- **Pain:** Manually updating ticket status in Jira after each commit; no visible link between code and ticket.
- **Key Need:** Ticket sidebar docked in-IDE. Commit auto-links to ticket. Status auto-advances on passing tests.
- **Success Metric:** Zero manual Jira-equivalent updates during a sprint.

---

### 👤 Persona 3 — Marcus Vance · *QA & Automation Engineer*
> **Goal:** Bugs raised from test failures become first-class tickets automatically.

- **Context:** Owns regression suites, triages failures, verifies bug patches.
- **Pain:** Manually filing bug tickets from test output; re-running tests after patches with no audit trail.
- **Key Need:** Auto-created BUG tickets from failed test runs with reproduction steps pre-filled. AI agent assigned automatically for P1/P2.
- **Success Metric:** Bug-to-ticket creation time < 10 seconds, fully automated.

---

### 👤 Persona 4 — ENGO Autonomous Agent 🤖 · *AI Bug Hunter & Test Engineer*
> **Goal:** Advance ticket lifecycle without human intervention when quality gates pass.

- **Context:** Monitors test pipelines, reproduces bugs, generates patches, runs regression, closes tickets.
- **Pain (Design Constraint):** Must only transition tickets when deterministic test evidence exists — no speculative state changes.
- **Key Need:** Read/write access to `.zenith/pm.json` via a safe, event-driven API. Must emit audit log entries for every state transition.

---

## 3. High-Priority User Stories

### Epic: Ticket Lifecycle Management

| ID | User Story | Priority |
|---|---|---|
| **US-01** | As a **Lead FDE**, I want to create a new ticket (Task or Bug) from anywhere in ENGO.STUD using a keyboard shortcut, so that I never lose context from the editor. | 🔴 Must-Have |
| **US-02** | As a **Lead FDE**, I want to decompose a PRD into Epics, Tasks, and Bugs using an AI assistant, so that sprint planning takes minutes, not hours. | 🔴 Must-Have |
| **US-03** | As a **Full-Stack Developer**, I want to see my assigned tickets in a docked sidebar next to Monaco, so that I can open linked files directly from the ticket. | 🔴 Must-Have |
| **US-04** | As a **Full-Stack Developer**, I want a Git commit to auto-link to its parent ticket (via ticket ID in commit message), so that full traceability is maintained without manual effort. | 🔴 Must-Have |
| **US-05** | As an **Autonomous Agent**, I want to advance a ticket's status from `In Progress` → `Done` automatically when all linked regression tests pass, so that the board reflects ground truth. | 🔴 Must-Have |
| **US-06** | As a **QA Engineer**, I want failing test runs to automatically create BUG tickets pre-filled with reproduction steps and stack traces, so that no failure is ever silently dropped. | 🔴 Must-Have |
| **US-07** | As a **Full-Stack Developer**, I want to filter the Kanban board by Assignee, Priority, Epic, and Sprint, so that I can focus on my immediate workload. | 🟠 Should-Have |
| **US-08** | As a **Lead FDE**, I want to view a Sprint Burn-Down chart derived from `.zenith/pm.json`, so that I can present live progress without exporting data. | 🟠 Should-Have |
| **US-09** | As any **Team Member**, I want to leave threaded comments on a ticket linked to a specific file and line number in Monaco, so that code review and ticket discussion are co-located. | 🟠 Should-Have |
| **US-10** | As a **Lead FDE**, I want to export the full sprint report (tasks, bugs, test coverage, burn-down) as a PDF/Markdown, so that I can share it with external stakeholders. | 🟡 Could-Have |
| **US-11** | As an **Autonomous Agent**, I want to emit a structured audit log entry for every ticket status transition it performs, so that all automated changes are human-reviewable. | 🔴 Must-Have |
| **US-12** | As a **Full-Stack Developer**, I want ticket status changes I make in the IDE to be immediately reflected in `.zenith/pm.json` and committed as a Git note, so that the board is always in sync with the repository. | 🔴 Must-Have |

---

## 4. Acceptance Criteria (Gherkin Format)

### US-01 · Quick Ticket Creation

```gherkin
Feature: Quick Ticket Creation

  Scenario: Create a Task ticket via keyboard shortcut
    Given the user is focused anywhere within ENGO.STUD IDE
    When the user presses Ctrl+Shift+T (or Cmd+Shift+T on Mac)
    Then a modal dialog opens with fields: Title, Type (Task|Bug), Priority, Epic, Assignee, Description
    And the modal is pre-populated with the current open file path in "Linked Files"
    When the user submits the form
    Then a new ticket entry is appended to .zenith/pm.json under the correct collection
    And the ticket appears immediately on the Kanban board in the "To Do" column
    And a git commit is staged with message "chore(pm): add [TASK-{id}] {title}"

  Scenario: Validation on empty required fields
    Given the ticket creation modal is open
    When the user clicks "Create" with an empty Title field
    Then the Title field is highlighted with a rose (#f43f5e) error border
    And the error message "Title is required" appears beneath the field
    And no entry is written to .zenith/pm.json
```

### US-02 · AI-Powered PRD Decomposition

```gherkin
Feature: AI-Powered Ticket Decomposition from PRD

  Scenario: Decompose a PRD into sprint-ready tasks
    Given a PRD document is open in the Monaco editor
    When the user clicks "Decompose with AI" in the PRD Studio panel
    Then the active LLM (Claude/Gemini/Antigravity/Ollama) processes the PRD text
    And within 30 seconds, a structured decomposition is presented in a review panel
    And the decomposition contains at least one Epic, Tasks with priorities, and estimated story points
    When the user clicks "Accept All"
    Then all generated tickets are written to .zenith/pm.json
    And each ticket references the parent PRD as its "source" field

  Scenario: Partial acceptance of AI decomposition
    Given an AI decomposition is shown in the review panel
    When the user deselects 2 tasks and clicks "Accept Selected"
    Then only the selected tasks are written to .zenith/pm.json
    And the rejected tasks are discarded without any state mutation
```

### US-05 · Autonomous Agent Status Transition

```gherkin
Feature: Autonomous Ticket Status Advancement

  Scenario: Agent advances ticket to Done on all tests passing
    Given ticket TASK-103 has status "In Progress"
    And TASK-103 has linked test files ["tests/task103.spec.js"]
    When the ENGO Autonomous Agent runs the test suite
    And all linked tests return exit code 0
    Then TASK-103 status is updated to "Done" in .zenith/pm.json
    And an audit log entry is appended: { "actor": "AI_AGENT", "ticket": "TASK-103", "from": "In Progress", "to": "Done", "evidence": "test_run_id:{id}", "timestamp": "{ISO8601}" }
    And the Kanban board reflects the status change within 1 second (SSE push)

  Scenario: Agent does NOT advance ticket if any test fails
    Given ticket TASK-104 has status "In Progress"
    When the ENGO Autonomous Agent runs the test suite
    And at least one linked test returns a non-zero exit code
    Then TASK-104 status remains "In Progress" in .zenith/pm.json
    And no audit log entry is written for a state transition
    And a BUG ticket is auto-created from the failure output (see US-06)
```

### US-06 · Auto Bug Ticket from Test Failure

```gherkin
Feature: Automatic Bug Ticket Creation from Test Failures

  Scenario: BUG ticket auto-created on test failure
    Given the test runner completes with one or more failures
    When the ENGO Agent processes the failure output
    Then for each distinct failing test, a BUG ticket is created in .zenith/pm.json
    And the ticket contains:
      | Field         | Value                                   |
      | id            | Auto-incremented BUG-{n}                |
      | title         | Failing test name (truncated to 80 chars)|
      | severity      | Derived from test tags (P1/P2/P3)       |
      | reproduction  | Full stack trace (first 30 lines)       |
      | assignee      | "ENGO Autonomous Agent"                  |
      | status        | "To Do"                                 |
    And the BUG ticket appears in the Kanban board "To Do" column immediately

  Scenario: Duplicate bug suppression
    Given BUG-401 already exists for "Terminal CRLF normalization failure"
    When the same test fails again in a subsequent run
    Then no new BUG ticket is created
    And a "recurrence" counter on BUG-401 is incremented by 1
```

### US-12 · Git-Persisted Ticket State

```gherkin
Feature: Git-Backed Ticket Persistence

  Scenario: Ticket status change is committed to Git
    Given the developer drags TASK-104 from "In Progress" to "Done" on the Kanban board
    When the status change is confirmed
    Then .zenith/pm.json is updated with status: "Done"
    And a Git note is appended: "pm: TASK-104 → Done by {user} at {timestamp}"
    And the change appears in git log --notes within 5 seconds

  Scenario: Concurrent edit conflict resolution
    Given two users update the same ticket simultaneously
    When both changes are written
    Then the system performs a last-write-wins merge on the specific ticket object
    And both changes are logged in the audit trail
    And neither the entire .zenith/pm.json is corrupted nor any other ticket is affected
```

---

## 5. Technical Architecture & Component Layout

### 5.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ENGO.STUD IDE Canvas                          │
│                                                                       │
│  ┌──────────────────┐  ┌───────────────────┐  ┌───────────────────┐  │
│  │   Monaco Editor   │  │   Kanban Board     │  │   PRD Studio      │  │
│  │  (Source Code)    │◄─┤  (pm.json view)   │  │  (AI Decompose)   │  │
│  │                   │  │                   │  │                   │  │
│  │  [Ticket Gutter]  │  │  To Do │ In Prog  │  │  [Accept / Edit]  │  │
│  │  TASK-104 ●       │  │  │Done │ Bugs │   │  │  → pm.json write  │  │
│  └────────┬──────────┘  └────────┬──────────┘  └────────┬──────────┘  │
│           │                      │                       │              │
│           └──────────────────────┴───────────────────────┘              │
│                                  │                                       │
│                       ┌──────────▼──────────┐                           │
│                       │   Ticket Service     │                           │
│                       │  (Node.js / SSE)     │                           │
│                       │  - CRUD on pm.json   │                           │
│                       │  - Git commit hook   │                           │
│                       │  - SSE broadcast     │                           │
│                       │  - Audit log writer  │                           │
│                       └──────────┬──────────┘                           │
│                                  │                                       │
│           ┌──────────────────────┴───────────────────────┐              │
│           │                                               │              │
│  ┌────────▼──────────┐                      ┌────────────▼───────────┐  │
│  │   Test Runner     │                      │   AI / LLM Gateway     │  │
│  │  (Jest/Pytest)    │                      │  Claude│Gemini│Ollama  │  │
│  │  → emit results   │                      │  → PRD decomposition   │  │
│  │  → trigger Agent  │                      │  → bug triage summary  │  │
│  └────────┬──────────┘                      └────────────────────────┘  │
│           │                                                              │
│  ┌────────▼──────────────────────────────────────────────────────────┐  │
│  │                   ENGO Autonomous Agent                            │  │
│  │  - Watch test results → update pm.json (status transitions)       │  │
│  │  - Create BUG tickets from failures                               │  │
│  │  - Write audit log entries (append-only)                          │  │
│  │  - Never speculate — only act on deterministic test evidence       │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                        ┌─────────▼──────────┐
                        │  .zenith/pm.json    │
                        │  (Git-persisted,    │
                        │   single source     │
                        │   of truth)         │
                        └────────────────────┘
```

### 5.2 Component Breakdown

#### 5.2.1 Frontend — React 18 Components

| Component | Responsibility | Tokens |
|---|---|---|
| `<KanbanBoard />` | Renders sprint columns (To Do / In Progress / Done / Bugs). Drag-and-drop reorder. SSE-subscribed for live updates. | `bg-ide-card/80`, `backdrop-blur-md` |
| `<TicketCard />` | Atomic card per ticket. Shows ID, title, priority badge, assignee avatar, linked files count. | `sky` actions, `rose` bugs, `emerald` done |
| `<TicketModal />` | Create / Edit modal. Full field validation at submit boundary. | `amber` for warnings, `rose` for validation errors |
| `<TicketSidebar />` | Docked right panel in Monaco showing "My Tickets". Clicking a ticket opens linked files. | `purple` for AI-sourced tickets |
| `<BurnDownChart />` | SVG-based chart computed from pm.json task completion over sprint dates. | `sky` line, `emerald` fill |
| `<AuditLogViewer />` | Paginated, append-only display of agent actions. Read-only. | `amber` for agent actions |
| `<PRDStudio />` | Sends PRD text to AI gateway; renders structured decomposition for review; writes accepted tickets. | `purple` AI accent |

> **Conventions:** All components are functional with atomic custom hooks (`useTickets`, `useSSE`, `useKanban`). Dark-mode first. Lucide icons at 16×16.

#### 5.2.2 Backend — Node.js Ticket Service

| Module | Responsibility |
|---|---|
| `ticket.service.js` | CRUD operations on `.zenith/pm.json`. Validates all inputs at API boundary. Emits SSE events on mutation. |
| `git.service.js` | Stages and commits `.zenith/pm.json` changes as structured Git notes after each mutation. |
| `agent.controller.js` | Receives test-runner events; invokes autonomous state transitions; calls `audit.service.js`. |
| `audit.service.js` | Append-only writer to `.zenith/audit.log` (NDJSON). Never mutates existing entries. |
| `sse.broker.js` | Server-Sent Events broadcaster. Pushes `ticket:updated`, `ticket:created`, `bug:raised` events to all IDE tabs. |
| `llm.router.js` | Routes PRD decomposition requests to the active LLM (Claude/Gemini/Antigravity/Ollama). Streams structured JSON output. |

> **Architecture Rule Compliance:** Zero unnecessary external dependencies. No ORM. Direct `fs` reads/writes on `pm.json` with file-lock (using `proper-lockfile`). Clean domain separation: ticket domain logic never imports HTTP/SSE transport code.

#### 5.2.3 Data Model — `.zenith/pm.json` Extensions

```jsonc
// New fields added to existing schema (non-breaking additions only)
{
  "tasks": [{
    "id": "TASK-105",
    "title": "...",
    "status": "To Do | In Progress | In Review | Done | Blocked",
    "priority": "Urgent | High | Medium | Low",
    "type": "feature | chore | refactor | spike",
    "epicId": "epic_1",
    "sprintId": "sprint_1",
    "assignee": "usr_sarah",
    "files": ["path/to/file.js"],
    "linkedTests": ["tests/task105.spec.js"],  // NEW
    "commits": ["abc123def"],                   // NEW — auto-populated
    "source": "PRD-TKT-001",                   // NEW — traceability
    "auditTrail": []                            // NEW — inline summary
  }],
  "bugs": [{
    "id": "BUG-403",
    "severity": "P1 | P2 | P3 | P4",
    "recurrenceCount": 1,                      // NEW — duplicate suppression
    "testRunId": "run_20261106_001",            // NEW — test evidence link
    "reproduction": "..."
  }],
  "auditLog": []                               // NEW — top-level audit array
}
```

#### 5.2.4 API Contract

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tickets` | Returns full ticket list (tasks + bugs) with optional `?sprint=`, `?assignee=`, `?epic=` filters |
| `POST` | `/api/tickets` | Creates new Task or Bug. Validates all required fields. Returns created ticket. |
| `PATCH` | `/api/tickets/:id` | Partial update (status, assignee, priority). Triggers git commit + SSE broadcast. |
| `DELETE` | `/api/tickets/:id` | Soft-delete (marks `archived: true`). Never removes from pm.json. |
| `POST` | `/api/tickets/decompose` | Sends PRD text to LLM; streams back structured ticket proposals via SSE. |
| `GET` | `/api/audit` | Returns paginated audit log. Query: `?actor=AI_AGENT&from=&to=` |
| `GET` | `/api/events` | SSE stream endpoint. Client subscribes once; receives all ticket mutation events. |

---

## 6. Proposed Sprint Tasks

> **Sprint:** Sprint 2 — Ticket Management MVP
> **Sprint Goal:** Deliver a fully functional, Git-persisted Kanban board with AI decomposition and autonomous agent state transitions.
> **Duration:** 2026-11-15 → 2026-11-28

| Task ID | Title | Assignee Role | Priority | Epic | Est. Points |
|---|---|---|---|---|---|
| **TASK-201** | Design & implement `<KanbanBoard />` with drag-and-drop columns (To Do / In Progress / Done / Bugs) | Full-Stack Developer | 🔴 Urgent | epic_1 | 5 |
| **TASK-202** | Build `<TicketCard />` atomic component with priority badges, assignee avatar, linked-file count | Full-Stack Developer | 🔴 Urgent | epic_1 | 3 |
| **TASK-203** | Build `<TicketModal />` for create/edit with full client-side validation | Full-Stack Developer | 🔴 High | epic_1 | 3 |
| **TASK-204** | Implement `ticket.service.js` — CRUD on `.zenith/pm.json` with file-lock | Lead FDE | 🔴 Urgent | epic_1 | 5 |
| **TASK-205** | Implement `git.service.js` — auto-commit `.zenith/pm.json` changes as Git notes | Lead FDE | 🔴 High | epic_1 | 3 |
| **TASK-206** | Implement `sse.broker.js` — SSE event bus for real-time Kanban updates | Lead FDE | 🔴 High | epic_1 | 3 |
| **TASK-207** | Build `<TicketSidebar />` docked in Monaco with "My Tickets" filtered view | Full-Stack Developer | 🟠 High | epic_1 | 3 |
| **TASK-208** | Implement `agent.controller.js` — test-runner event listener → autonomous status transitions | AI Agent / Lead FDE | 🔴 Urgent | epic_2 | 5 |
| **TASK-209** | Implement `audit.service.js` — append-only NDJSON audit log writer | Lead FDE | 🔴 High | epic_2 | 2 |
| **TASK-210** | Implement auto BUG ticket creation from test failure payloads with duplicate suppression | AI Agent / QA Engineer | 🔴 High | epic_2 | 5 |
| **TASK-211** | Build `<PRDStudio />` — send PRD text to LLM gateway; render decomposition review panel | Lead FDE | 🟠 High | epic_1 | 5 |
| **TASK-212** | Implement `llm.router.js` — stream structured JSON ticket proposals from active LLM provider | Lead FDE | 🟠 High | epic_3 | 3 |
| **TASK-213** | Build `<BurnDownChart />` SVG chart from pm.json task completion time-series | Full-Stack Developer | 🟡 Medium | epic_1 | 3 |
| **TASK-214** | Build `<AuditLogViewer />` paginated read-only panel | Full-Stack Developer | 🟡 Medium | epic_2 | 2 |
| **TASK-215** | Write Gherkin-based E2E test suite for all US-01 → US-06 acceptance criteria | QA Engineer | 🔴 High | epic_1 | 5 |
| **TASK-216** | Add `/api/tickets/decompose` endpoint with LLM streaming and partial-accept persistence | Lead FDE | 🟠 High | epic_3 | 3 |
| **TASK-217** | Keyboard shortcut handler (`Ctrl+Shift+T`) wired to `<TicketModal />` from any IDE panel | Full-Stack Developer | 🔴 High | epic_1 | 1 |
| **TASK-218** | Extend `.zenith/pm.json` schema: `linkedTests`, `commits`, `source`, `recurrenceCount`, `auditLog` | Lead FDE | 🔴 Urgent | epic_1 | 2 |
| **TASK-219** | Implement Git commit-message parser to auto-link commits containing `[TASK-nnn]` to tickets | Lead FDE | 🟠 High | epic_1 | 3 |
| **TASK-220** | QA sign-off: full regression pass against Sprint 2 test suite; ship to v3.1 Alpha | QA Engineer | 🔴 High | epic_1 | 2 |

**Total Story Points: 66** | **Team Capacity (2 engineers + 1 AI agent × 2 weeks): ~70 pts**

---

## Appendix A — Non-Functional Requirements

| NFR | Requirement |
|---|---|
| **Performance** | Kanban board renders < 100ms for up to 500 tickets (virtualized list). SSE push latency < 1 second. |
| **Reliability** | `pm.json` write operations are atomic (file-lock + temp-file swap). Zero data loss on crash. |
| **Security** | All ticket API endpoints validate inputs at boundary. No raw user strings interpolated into Git commands. |
| **Accessibility** | All Kanban cards keyboard-navigable. ARIA labels on all interactive elements. |
| **Auditability** | 100% of agent-driven status transitions produce a verifiable audit log entry. |
| **Portability** | `.zenith/pm.json` is plain JSON — readable and editable outside ENGO.STUD by any text editor or CI script. |

## Appendix B — Out of Scope (This Initiative)

- Native mobile app for ticket viewing
- External Jira/Linear two-way sync (by design — ADR-001 mandates Git as sole source of truth)
- Real-time multiplayer cursor presence on Kanban cards
- Enterprise SSO / permission role matrix (deferred to v4.0)

## Appendix C — Success Metrics (KPIs)

| KPI | Baseline (Today) | Target (Post v3.1) |
|---|---|---|
| Time to create ticket | ~5 min (Jira) | < 15 seconds |
| Manual status updates per sprint | ~40/engineer | 0 (fully automated) |
| PRD → Sprint tasks turnaround | 2–4 hours | < 2 minutes |
| Bug-to-ticket creation lag | ~20 minutes | < 10 seconds |
| Ticket-to-commit traceability | ~30% coverage | 100% coverage |

---

*Document Version 1.0 — Generated by ENGO.STUD AI PRD Studio | 2026-11-06*
*All ticket IDs generated by this PRD are reserved in `.zenith/pm.json` namespace: TASK-201 → TASK-220*
