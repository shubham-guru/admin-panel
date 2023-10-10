import React from 'react'
import { Col, Input, Row, Typography, Image } from 'antd'
import { SearchProps } from 'antd/es/input'
import {BellOutlined} from "@ant-design/icons"
import "../../css/heading.css"

type IHeading = {
    heading: string,
}
const Header:React.FC<IHeading> = ({heading}) => {
    const { Text } = Typography
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  return (
    <Row className='header-row'>
        <Col span={16}>
            <Text className='heading'>{heading}</Text>
        </Col>
        <Col span={6}>
            <Search placeholder={`Search ${heading}`} onSearch={onSearch} />
        </Col>
        <Col span={2}>
            <BellOutlined className='bell-icon' />
        </Col>
    </Row>
  )
}

export default Header