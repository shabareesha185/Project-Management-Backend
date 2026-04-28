export const UserRoleEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBERS: "members",
};
export const AvailableUserRole = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progess",
  DONE: "done",
};
export const AvailableTaskStatus = Object.values(TaskStatusEnum);
