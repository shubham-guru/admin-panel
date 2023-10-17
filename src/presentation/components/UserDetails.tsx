import React, { useEffect, useState } from 'react'
import Header from './hocs/Header'
import { Col, Row, Table, Tag, Typography, Dropdown } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { DownOutlined,DeleteOutlined } from '@ant-design/icons';
import "../css/userDetails.css"
import axios from 'axios'
import DataType from '../../domain/interface/tableInterface';

const UserDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  const { Text } = Typography;

  useEffect(() => {
    getAllUsers();
  }, [])
  
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: userData?.user_status === 'active' ? <Text className='user-status-text'>active</Text> : <Text className='user-status-text'>inactive</Text>,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'User id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'user_status',
      key: 'user_status',
      render: (user_status: string) => {
        let color = user_status === 'active' ? '#C4D8FF' :'#FFBEA9';
        let textColor = user_status === 'active' ? '#5B93FF' :'#FF5B5B';
        return(
          <div>
             <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['3'],
              }}
            >
              <Tag color={color} className='status-tag'>
                  <Text className='user-status-text' style={{color: textColor}}>{user_status}</Text>
                  <DownOutlined />
              </Tag>
            </Dropdown>
          </div>
        )
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '',
      dataIndex: '',
      key: 'delete',
      render: () => {
        return(
          <DeleteOutlined className='delete-icon' />
        )
      }
    },
  ];

  const getAllUsers = async () => {
    setLoading(true);
    const baseUrl = "https://xpwiz66asom4ptvrygidf3yxmu0zwmzd.lambda-url.ap-south-1.on.aws/v1/api/";
    await axios.get(baseUrl+"get-admin-user-list").then((res) => {
      setUserData(res?.data.data.users)
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      console.log(err)
      alert("Something went wrong");
    })
  }

  console.log(userData)


  return (
    <Row className=''>
        <Col className='header-col' span={23}>
            <Header heading='User Details' />
            {
              loading ? <Text>Data is loading...</Text> : <Table columns={columns} dataSource={userData} />
            }
          </Col>
    </Row>
  )
}

export default UserDetails