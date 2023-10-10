import { Row, Col } from 'antd'
import React from 'react'
import Header from './hocs/Header'

const Licence = () => {
  return (
    <Row className=''>
        <Col className='header-col' span={23}>
            <Header heading='Licence' />
        </Col>
    </Row>
  )
}

export default Licence