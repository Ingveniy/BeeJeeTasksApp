import React, { Component } from "react";
import { Row, Col, Button, message } from "antd";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectTask, getTasks } from "../../../redux/actions/tasks";
import { withApiService } from "../../hoc";
import { compose } from "../../../utils";
import DataTable from "../../data-table";
import "./tasks.css";

class Tasks extends Component {
  state = {
    tasks: null,
    tasksCount: null
  };

  async componentDidMount() {
    await this.getTasksListWihtFilter();
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error && error !== prevProps.error) {
      message.error(error);
    }
  }

  getTasksListWihtFilter = async (
    page = 1,
    sorterField = null,
    sorterOrder = null
  ) => {
    this.props.getTasks(page, sorterField, sorterOrder);
  };

  handleChangeTable = (pagination, filters, sorter) => {
    this.getTasksListWihtFilter(pagination.current, sorter.field, sorter.order);
  };

  editTask = record => {
    this.props.selectTask(record);
    this.props.history.push(`/tasks/${record.id}/`);
  };
  addTask = () => {
    this.props.history.push(`/tasks/new/`);
  };
  render() {
    const { tasks, tasksCount, loading } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "username",
        key: "username",
        width: "20%",
        sorter: () => {}
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "15%",
        sorter: () => {}
      },
      {
        title: "Text",
        dataIndex: "text",
        key: "text",
        width: "30%"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "15%",
        sorter: () => {},
        render: text => (+text === 0 ? "In progress" : "Done")
      },
      {
        render: (text, record) => {
          return (
            <div className="actions">
              <Button onClick={() => this.editTask(record)} icon="edit" />
            </div>
          );
        },
        width: "20%"
      }
    ];
    return (
      <Row>
        <Col md={{ span: 24, offset: 0 }} lg={{ span: 20, offset: 2 }}>
          <DataTable
            loading={loading}
            tableData={tasks}
            totalCount={tasksCount}
            tableHeader={columns}
            onChange={this.handleChangeTable}
          />
          <Button type="primary" onClick={() => this.addTask()}>
            Add task
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({
  tasks: { error, loading, editTask, tasksCount, tasks }
}) => {
  return { error, loading, editTask, tasksCount, tasks };
};

const mapDispatchToProps = (
  dispatch,
  { apiService, editTask, page, sorterField, sorterOrder }
) => {
  return bindActionCreators(
    {
      selectTask: selectTask(editTask),
      getTasks: getTasks(apiService, page, sorterField, sorterOrder)
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
)(withRouter(Tasks));
