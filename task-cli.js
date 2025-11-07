const fs = require('node:fs')
const path = require('node:path')
const dayjs = require('dayjs')
const pc = require('picocolors')

// path initial
const taskFile = path.join(__dirname, 'task.json')

function taskIndex(tasks, id) {
    const indexTask = tasks.findIndex((task) => task.id == id)

    if (indexTask == -1) {
        console.log(`Task not found (ID: ${id})`)
        process.exit(1)
    }

    return indexTask
}

function getTasks() {
    try {
        const tasks = fs.readFileSync(taskFile, 'utf-8')
        return JSON.parse(tasks)
    } catch (error) {
        return []
    }
}

function addTask(description) {

    const tasks = getTasks()

    const task = {
        id: crypto.randomUUID(),
        description: description ?? '',
        status: 'todo',
        createdAt: dayjs().format("YYYY-MM-DD"),
        updatedAt: ""
    }

    const tasksModify = [...tasks, task]
    fs.writeFileSync(taskFile, JSON.stringify(tasksModify, null, 2))
    console.log(`Task added successfully (ID: ${task.id})`)
}

function updateTask({ id, description = undefined, status = undefined}) {
    const tasks = getTasks()
    const indexTask = taskIndex(tasks, id)
    
    // reference tasks
    const task = tasks[indexTask]

    if (description) {
        task["description"] = description
        task["updatedAt"] = dayjs().format("YYYY-MM-DD HH:mm")
        console.log(`Update description task (ID: ${id})`)
    }

    if (status) {
        task["status"] = status
        task["updatedAt"] = dayjs().format("YYYY-MM-DD HH:mm")
        console.log(`Update status task (ID: ${id})`)
    }

    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2))

}

function deleteTask(id) {
    const tasks = getTasks()
    const indexTask = taskIndex(tasks, id)

    tasks.splice(indexTask, 1)
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2))

}

function showTask(tasks) {
    console.log(pc.yellow("-------------------------------------------"))
    for (const { id, description, status, createdAt, updatedAt } of tasks) {
        console.log(`${pc.bold('Task')} (ID: ${pc.bgMagenta(pc.italic(id))})`)
        console.log(`${pc.bold('Description')}: ${description}`)
        console.log(`${pc.bold('Status')}: ${pc.black(status == 'done' ? pc.bgGreen(status) : pc.bgYellow(status))}`)
        console.log(`${pc.bold('Create At')}: ${createdAt}`)
        console.log(`${pc.bold('Update At')}: ${updatedAt != '' ? updatedAt : '-- -- --'}`)
        console.log(pc.yellow("-------------------------------------------"))

    }

    console.log(`Tasks length: ${tasks.length}`)
    console.log("-------------------------------------------")


}

function getTaskFilter(status = null) {
    const tasks = getTasks()

    if (status == null) {
        showTask(tasks)
        process.exit(0)
    }

    if (status == 'todo') {
        const taskFilter = tasks.filter((task) => task.status == 'todo')
        showTask(taskFilter)
    }

    if (status == 'done') {
        const taskFilter = tasks.filter((task) => task.status == 'done')
        showTask(taskFilter)
    }

    if (status == 'in-progress') {
        const taskFilter = tasks.filter((task) => task.status == 'in-progress')
        showTask(taskFilter)
    }

}

const args = process.argv.slice(2) // get arguments
const command = args[0]

switch (command) {
    case 'add':
        addTask(args[1])
        break;
    case 'update':
        updateTask({ id: args[1], description: args[2] })
        break;
    case 'delete':
        deleteTask(args[1])
        break;
    case 'list':
        getTaskFilter(args[1])
        break;
    case 'mark-done':
        updateTask({ id: args[1], status: 'done' })
        break;
    case 'mark-in-progress':
        updateTask({ id: args[1], status: 'in-progress' })
        break;
    default:
        break;
}
