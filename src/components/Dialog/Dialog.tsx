import { Button, Col, Form, Modal, Row, message } from 'antd';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Action } from 'src/enums/action';
import { getErrorMessage } from 'src/utils/error';
import { request } from 'src/utils/request';
import { delay } from 'src/utils/time';

export const Dialog = ({
  open,
  setDialog,
  title,
  action,
  form,
  content,
  api = { httpMethod: '', path: '' },
  fetchData,
}) => {
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const handleSubmit = (values: any) => {
    setLoading(true);
    void (async () => {
      try {
        await delay(1);
        await request({
          method: api.httpMethod,
          url: api.path,
          data: values,
        });
        handleCancel();
        void message.success({
          content: intl.formatMessage({ id: 'message.success' }),
        });
        fetchData();
      } catch (error) {
        void message.error({
          content: getErrorMessage(error),
        });
      }
      setLoading(false);
    })();
  };

  const handleCancel = () => {
    setDialog({ visible: false });
  };

  return (
    <Modal
      open={open}
      title={<div style={{ marginBottom: 30 }}>{title}</div>}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          <FormattedMessage id="components.dialog.button.cancel" />
        </Button>,
        <Button
          key="ok"
          type="primary"
          loading={loading}
          htmlType="submit"
          form={action}
        >
          <FormattedMessage id="components.dialog.button.ok" />
        </Button>,
      ]}
      width={640}
    >
      <Row justify="center">
        <Col sm={18}>
          <Form
            id={Action.CREATE}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}
            hidden={action !== Action.CREATE}
            children={content}
          />
          <Form
            id={Action.UPDATE}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}
            hidden={action !== Action.UPDATE}
            children={content}
          />
        </Col>
        <Col sm={5} />
      </Row>
      <Form
        id={Action.DELETE}
        onFinish={handleSubmit}
        hidden={action !== Action.DELETE}
        children={content}
      />
    </Modal>
  );
};
