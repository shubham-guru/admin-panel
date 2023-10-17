import React, { useState } from "react";
import { Form, Input, Button, Typography, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [forgetEmail, setForgetEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { Link } = Typography

  const onFinish = async () => {
    setLoading(true)
    console.log("Received values of form: ", email, password);
    const baseUrl = "https://xpwiz66asom4ptvrygidf3yxmu0zwmzd.lambda-url.ap-south-1.on.aws/v1/api/";
    const params = {
      password: password,
      email: email
    }
    await axios.put(baseUrl+"admin-user/login", params).then((res) => {
      setLoading(false)
      navigate("/index")
    }).catch((err) => {
      setLoading(false)
      console.log(err)
      alert("Something went wrong");
    })
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="form-div">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
        className="input-field"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>

        <Link onClick={showModal}>Forget Password?</Link>
      </div>

      <Modal title="Reset your password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setForgetEmail(e.target.value)}
          />
        </Form.Item>
      </Modal>
    </Form>
  );
};
export default Login;
