import React, { PureComponent } from "react";
import { Button, Menu, Dropdown, Icon, message } from "antd";
import "./header.css";
import { logout } from "../../redux/actions/auth";
import { bindActionCreators } from "redux";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Header extends PureComponent {
  handleMenuClick = selectedItem => {
    if (selectedItem.key === "1") {
      this.props.logout();
    }
  };
  componentDidUpdate(prevProps) {
    const { username, error } = this.props;
    if (error && error !== prevProps.error) {
      message.error(error);
    }
    if (username !== prevProps.username && !username && !error) {
      message.success("Sing out success");
    }
  }
  render() {
    const loginBlock = this.props.username ? (
      <Dropdown
        overlay={
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">Sing out</Menu.Item>
          </Menu>
        }
      >
        <Button>
          {this.props.username} <Icon type="down" />
        </Button>
      </Dropdown>
    ) : (
      <Button onClick={() => this.props.history.push("/login")}>Sign in</Button>
    );

    return (
      <div className="header">
        <h2>Todo App</h2>
        {loginBlock}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { username, error } }) => {
  return { username };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout: logout()
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
