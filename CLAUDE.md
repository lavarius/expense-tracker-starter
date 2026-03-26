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

React + Vite app (React 19). Components in `src/`:

- **`App.jsx`** — Root component. Owns the `transactions` array (in-memory, no persistence) and passes it down. Delegates all UI sections to child components.
- **`Summary.jsx`** — Computes `totalIncome`, `totalExpenses`, and `balance` from the `transactions` prop.
- **`TransactionForm.jsx`** — Owns form state (`description`, `amount`, `type`, `category`). Calls `onAddTransaction` callback to add to the parent's list. Amounts are parsed to numbers via `parseFloat()`.
- **`TransactionList.jsx`** — Owns filter state (`filterType`, `filterCategory`). Renders filtered transaction table.

**Categories** are hardcoded in both `TransactionForm` and `TransactionList`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**No routing, no backend, no persistence** — all state resets on page refresh.

Styling is in `src/App.css`; CSS classes `income-amount`, `expense-amount`, and `balance-amount` control the color-coding of amounts throughout the UI.
