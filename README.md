# Redux Fundamentals Learning Project 🚀

## Welcome to the Redux Counter Project!

This project is designed to teach you **Redux basics** through a simple but powerful counter application. Whether you're new to Redux or looking to solidify your understanding, this project breaks down the core concepts in an easy-to-understand way.

### 📚 Learning Path Guide

This repository contains **TWO learning projects**:

1. **Phase 1: Redux Counter Project** (This Section) ✅ START HERE
   - Learn Redux fundamentals: Store, Actions, Reducers, Dispatch, Selectors
   - Perfect for beginners
   - Takes ~2-4 hours to understand
   - **You are currently here**

2. **Phase 2: LiveWallpaperStudio Project** (Advanced Section) 🚀 AFTER YOU COMPLETE PHASE 1
   - Apply fundamentals to a real-world application
   - Learn advanced patterns: Multiple slices, complex state, async operations
   - **IMPORTANT: Only start this after mastering the counter project**

> **⚠️ Important**: Do NOT skip to LiveWallpaperStudio without completing this counter project first. The advanced project builds directly on these fundamentals.

---

## Table of Contents - Phase 1: Counter Project

1. [What is Redux?](#what-is-redux)
2. [Why Redux?](#why-redux)
3. [Redux Core Concepts](#redux-core-concepts)
4. [Project Structure](#project-structure)
5. [How This Project Works](#how-this-project-works)
6. [Understanding Each Part](#understanding-each-part)
7. [Getting Started](#getting-started)
8. [Key Takeaways](#key-takeaways)
9. [Next: LiveWallpaperStudio Project](#-livewallpapersstudio---advanced-redux-application)

---

## What is Redux?

**Redux** is a predictable state management library for JavaScript applications. Think of it as a single source of truth for your application's data. Instead of having state scattered across different components, Redux centralizes all state in one place called the **Store**.

### Simple Analogy:
Imagine a library where:
- 📚 The **Store** is the central library that holds all books (state)
- 📝 **Actions** are requests to check in/out books
- ⚙️ **Reducers** are the librarians who process requests and update records
- 👀 **Selectors** are ways to ask the librarian for specific book information

---

## Why Redux?

Without Redux, you might face these problems in React apps:

- **Prop Drilling**: Passing state through many component levels
- **State Duplication**: Same data stored in multiple components
- **Unpredictable Updates**: State changes from multiple places
- **Debugging Difficulty**: Hard to track where state changes originate

**Redux solves these by:**
- ✅ Centralizing state
- ✅ Making state changes predictable and traceable
- ✅ Providing time-travel debugging
- ✅ Making testing easier

---

## Redux Core Concepts

### 1. **Store** 📦
The **Store** is a single JavaScript object that holds the entire application state. It's like the brain of your app.

```javascript
// In this project, the store contains:
{
  counter: {
    value: 0
  }
}
```

### 2. **State** 💾
**State** is the data inside the store. It should never be modified directly; it's read-only and can only be changed by actions and reducers.

```javascript
// Our counter state
initialState: {
  value: 0
}
```

### 3. **Actions** 🎬
**Actions** are plain JavaScript objects that describe what happened. They have a `type` property and optionally a `payload` (data to pass).

```javascript
// Example actions in this project:
{ type: 'counter/increment' }           // Increment the counter
{ type: 'counter/decrement' }           // Decrement the counter
{ type: 'counter/IncreasedByNumber', payload: 5 }  // Increase by specific number
```

### 4. **Reducers** ⚙️
**Reducers** are pure functions that take the current state and an action, then return a new state. They're called "reducers" because they're similar to the reduce function in JavaScript arrays.

**Rules for Reducers:**
- ✅ Must be pure functions (same input = same output)
- ✅ Cannot modify state directly
- ✅ Cannot perform side effects (API calls, etc.)
- ✅ Must return a new state object

```javascript
// Our reducer in counter.js:
increment(state) {
  state.value += 1;  // Redux Toolkit uses Immer, so this looks like mutation
}
```

### 5. **Dispatch** 📤
**Dispatch** is how you trigger actions. You call `dispatch()` with an action, and Redux passes it to the reducer.

```javascript
// In React component:
dispatch(increment())  // Dispatch the increment action
```

### 6. **Selectors** 👀
**Selectors** are functions that extract specific pieces of state from the store. In React, we use `useSelector` hook.

```javascript
// In React component:
const count = useSelector((state) => state.counter.value);
```

### 7. **Redux Toolkit** 🛠️
This project uses **Redux Toolkit** (the modern Redux), which simplifies Redux by:
- Automatically creating actions from reducers
- Using Immer for immutable updates (looks like mutation but isn't)
- Providing `createSlice` to combine actions, reducers, and initial state

---

## Project Structure

```
Redux/
├── src/
│   ├── App/
│   │   ├── App.jsx          # Main component - UI and interactions
│   │   └── App.css          # Styling
│   ├── ReduxStore/
│   │   ├── store.js         # Redux store configuration
│   │   └── features/
│   │       └── counter.js   # Counter slice (actions + reducer)
│   ├── main.jsx             # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## How This Project Works

### 🔄 Flow Diagram:

```
1. User clicks button
   ↓
2. Component calls dispatch(action)
   ↓
3. Redux Toolkit creates the action object
   ↓
4. Reducer receives state + action
   ↓
5. Reducer returns new state
   ↓
6. Store updates
   ↓
7. React components re-render with new state
   ↓
8. UI reflects the change
```

### 🎯 Example Flow - Increment Button:

```
User clicks "Increment" button
     ↓
dispatch(increment()) is called
     ↓
Redux creates action: { type: 'counter/increment' }
     ↓
Reducer receives: state = { value: 5 }, action = { type: 'counter/increment' }
     ↓
Reducer executes: state.value += 1
     ↓
New state is: { value: 6 }
     ↓
useSelector hook detects state change
     ↓
Component re-renders with count = 6
     ↓
UI displays: 6
```

---

## Understanding Each Part

### Part 1: The Store (`src/ReduxStore/store.js`)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter";

const store = configureStore({
  reducer: {
    counter: counter  // Register the counter reducer
  }
})

export default store;
```

**What's happening:**
- `configureStore` creates the Redux store
- `reducer` object maps feature names to their reducers
- We're saying: "The `counter` part of state is managed by the counter reducer"

---

### Part 2: The Slice (`src/ReduxStore/features/counter.js`)

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'counter',                    // Feature name
  
  initialState: {
    value: 0                          // Starting state
  },
  
  reducers: {
    increment(state) {                // Action: increment
      state.value += 1;
    },
    decrement(state) {                // Action: decrement
      state.value -= 1;
    },
    IncreasedByNumber(state, action) { // Action: increase by custom amount
      state.value += action.payload;   // payload contains the number
    }
  }
})

// Export actions to use in components
export const { increment, decrement, IncreasedByNumber } = counterSlice.actions;

// Export reducer to use in store
export default counterSlice.reducer;
```

**What's happening:**
- **name**: Prefix for generated action types
- **initialState**: Starting value (0)
- **reducers**: Object where each method is an action
- **state.value += 1**: Redux Toolkit (Immer) handles immutability behind the scenes
- Actions and reducers are automatically generated

**Generated Actions:**
- `increment()` → action type: `'counter/increment'`
- `decrement()` → action type: `'counter/decrement'`
- `IncreasedByNumber(5)` → action type: `'counter/IncreasedByNumber'`, payload: 5

---

### Part 3: The Component (`src/App/App.jsx`)

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, IncreasedByNumber } from '../ReduxStore/features/counter';
import { useState } from 'react';

function App() {
  // Hook 1: Get dispatch function
  const dispatch = useDispatch();
  
  // Hook 2: Get counter value from store
  const count = useSelector((state) => state.counter.value);
  
  // Local state for input
  const [num, setNum] = useState(0);

  return (
    <main className='main'>
      <div className='box'>
        {/* Display current count from Redux store */}
        <h1>{count}</h1>
        
        <div>
          {/* Dispatch increment action */}
          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
          
          {/* Dispatch decrement action */}
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
        
        <div>
          {/* Local state input - not in Redux */}
          <input 
            type="number" 
            value={num} 
            onChange={(e) => setNum(e.target.value)} 
          />
        </div>
        
        {/* Dispatch action with payload (custom number) */}
        <button onClick={() => dispatch(IncreasedByNumber(Number(num)))}>
          Increase By Number
        </button>
      </div>
    </main>
  );
}

export default App;
```

**Key Hooks:**
- **useDispatch()**: Returns the dispatch function to send actions to Redux
- **useSelector()**: Extracts and subscribes to specific state from the store

**Component Flow:**
1. Button is clicked
2. Dispatch function is called with action
3. Reducer processes action and updates store
4. useSelector detects state change
5. Component re-renders with new value
6. UI displays updated count

---

### Part 4: Main Entry Point (`src/main.jsx`)

```javascript
import { Provider } from 'react-redux'
import App from '../src/App/App'
import store from './ReduxStore/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provider makes store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

**What's happening:**
- `<Provider store={store}>` wraps your app
- This makes the Redux store accessible to all components via hooks
- Think of it as providing the store through context

---

## Getting Started

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will start on `http://localhost:5173`

### How to Use

1. **Increment Button**: Increases count by 1
2. **Decrement Button**: Decreases count by 1
3. **Number Input**: Enter any number
4. **Increase By Number Button**: Increases count by the entered number

---

## Redux Data Flow Summary

```
                    ┌─────────────────┐
                    │   User Action   │
                    │  (click button) │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    dispatch()   │
                    │   (increment)   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Redux Reducer  │
                    │  (processes     │
                    │   action)       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Store Updates  │
                    │  (new state)    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  useSelector    │
                    │  (detects       │
                    │   change)       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Component      │
                    │  Re-renders     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  UI Updates     │
                    │  (new display)  │
                    └─────────────────┘
```

---

## Key Takeaways

### ✅ What You've Learned:

1. **Store**: Single source of truth for state
2. **Actions**: Describe what happened
3. **Reducers**: Pure functions that update state
4. **Dispatch**: How you trigger actions
5. **Selectors**: How you read state from components
6. **Redux Toolkit**: Simplifies Redux development
7. **React-Redux**: Hooks (useDispatch, useSelector) connect Redux to React

### ✅ Redux Principles:

1. **Single Source of Truth**: One store for all state
2. **State is Read-Only**: Only changed through reducers
3. **Changes are Made with Pure Functions**: Reducers are predictable

### ✅ When to Use Redux:

- ✅ Complex state management
- ✅ State shared across many components
- ✅ Need for debugging/time-travel
- ✅ Large applications

### ❌ When NOT to Use Redux:

- ❌ Simple local component state
- ❌ Prop drilling isn't a problem
- ❌ Small applications

---

## Next Steps - Ready to Level Up? 🚀

**Before** you move forward, make sure you can answer all the questions below. If you can't, review the relevant sections:

### Self-Check Checklist ✅

- [ ] I understand what Redux Store, Actions, and Reducers are
- [ ] I can explain why reducers must be pure functions
- [ ] I know the difference between `dispatch()` and `useSelector()`
- [ ] I can create a new action and reducer from scratch
- [ ] I understand how the counter project works end-to-end

### What To Do Next:

1. **✅ Experiment with this project first**:
   - Add a `reset` action that sets counter to 0
   - Add a `multiply` action that multiplies by a number
   - Try styling with CSS-in-JS or Tailwind

2. **✅ Test your understanding**:
   - Can you add a new feature to the store?
   - Can you create multiple dispatches in one button click?

3. **✅ Ready for Advanced Topics?**:
   - Once comfortable with this project, move to **Phase 2: LiveWallpaperStudio** (see below)
   - LiveWallpaperStudio builds directly on everything you've learned here

---

## Resources for Phase 1

- [Redux Official Docs](https://redux.js.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)

---

## Questions to Ask Yourself

Before moving to LiveWallpaperStudio, ask yourself:

1. Where is the state stored?
2. How does clicking a button change the state?
3. Why do we use reducers instead of changing state directly?
4. What happens when we dispatch an action?
5. How does the component know when state changes?
6. What's the difference between the `increment` action and the `increment` reducer?

---

## Good Luck! 🚀

This counter project is your foundation for Redux mastery. Once you understand this completely, you'll be ready for **LiveWallpaperStudio**!

---

## 🎨 PHASE 2: LiveWallpaperStudio - Advanced Redux Application

### ⚠️ IMPORTANT: Prerequisites

**DO NOT START THIS SECTION UNLESS YOU HAVE:**
- ✅ Completed and understood the Counter Project above
- ✅ Can explain all Redux core concepts confidently
- ✅ Have hands-on experience dispatching actions and using selectors
- ✅ Understand how React components connect to Redux

If you skipped the counter project, **go back and complete it first**. This advanced project assumes you understand everything above.

---

## Introduction

Congratulations on completing the Redux fundamentals through the counter project! Now that you have a solid understanding of Redux core concepts, actions, reducers, and state management, it's time to apply this knowledge to a more sophisticated, real-world application: **LiveWallpaperStudio**.

### What is LiveWallpaperStudio?

**LiveWallpaperStudio** is a professional-grade web application that allows users to create, customize, manage, and preview dynamic wallpapers with real-time visual feedback. This project serves as an ideal platform to deepen your Redux expertise by introducing more complex state management scenarios, including:

# LiveWallpaperStudio - Complete Implementation Guide 🎨

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Design](#architecture--design)
3. [Required Packages & Dependencies](#required-packages--dependencies)
4. [Project Setup](#project-setup)
5. [Step-by-Step Implementation](#step-by-step-implementation)
6. [File Structure](#file-structure)
7. [API Integration](#api-integration)
8. [Redux State Management](#redux-state-management)
9. [Lazy Loading Implementation](#lazy-loading-implementation)
10. [Performance Optimization](#performance-optimization)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**LiveWallpaperStudio** is a modern web application that allows users to search, discover, and save media content (photos, videos, and GIFs) from multiple APIs. Built with React and Redux Toolkit, it demonstrates advanced state management patterns and real-world API integration.

### Key Features:
- ✅ Multi-tab search (Photos, Videos, GIFs)
- ✅ Multiple API integration (Unsplash, Pexels, Giphy)
- ✅ Save to collection with persistent storage
- ✅ Lazy loading for images and route-based code splitting
- ✅ Default search query ("nature") on app load
- ✅ Responsive design with Tailwind CSS
- ✅ Toast notifications for user feedback
- ✅ Real-time search with Redux state management

---

## Architecture & Design

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      App.jsx                             │
│         (Lazy Loading + Route Configuration)             │
└──────────────────┬──────────────────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
┌───▼──────────┐          ┌──────▼────────┐
│   HOME.jsx   │          │ Collection.jsx │
│  (Lazy Page) │          │   (Lazy Page)  │
└───┬──────────┘          └────────────────┘
    │
┌───▼────────────────────────────────────┐
│    SearchBar + Tabs + ResultGrid        │
│  (Components Rendering Search Results) │
└───┬────────────────────────────────────┘
    │
    ├─→ Redux Store (SearchSlice)
    │   - query: 'nature' (default)
    │   - activeTab: 'photos'
    │   - result: []
    │   - loading: false
    │   - error: null
    │
    ├─→ ResultCard (with Lazy Loading)
    │   - Intersection Observer for images
    │   - Progressive image loading
    │
    └─→ API Layer
        - fetchImages (Unsplash)
        - fetchVideos (Pexels)
        - fetchGif (Giphy)
```

### Data Flow

```
User searches "nature" → SearchBar dispatches setquery("nature")
                    ↓
Redux state updates with new query
                    ↓
ResultGrid useEffect triggered by query change
                    ↓
API requests data based on activeTab
                    ↓
Response mapped to standard format
                    ↓
Redux setresult() updates results
                    ↓
ResultGrid re-renders with new data
                    ↓
ResultCard components render with lazy loading
                    ↓
User sees results (images/videos load as they scroll into view)
```

---

## Required Packages & Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.11.2",           // Redux state management
    "@tailwindcss/vite": "^4.2.2",           // Tailwind CSS integration
    "axios": "^1.15.2",                      // HTTP client for API calls
    "react": "^19.2.4",                      // React library
    "react-dom": "^19.2.4",                  // React DOM rendering
    "react-redux": "^9.2.0",                 // React Redux hooks
    "react-router-dom": "^7.14.2",           // Routing and code splitting
    "react-toastify": "^11.1.0"              // Toast notifications
  }
}
```

### Why Each Package?

| Package | Purpose | Used For |
|---------|---------|----------|
| `@reduxjs/toolkit` | State management simplified | Managing search query, results, loading states |
| `axios` | HTTP client | Making API requests to Unsplash, Pexels, Giphy |
| `react-router-dom` | Routing & code splitting | Page navigation and lazy loading |
| `react-redux` | React-Redux integration | useSelector, useDispatch hooks |
| `react-toastify` | Toast notifications | Showing "Added to collection" messages |
| `tailwindcss` | Utility-first CSS | Styling components responsively |

### Dev Dependencies

```json
{
  "devDependencies": {
    "vite": "^8.0.4",                        // Fast build tool
    "@vitejs/plugin-react": "^6.0.1",        // React plugin for Vite
    "tailwindcss": "^4.2.2",                 // Tailwind CSS
    "autoprefixer": "^10.5.0",               // Vendor prefixes
    "postcss": "^8.5.10",                    // CSS processing
    "eslint": "^9.39.4",                     // Code quality
    "eslint-plugin-react-hooks": "^7.0.1"   // React hooks linting
  }
}
```

---

## Project Setup

### Step 1: Initialize Project

```bash
# Create Vite project
npm create vite@latest LiveWallpaperStudio -- --template react

cd LiveWallpaperStudio
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Required Packages

```bash
npm install @reduxjs/toolkit react-redux axios react-router-dom react-toastify
```

### Step 4: Install Dev Dependencies

```bash
npm install -D tailwindcss autoprefixer postcss
npx tailwindcss init -p
```

### Step 5: Environment Setup

Create `.env` file in the root directory:

```env
VITE_UNSPLASH_KEY=your_unsplash_api_key_here
VITE_PEXELS_KEY=your_pexels_api_key_here
VITE_GIPHY_KEY=your_giphy_api_key_here
```

#### How to Get API Keys:

**Unsplash API:**
1. Go to https://unsplash.com/developers
2. Create application
3. Copy Access Key

**Pexels API:**
1. Go to https://www.pexels.com/api/
2. Create API key
3. Copy the key

**Giphy API:**
1. Go to https://developers.giphy.com/
2. Create an application
3. Get API key

### Step 6: Configure Tailwind

Edit `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 7: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Step-by-Step Implementation

### Phase 1: Project Folder Structure

Create this folder structure:

```
src/
├── Api/
│   └── MediaApi.js           # API calls
├── Components/
│   ├── SearchBar.jsx         # Search input
│   ├── Tabs.jsx              # Tab switcher
│   ├── ResultGrid.jsx        # Results container
│   ├── ResultCard.jsx        # Individual result card
│   ├── CollectionCard.jsx    # Collection item
│   └── Navbar.jsx            # Navigation
├── Pages/
│   ├── HOME.jsx              # Search page
│   └── Collection.jsx        # Collection page
├── Redux/
│   ├── store.js              # Store configuration
│   └── features/
│       ├── SearchSlice.js    # Search state
│       └── CollectionSlice.js # Collection state
├── App.jsx                   # Main app
├── index.css                 # Tailwind styles
└── main.jsx                  # Entry point
```

### Phase 2: Create Redux Store

**`src/Redux/store.js`:**

```javascript
import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './features/SearchSlice'
import collectionSlice from './features/CollectionSlice'

const store = configureStore({
  reducer: {
    search: searchSlice,
    collection: collectionSlice
  }
})

export default store
```

### Phase 3: Create Redux Slices

**`src/Redux/features/SearchSlice.js`:**

```javascript
import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: 'nature',        // Default search query
    activeTab: 'photos',    // photos, videos, GIF
    result: [],             // Search results
    loading: false,         // Loading state
    error: null             // Error message
  },
  reducers: {
    setquery(state, action) {
      state.query = action.payload
    },
    setactiveTab(state, action) {
      state.activeTab = action.payload
    },
    setresult(state, action) {
      state.result = action.payload
      state.loading = false
    },
    setloading(state) {
      state.loading = true
      state.error = null
    },
    seterror(state, action) {
      state.error = action.payload
      state.loading = false
    },
    clearResults(state) {
      state.result = []
    }
  }
})

export const { setquery, setactiveTab, setloading, setresult, clearResults, seterror } = searchSlice.actions
export default searchSlice.reducer
```

**`src/Redux/features/CollectionSlice.js`:**

```javascript
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    items: localStorage.getItem('collection') 
      ? JSON.parse(localStorage.getItem('collection')) 
      : []
  },
  reducers: {
    addCollection(state, action) {
      state.items.push(action.payload)
      localStorage.setItem('collection', JSON.stringify(state.items))
    },
    removeCollection(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('collection', JSON.stringify(state.items))
    },
    clearCollection(state) {
      state.items = []
      localStorage.removeItem('collection')
    },
    addedToast() {
      toast.success('Added to collection!', {
        position: 'bottom-right',
        autoClose: 2000
      })
    }
  }
})

export const { addCollection, removeCollection, clearCollection, addedToast } = collectionSlice.actions
export default collectionSlice.reducer
```

### Phase 4: Create API Layer

**`src/Api/MediaApi.js`:**

```javascript
import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY

export async function fetchImages(query, page = 1, per_page = 20) {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  })
  return res.data
}

export async function fetchVideos(query, per_page = 20) {
  const res = await axios.get('https://api.pexels.com/videos/search', {
    params: { query, per_page },
    headers: { Authorization: PEXELS_KEY }
  })
  return res.data
}

export async function fetchGif(query) {
  const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit: 10
    }
  })
  return res.data
}
```

### Phase 5: Create Components

**`src/Components/SearchBar.jsx`:**

```javascript
import { useState, useEffect } from 'react'
import { setquery } from '../Redux/features/SearchSlice'
import { useDispatch, useSelector } from 'react-redux'

const SearchBar = () => {
  const defaultQuery = useSelector((state) => state.search.query)
  const [text, setText] = useState(defaultQuery)
  const dispatch = useDispatch()

  useEffect(() => {
    setText(defaultQuery)
  }, [])

  function submitHandler(e) {
    e.preventDefault()
    dispatch(setquery(text))
  }

  return (
    <form onSubmit={submitHandler} className='flex bg-(--c1) gap-5 py-10 px-10'>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className='w-full border-2 px-6 py-3 text-xl rounded outline-none text-black'
        type="text"
        placeholder='Search anything...'
      />
      <button className='active:scale-95 cursor-pointer border-2 px-6 py-3 text-xl rounded outline-none bg-blue-600 hover:bg-blue-700 transition'>
        Search
      </button>
    </form>
  )
}

export default SearchBar
```

### Phase 6: Lazy Loading Implementation

**In `src/App.jsx`:**

```javascript
import './index.css'
import { Route, Routes, Suspense } from 'react-router-dom'
import { lazy } from 'react'
import Navbar from './Components/Navbar.jsx'
import { ToastContainer } from 'react-toastify'

// Lazy load page components for code splitting
const HOME = lazy(() => import('./Pages/HOME.jsx'))
const Collection = lazy(() => import('./Pages/Collection.jsx'))

// Loading fallback component
const LoadingFallback = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='text-center'>
      <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
      <p className='text-xl text-gray-400'>Loading page...</p>
    </div>
  </div>
)

function App() {
  return (
    <div className='min-h-screen text-white w-full bg-gray-950'>
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path='/' element={<HOME />} />
          <Route path='/collection' element={<Collection />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </div>
  )
}

export default App
```

### Phase 7: Image Lazy Loading with Intersection Observer

**`src/Components/ResultCard.jsx`:**

```javascript
import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../Redux/features/CollectionSlice'
import { useRef, useEffect, useState } from 'react'

const ResultCard = ({ item }) => {
  const dispatch = useDispatch()
  const imageRef = useRef(null)
  const videoRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const targetElement = imageRef.current || videoRef.current
    if (targetElement) {
      observer.observe(targetElement)
    }

    return () => {
      if (targetElement) observer.unobserve(targetElement)
    }
  }, [])

  const addToCollection = (item) => {
    dispatch(addCollection(item))
    dispatch(addedToast())
  }

  return (
    <div className='w-[18vw] relative h-80 bg-white rounded-xl overflow-hidden'>
      <a target='_blank' className='h-full' href={item.url}>
        {item.type === 'photo' && (
          <img
            ref={imageRef}
            className='h-full w-full object-cover object-center'
            src={isLoaded ? item.src : item.thumbnail}
            alt={item.title}
            loading='lazy'
          />
        )}
        {item.type === 'video' && (
          <video
            ref={videoRef}
            className='h-full w-full object-cover object-center'
            autoPlay
            loop
            muted
            src={isLoaded ? item.src : undefined}
            poster={item.thumbnail}
          />
        )}
        {item.type === 'gif' && (
          <img
            ref={imageRef}
            className='h-full w-full object-cover object-center'
            src={isLoaded ? item.src : item.thumbnail}
            alt={item.title}
            loading='lazy'
          />
        )}
      </a>
      <button
        onClick={() => addToCollection(item)}
        className='absolute bottom-6 right-4 bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium'
      >
        Save
      </button>
    </div>
  )
}

export default ResultCard
```

---

## File Structure

```
LiveWallpaperStudio/
├── src/
│   ├── Api/
│   │   └── MediaApi.js                 # API integration
│   ├── Components/
│   │   ├── SearchBar.jsx               # Search input component
│   │   ├── Tabs.jsx                    # Tab switcher
│   │   ├── ResultGrid.jsx              # Results grid container
│   │   ├── ResultCard.jsx              # Individual result card
│   │   ├── CollectionCard.jsx          # Collection item display
│   │   └── Navbar.jsx                  # Navigation bar
│   ├── Pages/
│   │   ├── HOME.jsx                    # Search/home page
│   │   └── Collection.jsx              # Collection page
│   ├── Redux/
│   │   ├── store.js                    # Redux store setup
│   │   └── features/
│   │       ├── SearchSlice.js          # Search state management
│   │       └── CollectionSlice.js      # Collection state management
│   ├── App.jsx                         # Main App component (with lazy loading)
│   ├── index.css                       # Tailwind CSS & global styles
│   └── main.jsx                        # React entry point
├── index.html                          # HTML template
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS config
├── postcss.config.js                   # PostCSS config
├── .env                                # Environment variables
└── README.md                           # Project documentation
```

---

## API Integration

### How APIs Are Used:

```javascript
// Unsplash - High-quality photos
fetchImages("nature") 
→ Returns: [{ id, alt_description, urls, links }]

// Pexels - HD videos
fetchVideos("nature") 
→ Returns: [{ id, user, image, video_files, url }]

// Giphy - Animated GIFs
fetchGif("nature") 
→ Returns: [{ id, title, images, url }]
```

### Standardized Response Format:

All responses are mapped to a standard format:

```javascript
{
  id: string,              // Unique identifier
  type: 'photo' | 'video' | 'gif',
  title: string,           // Display title
  thumbnail: string,       // Thumbnail URL (for lazy loading)
  src: string,             // Full-size media URL
  url: string              // Original source URL
}
```

---

## Redux State Management

### State Structure:

```javascript
{
  search: {
    query: 'nature',              // Current search query
    activeTab: 'photos',          // Current tab
    result: [],                   // API results
    loading: false,               // Loading state
    error: null                   // Error message
  },
  collection: {
    items: []                     // Saved items
  }
}
```

### Key Actions:

```javascript
// Search Slice Actions
setquery(text)              // Update search query
setactiveTab(tab)           // Switch between tabs
setloading()                // Start loading
setresult(data)             // Set results
seterror(message)           // Set error
clearResults()              // Clear results

// Collection Slice Actions
addCollection(item)         // Add item to collection
removeCollection(id)        // Remove from collection
clearCollection()           // Clear all items
addedToast()               // Show toast notification
```

---

## Lazy Loading Implementation

### 1. Route-Based Code Splitting

```javascript
// Lazy load entire pages
const HOME = lazy(() => import('./Pages/HOME.jsx'))
const Collection = lazy(() => import('./Pages/Collection.jsx'))

// Wrap with Suspense
<Suspense fallback={<LoadingFallback />}>
  <Routes>
    <Route path='/' element={<HOME />} />
    <Route path='/collection' element={<Collection />} />
  </Routes>
</Suspense>
```

**Benefits:**
- ✅ Smaller initial bundle size
- ✅ Pages load only when needed
- ✅ Better perceived performance

### 2. Image Lazy Loading with Intersection Observer

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)        // Load full-size image
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }             // Load when 10% visible
  )

  observer.observe(imageRef.current)
}, [])

// Show thumbnail while loading, then full image
<img 
  src={isLoaded ? item.src : item.thumbnail} 
  loading='lazy'
/>
```

**Benefits:**
- ✅ Only load images as user scrolls
- ✅ Reduce memory usage
- ✅ Faster initial page load
- ✅ Better for slow connections

### 3. Default Query Loading

```javascript
// SearchSlice initialState
initialState: {
  query: 'nature',  // Loads results automatically
}

// HOME.jsx shows results immediately
{query && query.trim() !== "" && (
  <div>
    <Tabs />
    <ResultGrid />  // Fetches data on component mount
  </div>
)}
```

---

## Performance Optimization

### Optimized ResultGrid Loading States:

```javascript
if (error) return (
  <div className='flex items-center justify-center min-h-64 px-10'>
    <div className='text-center'>
      <p className='text-2xl text-red-500 font-semibold'>Error Loading Content</p>
      <p className='text-gray-400'>{error}</p>
    </div>
  </div>
)

if (loading) return (
  <div className='flex items-center justify-center min-h-64 px-10'>
    <div className='text-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      <p className='text-xl text-gray-400'>Loading {activeTab}...</p>
    </div>
  </div>
)
```

### Performance Tips:

1. **Bundle Size Reduction:**
   - Use `React.lazy()` for route-based splitting
   - Dynamic imports reduce initial bundle

2. **Image Performance:**
   - Lazy load with Intersection Observer
   - Show thumbnail first, load full image on scroll

3. **State Management:**
   - Redux prevents prop drilling
   - useSelector triggers re-renders only on state changes

4. **Rendering Optimization:**
   - Use `useMemo` for expensive calculations
   - Memoize components with `React.memo` if needed

---

## Common Issues & Troubleshooting

### Issue 1: API Keys Not Working

**Problem:** 401 Unauthorized errors
**Solution:**
```bash
# Verify .env file exists with correct keys
cat .env

# Check keys are correctly formatted
VITE_UNSPLASH_KEY=your_actual_key_here
```

### Issue 2: Images Not Loading

**Problem:** Broken image links
**Solution:**
```javascript
// Check thumbnail vs src URLs
console.log('Thumbnail:', item.thumbnail)
console.log('Full:', item.src)

// Verify API response mapping
```

### Issue 3: Collection Not Persisting

**Problem:** Collection clears on page reload
**Solution:**
```javascript
// CollectionSlice initializes from localStorage
initialState: {
  items: localStorage.getItem('collection')
    ? JSON.parse(localStorage.getItem('collection'))
    : []
}

// Always update localStorage when adding/removing
localStorage.setItem('collection', JSON.stringify(state.items))
```

### Issue 4: Lazy Loading Not Working

**Problem:** Pages load synchronously
**Solution:**
```javascript
// Ensure you're using React.lazy with Suspense
const HOME = lazy(() => import('./Pages/HOME.jsx'))

// Always wrap with Suspense
<Suspense fallback={<LoadingFallback />}>
  <Routes>{/* routes */}</Routes>
</Suspense>
```

### Issue 5: Tailwind Styles Not Applied

**Problem:** Styles not appearing
**Solution:**
```bash
# Restart dev server
npm run dev

# Verify tailwind.config.js includes all content paths
content: ["./index.html", "./src/**/*.{js,jsx}"]
```

---

## Tips for Further Enhancement

### 1. Add Infinite Scroll
```javascript
// Implement pagination in API calls
fetchImages(query, page, per_page)

// Detect bottom of page and load more results
const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // Load more
  }
}
```

### 2. Add Search History
```javascript
// Store recent searches in Redux
const [searchHistory, setSearchHistory] = useState([])
localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
```

### 3. Add Favorites/Bookmarks
```javascript
// Similar to collection, but with favorites state
```

### 4. Add Filtering Options
```javascript
// Add filters for date, orientation, size, etc.
```

### 5. Add Dark/Light Theme
```javascript
// Toggle theme with Context API or Redux
```

---

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## Summary

You now have a fully functional LiveWallpaperStudio application with:
- ✅ Redux state management for search and collections
- ✅ Multi-API integration (Unsplash, Pexels, Giphy)
- ✅ Route-based code splitting with lazy loading
- ✅ Image lazy loading with Intersection Observer
- ✅ Default "nature" search query
- ✅ Toast notifications and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Persistent collection storage

This project serves as an excellent foundation for understanding advanced Redux patterns and real-world application development!

---

**Happy Coding! 🚀**
