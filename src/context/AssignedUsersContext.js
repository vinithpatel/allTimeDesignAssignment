import react from "react";

const AssignedUsersContext = react.createContext({
  assignedUsers: [],
  updatedAssignedUsers: () => {},
});

export default AssignedUsersContext;
