import React, { useEffect, useState } from 'react'
import Header from './hocs/Header'
import { Col, Row, Table, Tag, Typography, Dropdown, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import "../css/userDetails.css"
import axios from 'axios'
import DataType from '../../domain/interface/tableInterface';

const UserDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Text } = Typography;

  useEffect(() => {
    // getAllUsers();
  }, [])
  
  // const items: MenuProps['items'] = [
  //   {
  //     key: '1',
  //     label: userData?.user_status === 'active' ? <Text className='user-status-text'>active</Text> : <Text className='user-status-text'>inactive</Text>,
  //   },
  // ];

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
    // {
    //   title: 'Status',
    //   dataIndex: 'user_status',
    //   key: 'user_status',
    //   render: (user_status: string) => {
    //     let color = user_status === 'active' ? '#C4D8FF' :'#FFBEA9';
    //     let textColor = user_status === 'active' ? '#5B93FF' :'#FF5B5B';
    //     return(
    //       <div>
    //          <Dropdown
    //           menu={{
    //             items,
    //             selectable: true,
    //             defaultSelectedKeys: ['3'],
    //           }}
    //         >
    //           <Tag color={color} className='status-tag'>
    //               <Text className='user-status-text' style={{color: textColor}}>{user_status}</Text>
    //               <DownOutlined />
    //           </Tag>
    //         </Dropdown>
    //       </div>
    //     )
    //   }
    // },
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
          <EditOutlined className='update-icon' onClick={() => setIsModalOpen(true)} />
          
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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row className=''>
        <Col className='header-col' span={23}>
            <Header heading='User Details' />
            {
              loading ? <Text>Data is loading...</Text> : <Table columns={columns} dataSource={userData} />
            }
          </Col>

          <Modal title="Update User details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Text>Name: Name</Text> <br />
            <Text>UserId: userid</Text> <br />
            <Text>Hostel: Hostel</Text> <br />
            <Text>Member: Member</Text> <br />

            <table width="100%" cellPadding="5%" border={2}>
              <tr>
                <th>
                  Name of Property
                </th>
                <th>
                  Date of creation
                </th>
                <th>Status</th>
              </tr>

              <tr className='table-tr'>
                <td>Vista</td>
                <td>23/03/2021</td>
                <td>Active</td>
              </tr>
            </table>
        </Modal>
    </Row>
  )
}

export default UserDetails