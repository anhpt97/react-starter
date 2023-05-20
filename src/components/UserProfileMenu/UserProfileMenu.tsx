import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Path } from 'src/enums/path';
import { setSelectedKeys } from 'src/store/slices/sidebarMenuSlice';
import { removeAccessTokenAndRefreshToken } from 'src/utils/localStorage';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { SidebarMenuKey } from '../SidebarMenu/SidebarMenu';

enum UserProfileMenuKey {
  PROFILE = 'profile',
  LOGOUT = 'logout',
}

const items = [
  {
    key: UserProfileMenuKey.PROFILE,
    icon: <SettingOutlined />,
    label: <FormattedMessage id="components.sidebarMenu.settings" />,
  },
  {
    key: UserProfileMenuKey.LOGOUT,
    icon: <LogoutOutlined />,
    label: <FormattedMessage id="components.avatarDropdown.logout" />,
  },
];

export const UserProfileMenu = () => {
  // const { user } = useContext(AuthContext);
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    switch (key) {
      case UserProfileMenuKey.PROFILE:
        navigate(Path.SETTINGS);
        dispatch(setSelectedKeys([SidebarMenuKey.SETTINGS]));
        break;
      case UserProfileMenuKey.LOGOUT:
        removeAccessTokenAndRefreshToken();
        location.reload();
        break;
    }
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <a
        onClick={(e) => e.preventDefault()}
        style={{ margin: '13px 16px 13px 24px' }}
      >
        <ProfilePicture user={user} style={{ marginRight: 8 }} />
        {user?.username}
      </a>
    </Dropdown>
  );
};
