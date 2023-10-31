import React from "react";
import { Col, Input, Row, Typography , Button, Badge, Dropdown, MenuProps } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import "../../css/heading.css";

type IHeading = {
  heading: string;
  getCLick?: () => void;
  getSearchedValue: (value: string) => void
  notificationCount?: any
};
const Header: React.FC<IHeading> = ({ heading, getCLick, getSearchedValue, notificationCount}) => {
  const { Text } = Typography;
  const { Search } = Input;

  console.log(notificationCount )

  const items: MenuProps['items'] = 
    notificationCount.map((item: any) => {
      return(
       {
         label: (
           <Text>
            {item.email + " is trying to access more features"}
          </Text>
        ),
        key: item.id,
       }
      )
    })
  ;

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
      <Dropdown placement="bottomRight" menu={{ items }}>
          <Badge count={notificationCount?.length}>
            <BellOutlined className="bell-icon" />
          </Badge>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Header;
