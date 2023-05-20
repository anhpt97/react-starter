import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, InputRef, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from 'src/components/LanguageSwitcher/LanguageSwitcher';
import { HttpMethod } from 'src/enums/http-method';
import { Path } from 'src/enums/path';
import { setIsAuthenticated } from 'src/store/slices/authSlice';
import { getErrorMessage } from 'src/utils/error';
import { setAccessTokenAndRefreshToken } from 'src/utils/localStorage';
import { request } from 'src/utils/request';
import { delay } from 'src/utils/time';
import './Login.css';

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);
  // const { setIsAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async ({ username, password }) => {
    setErrorMessage('');
    setLoading(true);
    try {
      await delay(1);
      const { data } = await request({
        method: HttpMethod.POST,
        url: Path.LOGIN,
        data: { username, password },
      });
      setAccessTokenAndRefreshToken({
        accessToken: data?.data?.accessToken,
        refreshToken: data?.data?.refreshToken,
      });
      // setIsAuthenticated(true);
      dispatch(setIsAuthenticated(true));
      navigate(Path.HOME);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <>
      <Row justify="end" align="middle" style={{ height: '5%' }}>
        <LanguageSwitcher />
      </Row>
      <Row justify="center" align="middle" style={{ height: '70%' }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="large"
          onFinish={handleSubmit}
        >
          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              style={{
                marginBottom: 24,
              }}
            />
          )}
          <Form.Item
            name="username"
            label={<FormattedMessage id="pages.login.form.username" />}
            required
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id="pages.login.form.username.isRequired" />
                ),
              },
            ]}
            children={
              <Input
                ref={inputRef}
                prefix={<UserOutlined />}
                onPressEnter={() => handleSubmit}
              />
            }
          />
          <Form.Item
            name="password"
            label={<FormattedMessage id="pages.login.form.password" />}
            required
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage id="pages.login.form.password.isRequired" />
                ),
              },
            ]}
            children={
              <Input.Password
                prefix={<LockOutlined />}
                onPressEnter={() => handleSubmit}
              />
            }
          />
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            style={{ width: '100%' }}
          >
            <FormattedMessage id="pages.login.button.login" />
          </Button>
        </Form>
      </Row>
    </>
  );
};
