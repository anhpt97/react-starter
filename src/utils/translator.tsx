import { FormattedMessage } from 'react-intl';
import { UserRole, UserStatus } from 'src/enums/user';

export const getUserRoleLabel = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return <FormattedMessage id="components.usersContent.role.admin" />;
    case UserRole.USER:
      return <FormattedMessage id="components.usersContent.role.user" />;
  }
};

export const getUserStatusLabel = (status: UserStatus) => {
  switch (status) {
    case UserStatus.NOT_ACTIVATED:
      return (
        <FormattedMessage id="components.usersContent.status.notActivated" />
      );
    case UserStatus.ACTIVE:
      return <FormattedMessage id="components.usersContent.status.active" />;
    case UserStatus.IS_DISABLED:
      return (
        <FormattedMessage id="components.usersContent.status.isDisabled" />
      );
  }
};
