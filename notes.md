# Notes

## Setup

```sh
npm install
npm run dev # runs api and app concurrently
```

## Overview

The stackblitz I forked wouldn't let me use the termnial so I create a new vite react project and copied the instructions and other relevent bits over.

While this is built in a single app, I wrote the front-end and back-end code as if they were completely separate, hopefully getting at what the heart of what the challenge is about.

### Backend

I wrote a simple express-based api that runs alongside the front end app. This backend reads and writes from Prisma. I felt comfortable using an ORM as I believe one is used internally to Tava.

### Front-End

- Tailwind: Quickest way to build the UI.
- Tanstack Query: React data fetching library with built in local caching.
- Tanstack Table: Lightweight table library with a lot of flexibility.
- React Hook Form: Form library with easy validation.

One gotcha is that my current employee list view name filter is only talks to the list of all employees. I did setup the api and the query to be able to filter but didn't implement it on the front end for the sake of time and data caches means that I can filter without refetching.

### Checklist

- [x] List View
  - [x] The employees are in a flat array from the API, but they need to be grouped by department in the list view.
  - [x] The yellow background color in the list mockup represents the hover state for each row.
  - [x] No detail view is required; route directly to an edit view.
- [x] Edit View
  - [x] Implement an editable form for employee details based on the data structure.
- [x] Navigation
  - [x] Finish styling the navigation bar and add a routeable item for **Employees**.
- [x] Filtering
  - [x] Add a text input filter to search employees by name or other key fields.
  - [x] Employees should remain grouped by department as the list filters.
  - [ ] If all employees in a department are filtered out, that department should be removed from the list view.
    > I went a slightly different ux direction here.
- [x] Styling
  - [x] Use the `src/styles.css` file to write raw CSS, brought in tailwind and a component library.
- [x] Type Definitions
  - [x] Use the `src/types.ts` file to define types for your API.
  - [x] You’ll need an interface for the **Employee** and types for each CRUD action implemented in the API.

## Bonus

- [x] Additional API Functionality - Implement `create` and `delete` methods.

- [ ] Enriched Data - Expand the data file with additional details for each employee to create a more comprehensive and engaging UI experience.

- [x] Unit and Integration Tests - Add tests to cover key components and API methods.

- [ ] Sorting - Allow sorting of employees by name or department.

- [x] Responsiveness - Make the UI responsive for mobile and tablet views.

- [x] Data Persistence - Store data persistently (e.g., local storage or in-memory database).

- [x] Error Handling and User Feedback - Implement user-friendly error messages and loading states.

- [x] Advanced Filtering - Allow filtering by multiple fields like department or status.

- [x] Dark Mode - Add a toggle for dark mode to showcase design flexibility.

## Packages and their purposes

| Package Name             | Purpose                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| @epic-web/remember       | Simple, type-safe, "singleton" implementation.                                                 |
| @prisma/client           | The Prisma Client is an auto-generated and type-safe query builder for Node.js and TypeScript. |
| @radix-ui/\*             | Component library optimized for fast development, easy maintenance, and accessibility.         |
| @tanstack/react-query    | A powerful data-fetching library for React that simplifies server state management.            |
| @tanstack/react-table    | A lightweight and flexible table library for building data tables in React.                    |
| class-variance-authority | A utility for managing class names based on variants in React components.                      |
| date-fns                 | A modern JavaScript date utility library for parsing, formatting, and manipulating dates.      |
| express                  | A minimal and flexible Node.js web application framework for building APIs.                    |
| react-day-picker         | A flexible date picker component for React applications.                                       |
| react-hook-form          | A library for managing forms in React with easy validation and performance.                    |
| react-router-dom         | A collection of navigational components for React applications.                                |
| tailwind-merge           | A utility for merging Tailwind CSS class names conditionally.                                  |
| tailwindcss              | A utility-first CSS framework for rapidly building custom designs.                             |
| use-debounce             | A React hook for debouncing values, useful for optimizing performance in input fields.         |
| vitest                   | A Vite-native unit testing framework for JavaScript and TypeScript.                            |
| zod                      | A TypeScript-first schema declaration and validation library.                                  |
