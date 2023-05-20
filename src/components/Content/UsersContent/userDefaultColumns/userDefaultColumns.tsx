import { Tag } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FormattedMessage } from 'react-intl';
import { UserRole, UserStatus } from 'src/enums/user';

export enum UserDataIndex {
  ID = 'id',
  USERNAME = 'username',
  EMAIL = 'email',
  ROLE = 'role',
  STATUS = 'status',
}

export const userDefaultColumns: ColumnType<any>[] = [
  {
    dataIndex: UserDataIndex.USERNAME,
    title: <FormattedMessage id="components.usersContent.username" />,
    sorter: true /* { multiple: 0 } */,
  },
  {
    dataIndex: UserDataIndex.EMAIL,
    title: <FormattedMessage id="components.usersContent.email" />,
    sorter: true /* { multiple: 0 } */,
  },
  {
    dataIndex: UserDataIndex.ROLE,
    title: <FormattedMessage id="components.usersContent.role" />,
    render: (role: UserRole) => {
      switch (role) {
        case UserRole.ADMIN:
          return (
            <Tag color="#f5222d">
              <FormattedMessage id="components.usersContent.role.admin" />
            </Tag>
          );
        case UserRole.USER:
          return (
            <Tag color="#2f54eb">
              <FormattedMessage id="components.usersContent.role.user" />
            </Tag>
          );
      }
    },
    sorter: true /* { multiple: 0 } */,
  },
  {
    dataIndex: UserDataIndex.STATUS,
    title: <FormattedMessage id="components.usersContent.status" />,
    render: (status: UserStatus) => {
      switch (status) {
        case UserStatus.ACTIVE:
          return (
            <Tag color="success">
              <FormattedMessage id="components.usersContent.status.active" />
            </Tag>
          );
        case UserStatus.IS_DISABLED:
          return (
            <Tag color="error">
              <FormattedMessage id="components.usersContent.status.isDisabled" />
            </Tag>
          );
        default:
          return (
            <Tag color="default">
              <FormattedMessage id="components.usersContent.status.notActivated" />
            </Tag>
          );
      }
    },
    sorter: true /* { multiple: 0 } */,
  },
  // {
  //   dataIndex: ['profile', 'avatar'],
  //   title: 'avatar',
  //   sorter: true /* { multiple: 0 } */,
  // },
];
