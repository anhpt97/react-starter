import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Path } from 'src/enums/path';

export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle={<FormattedMessage id="pages.notFound.subTitle" />}
    extra={
      <Button type="primary" href={Path.HOME}>
        <FormattedMessage id="pages.notFound.button.backToHome" />
      </Button>
    }
  />
);
