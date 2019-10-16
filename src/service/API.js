import axios from "axios";

export default class API {
  api = axios.create({
    baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2",
    responseType: "json"
  });
  developerTag = "?developer=Ingeniy";

  getTasks = async (page = 1, sortField = null, sortDirection = null) => {
    let responseData = await this.api.get(`/${this.developerTag}`, {
      params: {
        page,
        sort_field: sortField,
        sort_direction: sortDirection === "descend" ? "desc" : "asc"
      }
    });
    let { tasks, total_task_count: tasksCount } = responseData.data.message;
    return {
      tasks,
      tasksCount
    };
  };

  createTask = async (username, email, text) => {
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);

    let responseData = await this.api.post(
      `/create/${this.developerTag}`,
      form
    );
    return responseData.data;
  };

  updateTask = async (text, status, id) => {
    let token = localStorage.getItem("token");
    const form = new FormData();
    form.append("text", text);
    form.append("status", status);
    form.append("token", token);
    let responseData = await this.api.post(
      `/edit/${id}/${this.developerTag}`,
      form
    );
    return responseData.data;
  };

  getAuthToken = async (username, password) => {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    let responseData = await this.api.post(`/login/${this.developerTag}`, form);
    return responseData.data;
  };
}
