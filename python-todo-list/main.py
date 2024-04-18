tasks = []

def addTask():
    task = input('Please enter a task: ')
    tasks.append(task)
    print(f"Task '{task}' added to the list.")

def listTasks():
    if not tasks:
        print('There are no tasks currently.')
    else:
        print('Current tasks:')
        for index, task in enumerate(tasks):
            print(f'Task #{index}. {task}')

def deleteTask():
    listTasks()

    try:
        taskToDelete = int(input('Enter the # to delete: '))
        if 0 <= taskToDelete < len(tasks):
            tasks.pop(taskToDelete)
            print(f'Task ${taskToDelete} has been removed.')
        else:
            print(f'Task #{taskToDelete} was not found.')
    except:
        print('Invalid input.')

if __name__ == '__main__':
    print('Welcome to the todo list app!')
    while True:
        print('\n')
        print('Please select one of the following options')
        print('----------------------------------')
        print('1. Add a new task')
        print('2. Delete a task')
        print('3. List tasks')
        print('4. Quit')
        print('\n')

        choice = input('Enter your choice: ')

        match choice:
            case '1':
                addTask()
            case '2':
                deleteTask()
            case '3':
                listTasks()
            case '4':
                break
            case _:
                print('Invalid input. Please try again.')

    print('Goodbye 👋👋')