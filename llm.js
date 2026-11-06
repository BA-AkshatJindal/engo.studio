#!/usr/bin/env node
// ==========================================================================
// Zenith Studio - Interactive LLM Terminal CLI
// Run interactive or single-shot LLM queries directly inside your terminal!
// Usage:
//   llm "How do I optimize this Python function?"
//   llm --model claude-opus-4-6-thinking "Refactor welcome.py"
//   llm   (Launches full interactive conversational REPL)
// ==========================================================================

const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to Antigravity CLI
const AGY_PATH = process.env.AGY_PATH || 'C:\\Users\\green zone\\AppData\\Local\\agy\\bin\\agy.exe';

const args = process.argv.slice(2);

// Check if model flag passed
let selectedModel = 'claude-sonnet-4-6';
let promptArgs = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--model' || args[i] === '-m') {
    selectedModel = args[i + 1] || selectedModel;
    i++;
  } else if (args[i] === '--help' || args[i] === '-h') {
    console.log(`
⚡ Zenith LLM Terminal CLI
===========================================================
Usage:
  llm <prompt>             Ask a question or request code
  llm -m <model> <prompt>  Select a specific model
  llm                      Launch interactive conversational chat

Available Models:
  - claude-sonnet-4-6 (Default: Claude 3.7 Sonnet)
  - claude-opus-4-6-thinking (Claude 3.7 Opus with Thinking)
  - gemini-3.8-flash-high (Gemini 3.8 Flash High)
  - gpt-oss-120b-medium (Open Source 120B)
`);
    process.exit(0);
  } else {
    promptArgs.push(args[i]);
  }
}

function runAgyQuery(prompt, model = selectedModel) {
  return new Promise((resolve) => {
    if (!fs.existsSync(AGY_PATH)) {
      console.log('\x1b[31m[Error] Antigravity CLI (agy) not found at ' + AGY_PATH + '\x1b[0m');
      return resolve();
    }

    const agyArgs = ['--model', model, '-p', prompt];
    const proc = spawn(AGY_PATH, agyArgs, {
      cwd: process.cwd(),
      env: { ...process.env, PYTHONIOENCODING: 'utf-8', TERM: 'xterm-256color' }
    });

    proc.stdout.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    proc.stderr.on('data', (data) => {
      const err = data.toString();
      if (!err.includes('ExperimentalWarning')) {
        process.stderr.write('\x1b[33m' + err + '\x1b[0m');
      }
    });

    proc.on('close', () => {
      console.log('\n');
      resolve();
    });

    proc.on('error', (err) => {
      console.error('\x1b[31m[Execution Error]: ' + err.message + '\x1b[0m');
      resolve();
    });
  });
}

async function startInteractiveRepl() {
  console.log('\x1b[36m⚡ Zenith Studio - Interactive LLM Terminal\x1b[0m');
  console.log('\x1b[90mConnected to: \x1b[32m' + selectedModel + '\x1b[90m | Workspace: ' + process.cwd() + '\x1b[0m');
  console.log('\x1b[90mType your question/instruction. Type \x1b[33mexit\x1b[90m to quit, \x1b[33mmodel <name>\x1b[90m to switch.\x1b[0m\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\x1b[35mzenith-ai>\x1b[0m '
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (!input) {
      rl.prompt();
      return;
    }

    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit' || input.toLowerCase() === 'q') {
      console.log('\x1b[36mGoodbye! Exiting Zenith LLM session.\x1b[0m');
      process.exit(0);
    }

    if (input.toLowerCase().startsWith('model ')) {
      const newModel = input.slice(6).trim();
      if (newModel) {
        selectedModel = newModel;
        console.log('\x1b[32mSwitched model to: ' + selectedModel + '\x1b[0m\n');
      }
      rl.prompt();
      return;
    }

    if (input.toLowerCase() === 'clear' || input.toLowerCase() === 'cls') {
      console.clear();
      rl.prompt();
      return;
    }

    console.log('\x1b[90m[Thinking with ' + selectedModel + '...]\x1b[0m\n');
    await runAgyQuery(input, selectedModel);
    rl.prompt();
  });
}

// Main entry
if (promptArgs.length > 0) {
  const fullPrompt = promptArgs.join(' ');
  runAgyQuery(fullPrompt, selectedModel).then(() => process.exit(0));
} else {
  startInteractiveRepl();
}
