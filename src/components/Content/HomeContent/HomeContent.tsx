import { Alert, message } from 'antd';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

export const HomeContent = () => {
  const { user } = useSelector((state: any) => state.auth);
  const intl = useIntl();

  useEffect(() => {
    if (!user) {
      void message.success({
        content: intl.formatMessage({ id: 'message.loginSuccessful' }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <Alert message="Còn cái nịt!" type="success" showIcon />;
};
