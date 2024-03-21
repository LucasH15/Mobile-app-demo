import Prompt from "rn-prompt";

const AddTaskPrompt = ({ isVisible, onCancelCallBack, onSubmitCallBack }) => (
    <Prompt
        title="Ajouter une nouvelle tâche"
        placeholder="Ex : Acheter du lait"
        defaultValue=""
        visible={isVisible}
        onCancel={() => onCancelCallBack()}
        onSubmit={(value) => onSubmitCallBack(value)}
    />
);

export default AddTaskPrompt;
