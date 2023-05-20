import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import { request } from 'src/utils/request';

export const DownloadsContent = () => {
  const handlePreview = async () => {
    const { data, headers } = await request({
      url: '/users/preview',
      responseType: 'arraybuffer',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(
      new Blob([data], { type: headers['content-type'] })
    );
    link.click();
  };

  const handleDownload = async () => {
    const { data, headers } = await request({
      url: '/users/download',
      responseType: 'arraybuffer',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(
      new Blob([data], { type: headers['content-type'] })
    );
    link.download = headers['content-disposition']?.split('filename=')[1];
    link.click();
  };

  return (
    <Row justify="center">
      <Card style={{ width: 480 }}>
        <Row justify="center" align="middle" style={{ textAlign: 'center' }}>
          <Col span={8}>
            <FormattedMessage id="components.downloadsContent.userList" />
          </Col>
          <Col span={8}>
            <Button type="link" onClick={handlePreview}>
              <FormattedMessage id="components.downloadsContent.button.preview" />
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              style={{ width: 100 }}
            />
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
