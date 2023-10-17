import React from "react";
import { Col, Input, Row, Typography, Image, Button } from "antd";
import { SearchProps } from "antd/es/input";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import "../../css/heading.css";

type IHeading = {
  heading: string;
  getCLick?: () => void;
};
const Header: React.FC<IHeading> = ({ heading, getCLick }) => {
  const { Text } = Typography;
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <Row className="header-row" gutter={10}>
      <Col span={heading === "Licence" || heading === "Properties" ? 10 : 16}>
        <Text className="heading">{heading}</Text>
      </Col>
      <Col span={6}>
        <Search placeholder={`Search ${heading}`} onSearch={onSearch} />
      </Col>
      {heading === "Licence" || heading === "Properties" ? (
        <Col span={6}>
          <Button
            className="generate-id-btn"
            icon={<PlusOutlined />}
            onClick={getCLick}
          >
            Generate Unique ID
          </Button>
        </Col>
      ) : null}
      <Col span={2}>
        <BellOutlined className="bell-icon" />
      </Col>
    </Row>
  );
};

export default Header;
