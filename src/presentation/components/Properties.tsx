import { Col, Row } from 'antd'
import React from 'react'
import Header from './hocs/Header'

const Properties = () => {
  return (
    <Row className=''>
        <Col className='header-col' span={23}>
            <Header heading='Properties' />
        </Col>
    </Row>
  )
}

export default Properties