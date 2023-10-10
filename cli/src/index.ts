import axios from "axios";
import prompts from "prompts";
type Task = {
  title: string;
  description?: string;
  dueDate: string;
  _id: string;
};
const api = axios.create({ baseURL: "http://localhost:4000" });
const run = async () => {
  const token = await showLogin();
  api.defaults.headers.common["Authorization"] = "Bearer " + token;
  const mainAction = await showMainMenu();

  if (mainAction === "create") {
    showCreateTask(goToTaskActions);
  } else if (mainAction === "tasksList") {
    goToTaskActions();
  }
};
const goToTaskActions = async () => {
  const task = await showTasksList();

  showTaskActions(task, showTasksList);
};
const showLogin = async () => {
  const { username } = await prompts({
    name: "username",
    type: "text",
    message: "Enter Username",
    validate: (value) => !!value || "Username is needed",
  });
  if (username) {
    const { password } = await prompts({
      name: "password",
      type: "password",
      message: "Enter Password",
      validate: (value) => !!value || "Passworde is needed",
    });
    if (password) {
      const res = await api.post<{ token: string }>("/signin", {
        username,
        password,
      });
      return res.data.token;
    }
  }
};
const showCreateTask = async (onSuccess: () => void) => {
  const { editedTitle } = await prompts({
    name: "editedTitle",
    type: "text",
    message: "Title",
  });
  const { editedDescription } = await prompts({
    name: "editedDescription",
    type: "text",
    message: "Description",
  });
  const { editedDueDate } = await prompts({
    name: "editedDueDate",
    type: "text",
    message: "Due Date",
  });
  await api.post("/task/", {
    title: editedTitle,
    dueDate: editedDueDate,
    ...(editedDescription && { description: editedDescription }),
  });
  onSuccess();
};
const showMainMenu = async () => {
  const { mainAction } = await prompts({
    name: "mainAction",
    type: "select",
    message: "Select a task",
    choices: [
      {
        title: "Create Task",
        value: "create",
      },
      {
        title: "Show Tasks List",
        value: "tasksList",
      },
    ],
  });
  return mainAction;
};
const showTasksList = async () => {
  const tasksReponse = await api.get<Task[]>("/task");
  const tasksListResult = await prompts({
    name: "selectedTask",
    type: "select",
    message: "Select a task",
    choices: tasksReponse.data.map((task) => ({
      title: task.title,
      description: task.description + " " + task.dueDate,
      value: task,
    })),
  });
  const { selectedTask } = tasksListResult;
  return selectedTask;
};
const showTaskActions = async (selectedTask: Task, onSuccess: () => void) => {
  const { action } = await prompts({
    name: "action",
    type: "select",
    message: "What to do with task: " + selectedTask.title,
    choices: [
      { title: "Edit", value: "edit" },

      { title: "Delete", value: "delete" },
    ],
  });
  if (action === "delete") {
    await api.delete("/task/" + selectedTask._id);
    onSuccess();
  } else if (action === "edit") {
    const { editedTitle } = await prompts({
      name: "editedTitle",
      type: "text",
      message: "Edit Title",
      initial: selectedTask.title,
    });
    const { editedDescription } = await prompts({
      name: "editedDescription",
      type: "text",
      message: "Edit Description",
      initial: selectedTask.description,
    });
    const { editedDueDate } = await prompts({
      name: "editedDueDate",
      type: "text",
      message: "Edit Due Date",
      initial: selectedTask.dueDate,
    });
    await api.patch("/task/", {
      title: editedTitle,
      dueDate: editedDueDate,
      _id: selectedTask._id,
      ...(editedDescription && { description: editedDescription }),
    });
    onSuccess();
  }
};
run();
