import {
  DownloadOutlined,
  FileOutlined,
  FolderOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Path } from 'src/enums/path';
import { UserRole } from 'src/enums/user';
import { setSelectedKeys } from 'src/store/slices/sidebarMenuSlice';

export enum SidebarMenuKey {
  HOME = 'home',
  USERS = 'users',
  FOLDER = 'folder',
  FILE1 = 'file1',
  FILE2 = 'file2',
  SETTINGS = 'settings',
  DOWNLOADS = 'downloads',
}

const getItem = (
  key: SidebarMenuKey,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: ItemType[]
): ItemType => {
  return {
    key,
    label,
    icon,
    children,
  };
};

const items: (ItemType & { roles?: UserRole[] })[] = [
  getItem(
    SidebarMenuKey.HOME,
    <Link to={Path.HOME}>
      <FormattedMessage id="components.sidebarMenu.home" />
    </Link>,
    <HomeOutlined />
  ),
  {
    ...getItem(
      SidebarMenuKey.USERS,
      <Link to={Path.USERS}>
        <FormattedMessage id="components.sidebarMenu.users" />
      </Link>,
      <TeamOutlined />
    ),
    roles: [UserRole.ADMIN],
  },
  getItem(
    SidebarMenuKey.FOLDER,
    <FormattedMessage id="components.sidebarMenu.folder" />,
    <FolderOutlined />,
    [
      getItem(
        SidebarMenuKey.FILE1,
        <Link to={Path.FILE1}>
          <FormattedMessage id="components.sidebarMenu.folder.file1" />
        </Link>,
        <FileOutlined />
      ),
      getItem(
        SidebarMenuKey.FILE2,
        <Link to={Path.FILE2}>
          <FormattedMessage id="components.sidebarMenu.folder.file2" />
        </Link>,
        <FileOutlined />
      ),
    ]
  ),
  getItem(
    SidebarMenuKey.SETTINGS,
    <Link to={Path.SETTINGS}>
      <FormattedMessage id="components.sidebarMenu.settings" />
    </Link>,
    <SettingOutlined />
  ),
  getItem(
    SidebarMenuKey.DOWNLOADS,
    <Link to={Path.DOWNLOADS}>
      <FormattedMessage id="components.sidebarMenu.downloads" />
    </Link>,
    <DownloadOutlined />
  ),
];

export const SidebarMenu = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { selectedKeys } = useSelector((state: any) => state.sidebarMenu);
  const [openKeys, setOpenKeys] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const key = location.pathname.replace(/\//g, '') as SidebarMenuKey;
    dispatch(setSelectedKeys(key));
    if ([SidebarMenuKey.FILE1, SidebarMenuKey.FILE2].includes(key)) {
      setOpenKeys([SidebarMenuKey.FOLDER]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={items.filter(
        (item) =>
          !item.roles || (item.roles.length && item.roles.includes(user?.role))
      )}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={(openKeys) => {
        setOpenKeys(openKeys);
      }}
      onSelect={({ key }) => {
        dispatch(setSelectedKeys(key));
      }}
    ></Menu>
  );
};
