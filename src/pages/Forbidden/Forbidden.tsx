import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Path } from 'src/enums/path';

export const Forbidden = () => (
  <Result
    status="403"
    title="403"
    // subTitle="Sorry, you are not authorized to access this page."
    subTitle={<FormattedMessage id="pages.forbidden.subTitle" />}
    extra={
      <Button type="primary" href={Path.HOME}>
        <FormattedMessage id="pages.forbidden.button.backToHome" />
      </Button>
    }
  />
);
