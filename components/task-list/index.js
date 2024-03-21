import { Badge, ListItem } from "@rneui/themed";
import { TASK } from "../../model";
import { APP_COLORS } from "../../styles/color";
import { style } from "./style";

const TaskList = ({ taskList, onPressCallBack }) => (
    <>
        {taskList.map(({ id, content, status }) => (
            <ListItem key={id} bottomDivider onPress={() => onPressCallBack(id)}>
                <ListItem.Content style={style.taskItem}>
                    <ListItem.Title>{content}</ListItem.Title>
                    <Badge value={status}
                           badgeStyle={{
                               ...style.status,
                               backgroundColor: status === TASK.todoStatus ? APP_COLORS.accent : APP_COLORS.lightPrimaryColor
                           }}/>
                </ListItem.Content>
            </ListItem>
        ))}
    </>
);

export default TaskList;
