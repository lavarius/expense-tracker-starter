# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Architecture

This is a single-component React app (Vite + React 19). All logic lives in `src/App.jsx`:

- **State**: `transactions` array (in-memory only, no persistence), plus form inputs (`description`, `amount`, `type`, `category`) and filter state (`filterType`, `filterCategory`).
- **Known issues**: `amount` is stored as a string, so the `totalIncome`/`totalExpenses` reductions use string concatenation instead of numeric addition — the balance calculation is broken. Amounts need `parseFloat()` before arithmetic.
- **Categories**: hardcoded array — `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.
- **No routing, no backend, no persistence** — all state resets on page refresh.

Styling is in `src/App.css`; CSS classes `income-amount`, `expense-amount`, and `balance-amount` control the color-coding of amounts throughout the UI.
