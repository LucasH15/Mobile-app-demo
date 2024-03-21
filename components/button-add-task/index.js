import ActionButton from "react-native-action-button";
import { Icon } from "@rneui/themed";
import { APP_COLORS } from "../../styles/color";

const ButtonAddTask = ({ onPressCallBack }) => (
    <ActionButton
        buttonColor={APP_COLORS.primaryAction}
        onPress={onPressCallBack}
    >
        <Icon color={APP_COLORS.primaryText} name="add"/>
    </ActionButton>
);

export default ButtonAddTask;
