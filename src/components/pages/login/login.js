import React, { PureComponent } from "react";
import { Button, Form, Icon, Input, Row, Col, message } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";
import { withApiService } from "../../hoc";
import { withRouter } from "react-router-dom";

import { compose } from "../../../utils";

import "./login.css";
const FormItem = Form.Item;
class Login extends PureComponent {
  componentDidUpdate(prevProps) {
    const { loading, error, history, username } = this.props;
    if (error && error !== prevProps.error) {
      message.error(error);
    }
    if (prevProps.username !== username && !error && !loading) {
      history.push("/");
    }
  }
  handleLogin = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password);
      }
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <Row>
        <Col md={{ span: 10, offset: 7 }} lg={{ span: 5, offset: 10 }}>
          <Form className="login-container" onSubmit={this.handleLogin}>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(Login);

const mapStateToProps = ({ auth: { error, loading, token, username } }) => {
  return { error, loading, token, username };
};

const mapDispatchToProps = (dispatch, { apiService, username, password }) => {
  return bindActionCreators(
    {
      login: login(apiService, username, password)
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
)(withRouter(WrappedLoginForm));
