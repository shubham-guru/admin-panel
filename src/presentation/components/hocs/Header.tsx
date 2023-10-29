import React from "react";
import { Col, Input, Row, Typography , Button, Badge } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import "../../css/heading.css";

type IHeading = {
  heading: string;
  getCLick?: () => void;
  getSearchedValue: (value: string) => void
  notificationCount?: number
};
const Header: React.FC<IHeading> = ({ heading, getCLick, getSearchedValue, notificationCount = 0 }) => {
  const { Text } = Typography;
  const { Search } = Input;

  console.log(notificationCount)

  return (
    <Row className="header-row" gutter={10}>
      <Col span={heading === "Licence" || heading === "Properties" ? 10 : 16}>
        <Text className="heading">{heading}</Text>
      </Col>
      <Col span={6}>
        <Search placeholder={`Search ${heading}`} onChange={(e: any) => getSearchedValue(e.target.value)} />
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
        <Badge count={notificationCount}>
          <BellOutlined className="bell-icon" />
        </Badge>
      </Col>
    </Row>
  );
};

export default Header;
