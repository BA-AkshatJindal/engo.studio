# ADR-001: Unified FDE Single-Pane Architecture
**Status:** Approved | **Author:** Akshat Jindal | **Date:** 2026-11-06

## Context
Traditional engineering pipelines separate issue tracking (Jira), code authoring (VS Code), testing tools, and documentation (Confluence), causing 30%+ productivity loss due to context switching.

## Decision
ENGO.STUD unifies the entire engineering lifecycle into a single canvas:
1. Monaco editor for source code.
2. Direct-linked Agile Kanban board persisted in repository (`.zenith/pm.json`).
3. Autonomous AI agents that auto-advance ticket statuses when regression tests pass.
4. Embedded real web browser with responsive device viewports.
5. Pluggable multi-LLM gateway supporting Claude 3.7, Gemini 3.8, Antigravity, and Local Ollama.

## Consequences
- Single source of truth inside the Git repository.
- Zero manual Jira updates: code commits and automated test results automatically sync tickets.
