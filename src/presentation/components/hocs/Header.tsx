import React from "react";
import { Col, Input, Row, Typography , Button } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import "../../css/heading.css";

type IHeading = {
  heading: string;
  getCLick?: () => void;
  getSearchedValue: (value: string) => void
};
const Header: React.FC<IHeading> = ({ heading, getCLick, getSearchedValue }) => {
  const { Text } = Typography;
  const { Search } = Input;

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
        <BellOutlined className="bell-icon" />
      </Col>
    </Row>
  );
};

export default Header;
