# ENGO.STUD Engineering & Coding Standards
**Author:** Akshat Jindal | **Platform:** ENGO.STUD

## 1. General Principles
- **End-to-End Ownership:** Every Forward Deployed Engineer owns their feature from client requirement to automated test.
- **Fail-Fast & Defensive:** Always validate inputs at API boundaries.
- **Clean Architecture:** Keep domain business logic separate from transport protocols (HTTP/SSE).

## 2. Frontend Conventions (React 18 & Soft UI)
- Use functional React components with atomic custom hooks.
- Strictly dark-mode first with soft frosted glass aesthetics (`bg-ide-card/80`, `backdrop-blur-md`).
- Semantic color tokens: `sky` for actions, `purple` for AI intelligence, `emerald` for tests & success, `amber` for warnings, `rose` for errors.
- Prefer Lucide SVG icons with standard 16x16 / 14x14 bounding boxes.

## 3. Backend Conventions (Node.js & Python)
- Zero unnecessary external dependencies: keep the core runtime lightweight, zero-install, and fast.
- All streaming responses must adhere to W3C Server-Sent Events (SSE) (`text/event-stream`).
- Explicitly set `PYTHONIOENCODING: 'utf-8'` for Windows CP1252 safety.
