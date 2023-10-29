import { Row, Col, Modal, Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import { UserOutlined } from "@ant-design/icons";
import "../css/licence.css";
import Header from './hocs/Header'

const Licence = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {

  }

  return (
    <Row>
        <Col className='header-col' span={23}>
            {/* <Header heading='Licence' getCLick={showModal} /> */}
        </Col>

        <Modal title="Generate Unique Id" centered open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
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
            className='generate-id-email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="generate-form-button"
            loading={loading}
          >
            Generate Unique ID
          </Button>
        </Form.Item>
        </Form>
      </Modal>
    </Row>
  )
}

export default Licence