import { Avatar } from 'antd';

export const ProfilePicture = ({ user, ...rest }) => {
  return (
    <Avatar
      size="large"
      src={
        user?.avatar ||
        'https://i.scdn.co/image/ab6761610000e5eb03631511dc28630e66ca13cd'
      }
      /* icon={<UserOutlined />} */
      {...rest}
    />
  );
};
