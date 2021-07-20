import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  useDisclosure,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { ColumnType, TaskType } from "../helpers/types";

interface Props {
  task: TaskType;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTaskModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskText, setTaskText] = useState(props.task.details);
  const [date, setDate] = useState(props.task.date);

  // Handle editing task
  const handleEdit = () => {
    if (taskText === "") {
      return;
    }
    const storageColumns = JSON.parse(localStorage.getItem("tasks")!);
    // Pointer to tasks
    const editColumn = storageColumns.find(
      (c: ColumnType) => c.id === props.task.taskState
    );
    // Find task
    const toEditTask = editColumn.tasks.find(
      (t: TaskType) => t.id === props.task.id
    );
    toEditTask.details = taskText;
    toEditTask.date = date;
    localStorage.setItem("tasks", JSON.stringify(storageColumns));
    props.setUpdate((update) => !update);
    onClose();
  };

  return (
    <>
      <IconButton
        colorScheme="teal"
        aria-label="edit-task"
        onClick={onOpen}
        icon={<EditIcon />}
        mr="0.5rem"
      />

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(e) => setTaskText(e.target.value)}
              value={taskText}
              my="1rem"
              placeholder="Edit task ..."
              h="10rem"
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-testid="editModal-date-input"
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleEdit}
              colorScheme="teal"
              data-testid="editModal-edit-button"
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTaskModal;
