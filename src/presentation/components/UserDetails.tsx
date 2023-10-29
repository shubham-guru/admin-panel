import React, { useEffect, useState } from "react";
import Header from "./hocs/Header";
import { Col, Row, Table, Typography, Modal, Button, Input, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, CaretDownOutlined } from "@ant-design/icons";
import "../css/userDetails.css";
import axios from "axios";
import DataType from "../../domain/interface/tableInterface";

const UserDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isHostelUpdate, setIsHostelUpdate] = useState<boolean>(false);
  const [isMemberUpdate, setIsMemberUpdate] = useState<boolean>(false);
  const [showSubTable, setShowSubTable] = useState<boolean>(false);
  const [userData, setUserData] = useState<Array<any>>([]);
  const [searchedData, setSearchedData] = useState<Array<any>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedHostelCount, setUpdatedHostelCount] = useState<string>("");
  const [updatedMemberCount, setUpdatedMemberCount] = useState<string>("");

  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    hostel: "",
    member: "",
    authToken: "",
    hostelInfo: [],
  });

  const { Text } = Typography;
  const baseUrl =
    "https://xpwiz66asom4ptvrygidf3yxmu0zwmzd.lambda-url.ap-south-1.on.aws/v1/api/";

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "User id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
      dataIndex: "id",
      key: "delete",
      render: (id: string) => {
        return (
          <EditOutlined
            className="update-icon"
            onClick={() => updateUserData(id)}
          />
        );
      },
    },
  ];

  console.log(userData);

  // Updating the user object
  const updateUserData = (userId: string) => {
    const user = userData.find((item: { id: string }) => item.id === userId);
    setUserInfo({
      hostel: user.hostelcount,
      member: user.memberCount ? user.memberCount : null,
      name: user.full_name,
      userId: user.id,
      authToken: user.auth_token,
      hostelInfo: user.hostels,
    });
    setIsModalOpen(true);
  };

  // Getting the users list
  const getAllUsers = async () => {
    setLoading(true);
    await axios
      .get(baseUrl + "get-admin-user-list")
      .then((res) => {
        setUserData(
          res?.data.data.users.filter(
            (user: any) => user.role === "Property Owner"
          )
        );
        setSearchedData(
          res?.data.data.users.filter(
            (user: any) => user.role === "Property Owner"
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Something went wrong");
      });
  };

  // Updating Hostel and Member count
  const handleClick = async (text: string, token: string) => {
    const hostelParams = {
      hostelcount: Number(updatedHostelCount),
    };
    const memberParams = {
      memberCount: Number(updatedMemberCount),
    };
    let params = text === "hostel" ? hostelParams : memberParams;

    text === "hostel" ? setIsHostelUpdate(true) : setIsMemberUpdate(true);
    await axios
      .put(baseUrl + "update-user", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let mess = text === "hostel" ? "Hostel" : "Member";
        alert(mess + " Count updated Successfully !");
        handleCancel();
        text === "hostel" ? setIsHostelUpdate(false) : setIsMemberUpdate(false);
      })
      .catch((err) => {
        console.log(err);
        text === "hostel" ? setIsHostelUpdate(false) : setIsMemberUpdate(false);
        alert("Something went wrong");
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const searchedValue = (txt: string) => {
    let searchedArray = userData.filter((ele: { email: string }) =>
      ele.email.includes(txt)
    );
    setSearchedData(searchedArray);
  };

  return (
    <Row className="">
      <Col className="header-col" span={23}>
        <Header
          heading="User Details"
          getSearchedValue={(value: string) => searchedValue(value)}
        />
        {loading ? (
          <Text>Data is loading...</Text>
        ) : (
          <Table
            columns={columns}
            dataSource={searchedData ? searchedData : userData}
          />
        )}
      </Col>

      <Modal
        title="Update User details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Text>Name: {userInfo.name}</Text> <br />
        <Text>UserId: {userInfo.userId}</Text> <br />
        {/* Updated Hostel */}
        <Col span={24} className="form-col">
          <Text>Hostel: </Text>
          <Form form={form} initialValues={{ hostel: userInfo.hostel }}>
            <Form.Item name="hostel">
              <Input
                className="input-field"
                onChange={(e) => setUpdatedHostelCount(e.target.value)}
                value={updatedHostelCount}
              />
            </Form.Item>
          </Form>
          <Button
            className="update-btn"
            loading={isHostelUpdate}
            onClick={() => handleClick("hostel", userInfo.authToken)}
          >
            Update
          </Button>
        </Col>
        <br />
        {/* Updated Member */}
        <Col span={24} className="form-col">
          <Text>Member: </Text>
          <Form form={form} initialValues={{ member: userInfo.member }}>
            <Form.Item name="member">
              <Input
                className="input-field"
                onChange={(e) => setUpdatedMemberCount(e.target.value)}
                value={updatedMemberCount}
              />
            </Form.Item>
          </Form>
          <Button
            className="update-btn"
            loading={isMemberUpdate}
            onClick={() => handleClick("member", userInfo.authToken)}
          >
            Update
          </Button>
        </Col>
        <table width="100%" cellPadding="5%" id="hostel-table">
          <tr>
            <th>Name of Property</th>
            <th>Date of creation</th>
            <th>State</th>
          </tr>

          {userInfo.hostelInfo.map((item: any, index: number) => {
            return (
              <>
                <tr className="table-tr" key={index}>
                  <td>
                    {item.name}{" "}
                    <CaretDownOutlined
                      onClick={() => setShowSubTable(!showSubTable)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td>{item.createdAt.split("T")[0]}</td>
                  <td>{item.state}</td>
                </tr>

                {showSubTable ? (
                  <Col className="sub-table-col" span={24}>
                    <table width={'100%'} cellPadding={5} border={1}>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>

                    {item.members.map((member: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{member.full_name}</td>
                          <td>{member.email}</td>
                          <td>{member.job_role}</td>
                        </tr>
                      );
                    })}
                    </table>
                  </Col>
                ) : null}
              </>
            );
          })}
        </table>
      </Modal>
    </Row>
  );
};

export default UserDetails;
