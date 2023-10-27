import React, { useState } from "react";
import { Col, Tabs, TabsProps, Image, Typography } from "antd";
import UserDetails from "../components/UserDetails";
import Licence from "../components/Licence";
import iconOne from "../assets/iconOne.svg";
import iconTwo from "../assets/iconTwo.svg";
import iconThree from "../assets/iconThree.svg";

import "../css/index.css";
import Properties from "../components/Properties";

const Index = () => {
  const { Text } = Typography;
  const items: TabsProps["items"] = [
    {
      label: (
        <span className="tabs-label">
          <Image src={iconOne} alt="user-details" width={15} />
          <Text className="tab-bar-text">User detail</Text>
        </span>
      ),
      key: "1",
      children: <UserDetails />,
    }
  ];
  return (
    <Col span={24}>
      <Tabs className="tabs" tabPosition="left" items={items} />
    </Col>
  );
};

export default Index;
