import { useState } from "react";
import { View, ScrollView } from "react-native";
import lodash from "lodash";
import Header from "./components/header";
import TaskList from "./components/task-list";
import ButtonAddTask from "./components/button-add-task";
import MenuTask from "./components/menu-task";
import AddTaskPrompt from "./components/add-task-prompt";
import { TASK } from "./model";

const tasks = [
    {
        id: 0,
        content: "Aller voir Sébastien",
        status: "En cours"
    },
    {
        id: 1,
        content: "Se brosser les dents",
        status: "En cours"
    },
    {
        id: 2,
        content: "Faire du ménage",
        status: "Terminé"
    }
];

export default function App() {
    const [taskList, setTaskList] = useState(tasks);
    const [isMenuTaskVisible, setIsMenuTaskVisible] = useState(false);
    const [isAddPromptVisible, setIsAddPromptVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState();
    const [idGenerator, setIdGenerator] = useState(taskList.length);

    const toggleMenuTaskVisibility = (task) => {
        let currentTask = task;

        if (isMenuTaskVisible) {
            currentTask = {};
        }

        setIsMenuTaskVisible(isVisible => !isVisible);
        setCurrentTask(currentTask);
    };

    const deleteCurrentTask = () => {
        const index = lodash.findIndex(taskList, { id: currentTask });
        const list = taskList;

        list.splice(index, 1);
        setTaskList(list);
        toggleMenuTaskVisibility();
    };

    const toggleTaskStatus = () => {
        const index = lodash.findIndex(taskList, { id: currentTask });
        const updatedTask = taskList[index];
        updatedTask.status = updatedTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;

        const updatedTaskList = taskList;
        updatedTaskList[index] = updatedTask;
        setTaskList(updatedTaskList);
        toggleMenuTaskVisibility();
    };

    const toggleAddPrompt = () => {
        setIsAddPromptVisible(isVisible => !isVisible);
    }

    const onAddTask = (value) => {
        const newTask = {
            id: idGenerator,
            content: value,
            status: TASK.todoStatus
        };
        setTaskList(taskList => [...taskList, newTask]);
        setIdGenerator(idGenerator => idGenerator++);
        toggleAddPrompt();
    }

    return (
        <View style={{ flex: 1 }}>
            <Header content="Liste de tâches"/>
            <ScrollView>
                <TaskList onPressCallBack={toggleMenuTaskVisibility} taskList={taskList}/>
            </ScrollView>
            <MenuTask isVisible={isMenuTaskVisible} onDisapearCallBack={toggleMenuTaskVisibility}
                      onDeleteCallBack={deleteCurrentTask} onChangeStatusCallBack={toggleTaskStatus}
            />
            <AddTaskPrompt isVisible={isAddPromptVisible} onCancelCallBack={toggleAddPrompt} onSubmitCallBack={onAddTask}/>
            <ButtonAddTask onPressCallBack={toggleAddPrompt} />
        </View>
    );
}
