import { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import lodash from "lodash";
import Header from "./components/header";
import TaskList from "./components/task-list";
import ButtonAddTask from "./components/button-add-task";
import MenuTask from "./components/menu-task";
import TextPrompt from "./components/text-prompt";
import { style } from "./style";
import { TASK } from "./model";

const storageKey = "taskList";
const tasks = [];

export default function App() {
    const [taskList, setTaskList] = useState(tasks);
    const [isMenuTaskVisible, setIsMenuTaskVisible] = useState(false);
    const [isAddPromptVisible, setIsAddPromptVisible] = useState(false);
    const [isRenamePromptVisible, setIsRenamePromptVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState();
    const [idGenerator, setIdGenerator] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem(storageKey).then(storedTaskList => {
            if (storedTaskList) {
                const storedTaskListParse = JSON.parse(storedTaskList);
                setTaskList(storedTaskListParse);
                setIdGenerator(storedTaskListParse[storedTaskListParse.length - 1].id + 1);
            }
        })
    }, []);

    const toggleMenuTaskVisibility = (task) => {
        let currentTask = task;

        if (isMenuTaskVisible) {
            currentTask = {};
        }

        setIsMenuTaskVisible(isVisible => !isVisible);
        setCurrentTask(currentTask);
    };

    const deleteCurrentTask = () => {
        const index = lodash.findIndex(taskList, { id: currentTask.id });
        const list = taskList;

        list.splice(index, 1);
        setTaskList(list);
        toggleMenuTaskVisibility();
        saveTaskList();
    };

    const toggleTaskStatus = () => {
        const index = lodash.findIndex(taskList, { id: currentTask.id });
        const updatedTask = taskList[index];
        updatedTask.status = updatedTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;

        const updatedTaskList = taskList;
        updatedTaskList[index] = updatedTask;
        setTaskList(updatedTaskList);
        toggleMenuTaskVisibility();
        saveTaskList();
    };

    const toggleAddPrompt = () => {
        setIsAddPromptVisible(isVisible => !isVisible);
    };

    const onAddTask = (value) => {
        const newTask = {
            id: idGenerator,
            content: value,
            status: TASK.todoStatus
        };
        setTaskList(taskList => [...taskList, newTask]);
        setIdGenerator(idGenerator => idGenerator + 1);
        toggleAddPrompt();
        saveTaskList();
    };

    const toggleRenamePrompt = (task) => {
        let currentTask = task;

        if (isMenuTaskVisible) {
            currentTask = {};
        }

        setIsRenamePromptVisible(isVisible => !isVisible);
        setCurrentTask(currentTask);
    };

    const onRenameTask = (value) => {
        const index = lodash.findIndex(taskList, { id: currentTask.id });
        const updatedTask = taskList[index];
        updatedTask.content = value;

        const updatedTaskList = taskList;
        updatedTaskList[index] = updatedTask;
        setTaskList(updatedTaskList);
        toggleRenamePrompt();
        saveTaskList();
    };

    const saveTaskList = () => {
        AsyncStorage.setItem(storageKey, JSON.stringify(taskList));
    }

    return (
        <View style={{ flex: 1 }}>
            <Header content="Liste de tâches"/>
            <ScrollView>
                {taskList.length > 0 ?
                    <TaskList onPressCallBack={toggleMenuTaskVisibility} onLongPressCallBack={toggleRenamePrompt}
                              taskList={taskList}/> :
                    <View style={style.noTask}><Text>Cliquer sur le bouton ajouter pour créer une tâche</Text></View>}
            </ScrollView>
            <MenuTask isVisible={isMenuTaskVisible} onDisapearCallBack={toggleMenuTaskVisibility}
                      onDeleteCallBack={deleteCurrentTask} onChangeStatusCallBack={toggleTaskStatus}
            />
            <TextPrompt isVisible={isAddPromptVisible} onCancelCallBack={toggleAddPrompt} onSubmitCallBack={onAddTask}
                        title="Ajouter une nouvelle tâche" placeholder="Ex : Acheter du lait" defaultValue=""/>
            <TextPrompt isVisible={isRenamePromptVisible} onCancelCallBack={toggleRenamePrompt}
                        onSubmitCallBack={onRenameTask} title="Renmomer la tâche" placeholder=""
                        defaultValue={currentTask?.content}/>
            <ButtonAddTask onPressCallBack={toggleAddPrompt}/>
        </View>
    );
}
