import React, { PureComponent } from "react";
import { Row, Col, Form, Input, Radio, Button, message } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addTask, updateTask } from "../../../redux/actions/tasks";
import { withApiService } from "../../hoc";
import { withRouter } from "react-router-dom";
import { compose } from "../../../utils";
import "./task-form.css";
import { isNumber } from "util";
const { TextArea } = Input;
class TaskForm extends PureComponent {
  state = {
    creator: "",
    email: "",
    description: "",
    status: 0,
    id: +this.props.match.params.id || null
  };

  componentDidMount() {
    if (this.isEditTask()) {
      if (this.props.editTask.id === this.state.id) {
        const { username, email, text, status } = this.props.editTask;
        this.props.form.setFieldsValue({
          creator: username || null,
          email: email || null,
          description: text || null,
          status: status || 0
        });
      } else {
        message.error("Please go to this page from the list of tasks.");
      }
    }
  }
  componentDidUpdate(prevProps) {
    const { loading, error, history } = this.props;
    if (error && error !== prevProps.error) {
      message.error(error);
      if (error === "Невалидный токен") {
        history.push("/login");
      }
    }

    if (!loading && prevProps.loading && !error) {
      message.success("Task successfully saved");
      history.push("/");
    }
  }

  isEditTask = () => {
    return isNumber(this.state.id);
  };

  handleSaveTask = e => {
    e.preventDefault();
    this.props.form.validateFields(
      (err, { creator, description, email, status }) => {
        if (!err) {
          if (this.isEditTask()) {
            this.props.updateTask(description, status, this.props.editTask.id);
          } else {
            this.props.addTask(creator, email, description);
          }
        }
      }
    );
  };
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const statusInput = this.isEditTask() ? (
      <Form.Item label="Status">
        {getFieldDecorator("status")(
          <Radio.Group>
            <Radio.Button value={10}>Done</Radio.Button>
            <Radio.Button value={0}>In progress</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
    ) : (
      ""
    );

    return (
      <Row>
        <Col md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }}>
          <Form
            className="task-edit-from-container"
            onSubmit={this.handleSaveTask}
          >
            <Form.Item label="Creator name">
              {getFieldDecorator("creator", {
                rules: [
                  { required: true, message: "Enter username of task creator" }
                ]
              })(<Input disabled={this.isEditTask()} placeholder="Creator" />)}
            </Form.Item>

            <Form.Item label="Creator email">
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Enter email of task creator" }
                ]
              })(<Input disabled={this.isEditTask()} placeholder="Email" />)}
            </Form.Item>

            <Form.Item label="Description">
              {getFieldDecorator("description", {
                rules: [
                  { required: true, message: "Enter description for task" }
                ]
              })(
                <TextArea
                  autosize={{ minRows: 6, maxRows: 10 }}
                  placeholder="Description"
                />
              )}
            </Form.Item>

            {statusInput}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
const WrappedTaskForm = Form.create({ name: "task_form" })(TaskForm);

const mapStateToProps = ({ tasks: { error, loading, editTask } }) => {
  return { error, loading, editTask };
};

const mapDispatchToProps = (
  dispatch,
  { apiService, creator, email, description, status, id }
) => {
  return bindActionCreators(
    {
      addTask: addTask(apiService, creator, email, description),
      updateTask: updateTask(apiService, description, status, id)
    },
    dispatch
  );
};

export default compose(
  withApiService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(WrappedTaskForm));
