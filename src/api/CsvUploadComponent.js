import React from 'react';
import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title} = Typography;

const CsvUploadComponent = ({ label, action, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <Upload
        name="csvFile"
        action={action}
        onChange={onChange}
        accept=".csv"
      >
        <Button icon={<UploadOutlined></UploadOutlined>}>Upload {label}</Button>
      </Upload>
    </div>
  );
};

export default CsvUploadComponent;
