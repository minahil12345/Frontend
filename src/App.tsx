import React, { useState } from 'react';
import { Layout, Menu, Upload, Button, Typography, Space, Card, message, Row, Col } from 'antd';
import { LogoutOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { URL } from 'url';
import { url } from 'inspector';
import './index.css';
import type { UploadProps } from 'antd';

// import CsvUploadComponent from 'C:/Users/Computer/antd-demo/src/api/CsvUploadComponent'; 
// import UploadAction from 'C:/Users/Computer/antd-demo/src/api/server';
// import MapContainer from 'C:/Users/Computer/antd-demo/src/api/mapContainer'; 
const { Header, Content } = Layout;
const { Title, Text} = Typography;

const App = () => {
  const [selectedOption, setSelectedOption] = useState('home');
  const [fileUploadStatus] = useState('');
  const [file, setfile] = useState(null);
  //, setFileUploadStatus


  const handleMenuClick = (option:any) => {
    setSelectedOption(option);
  };

  const handleUploadChange = (info:any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed`);
    }
  };

  const props: UploadProps = {
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    accept: ".csv",
    onChange: handleUploadChange,
    defaultFileList: [
      {
        uid: '1',
        name: 'Riders.csv',
        status: 'done',
        url: 'C:/Users/Computer/send/antd-demo/sampleInputData.csv',
        
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Header style={{ alignItems: 'center', justifyContent: 'space-between', background: 'black'}}>
        <Row justify="space-between">
          <Col span={4}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="../images/ROUTE OPTIMA.png" alt="RouteOptima Logo" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
              <div>
                <Title level={5} style={{ color: 'white', margin: 0, fontSize: 20, fontWeight: 'bold'}}>Route</Title>
                <Title level={5} style={{ color: 'white', margin: 0, fontSize: 20, fontWeight: 'bold'}}>Optima</Title>
              </div>
            </div>
          </Col>
          <Col span={12}>
          <div className= "Options">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedOption]}
            onClick={({ key }) => handleMenuClick(key)}
            style={{ background: 'black' }} // Set the background color to black
          >
            <Menu.Item key="home" style={{ color: 'white' }}>Home</Menu.Item> {/* Set the text color to white */}
            <Menu.Item key="optimize" style={{ color: 'white' }}>Optimize Route</Menu.Item> {/* Set the text color to white */}
            <Menu.Item key="track" style={{ color: 'white' }}>Track Route</Menu.Item> {/* Set the text color to white */}
            <Menu.Item key="alerts" style={{ color: 'white' }}>Alerts</Menu.Item> {/* Set the text color to white */}
            <Menu.Item key="register" style={{ color: 'white' }}>Register Riders</Menu.Item> {/* Set the text color to white */}
            <Menu.Item key="logout">
            <Button type="primary" icon={<LogoutOutlined></LogoutOutlined>} onClick={handleLogout}>
              Logout
            </Button>
            </Menu.Item>
          </Menu>
          </div>
          </Col>
        </Row>
      </Header>
      
      <Content >
        {selectedOption === 'home' ? (
          // Home page content
          <Title level={2}>Welcome to RouteOptima!</Title>
        ) : selectedOption === 'optimize' ? 
        (
          // Optimize Route page content
          <div style={{ padding: '20px',backgroundSize: 'cover' }}>
            <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
              <Col span={12}>
                <div className="optimize-container">
                  <Card
                  bordered={false}
                  style={{ borderRadius: '35px', padding: '10px' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                      <Title level={2} style={{ color: 'black',fontWeight: 'bold', marginTop: '5px' }}>
                      Optimize Route
                      </Title>
                      <Space direction="vertical" style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                          <Title level={4} style={{ margin: 0, marginRight: '100px' }}>Insert Riders File</Title>
                          <Upload {...props}>
                            <Button icon={<UploadOutlined></UploadOutlined>}>Upload Riders</Button>
                          </Upload>
                        </div>
                        <Space direction="vertical" style={{ marginTop: '20px' }}>
                        <Button type="primary" style={{ width: '100%', padding: '0 170px' }}>
                          <Text style={{ color: 'black',fontSize: 16, fontWeight: 'bold' }}>
                            Optimize Routes
                          </Text>
                        </Button>
                        </Space>
                      </Space>
                      <div>{fileUploadStatus}</div>
                    </div> 
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          // Other pages can be similarly structured
          <Title level={2}>Under Construction</Title>
        )
        }
      </Content>
    </Layout>
  );
};

const handleLogout = () => {
  // Implement the logic for logging out here
};

export default App;
