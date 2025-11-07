# Task Manager (CLI)

Small CLI tool to create and manage tasks locally using Node.js.

## Description
This project provides a script (`task-cli.js`) to manage simple tasks (todo, in-progress, done). Tasks are stored in `task.json` in the same directory.

## Requirements
- Node.js (version >= v22.20.0)
- npm

## Installation
1. Clone the repository:
```bash
git clone https://github.com/sebastian-nc/task-manager
```

2. Change into the project directory:
```bash
cd /home/dev/roadmap/task-manager
```

3. Install dependencies:
```bash
npm install
```

## Usage
Run the script with Node from the terminal:

```bash
node task-cli.js <command> [args]
```

Available commands:
- add "<description>"
  - Adds a new task.
  - Example:
  ```bash
  node task-cli.js add "Buy milk"
  ```

- update <id> "<new description>"
  - Updates the description of a task (by id).
  - Example:
  ```bash
  node task-cli.js update 6f7a... "Buy eggs"
  ```

- delete <id>
  - Deletes a task by id.
  - Example:
  ```bash
  node task-cli.js delete 6f7a...
  ```

- list [status]
  - Lists tasks. `status` is optional and can be: `todo`, `in-progress`, `done`.
  - Examples:
  ```bash
  node task-cli.js list
  node task-cli.js list done
  ```

- mark-done <id>
  - Marks a task as `done`.
  - Example:
  ```bash
  node task-cli.js mark-done 6f7a...
  ```

- mark-in-progress <id>
  - Marks a task as `in-progress`.
  - Example:
  ```bash
  node task-cli.js mark-in-progress 6f7a...
  ```

## Task structure
Each task in `task.json` contains:
- id: unique identifier (UUID)
- description: task text
- status: `todo` | `in-progress` | `done`
- createdAt: creation date (YYYY-MM-DD)
- updatedAt: last update date (YYYY-MM-DD HH:mm) or empty string

## Notes & Troubleshooting
- The `task.json` file will be created automatically when you add the first task.
- If you operate on a non-existent id, the CLI will show "Task not found (ID: ...)" and exit with code 1.
- Wrap descriptions in quotes when they contain spaces.

## Dependencies
- dayjs
- picocolors

## License & Author
Author: sebatian  
License: ISC