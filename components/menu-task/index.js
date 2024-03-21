import Modal from "react-native-modal";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import { style } from "./style";

const MenuTask = ({ isVisible, onDisapearCallBack, onDeleteCallBack, onChangeStatusCallBack }) => (
    <Modal
        isVisible={isVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
    >
        <View style={style.modal}>
            <View style={style.textView}>
                <Text>Que souhaitez-vous faire sur la tâche ?</Text>
            </View>
            <View style={style.buttonView}>
                <Button
                    buttonStyle={style.buttonDelete}
                    title="Supprimer"
                    onPress={() => onDeleteCallBack()}
                />
                <Button
                    buttonStyle={style.buttonView}
                    title="Changer status"
                    onPress={() => onChangeStatusCallBack()}
                />
            </View>
        </View>
    </Modal>
);

export default MenuTask;
