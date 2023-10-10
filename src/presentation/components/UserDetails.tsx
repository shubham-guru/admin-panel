import React from 'react'
import Header from './hocs/Header'
import { Col, Row } from 'antd'
import "../css/userDetails.css"

const UserDetails = () => {
  return (
    <Row className=''>
        <Col className='header-col' span={23}>
            <Header heading='User Details' />
        </Col>
    </Row>
  )
}

export default UserDetails