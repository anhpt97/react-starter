import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Row, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ProfilePicture } from 'src/components/ProfilePicture/ProfilePicture';
import { FilenameExtension } from 'src/enums/filename-extension';
import { HttpMethod } from 'src/enums/http-method';
import { getErrorMessage } from 'src/utils/error';
import { request } from 'src/utils/request';
import { delay } from 'src/utils/time';

export const SettingsContent = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const intl = useIntl();

  const handleUpload = async () => {
    if (!fileList.length) {
      void message.error({
        content: intl.formatMessage({
          id: 'components.settingsContent.errorMessage.noFileChosen',
        }),
      });
      return;
    }
    setUploading(true);
    try {
      await delay(1);
      const formData = new FormData();
      formData.append('file', fileList[0]);
      await request({
        method: HttpMethod.POST,
        url: '/file/upload',
        data: formData,
      });
      setFileList([]);
      void message.success({
        content: intl.formatMessage({
          id: 'message.uploadSuccessful',
        }),
      });
    } catch (error) {
      void message.error({ content: getErrorMessage(error) });
    }
    setUploading(false);
  };

  const props: UploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Row justify="center">
      <Card
        style={{ textAlign: 'center', width: 480 }}
        title={
          <>
            <ProfilePicture
              user={user}
              style={{
                marginBottom: 16,
                marginTop: 24,
                height: 100,
                width: 100,
              }}
            />
            <div
              style={{ fontSize: 20, fontWeight: 'normal', marginBottom: 20 }}
            >
              {user.username}
            </div>
          </>
        }
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="large"
          onFinish={handleUpload}
        >
          <Form.Item
            name="file"
            label={
              <FormattedMessage id="components.settingsContent.attachment" />
            }
            children={
              <Upload
                accept={Object.values(FilenameExtension).join(',')}
                {...props}
              >
                <Button icon={<UploadOutlined />} style={{ width: 100 }} />
              </Upload>
            }
          />
          <Button
            type="primary"
            loading={uploading}
            htmlType="submit"
            style={{ width: 120 }}
          >
            <FormattedMessage id="components.settingsContent.button.upload" />
          </Button>
        </Form>
      </Card>
    </Row>
  );
};
