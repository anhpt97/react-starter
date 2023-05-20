import { Form, FormInstance, Input, Select } from 'antd';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { UserDataIndex } from 'src/components/Content/UsersContent/userDefaultColumns/userDefaultColumns';
import { Action } from 'src/enums/action';
import { HttpMethod } from 'src/enums/http-method';
import { request } from 'src/utils/request';
import { userRoleOptions, userStatusOptions } from 'src/utils/user';

export const useUserDialog = () => {
  const [dialog, setDialog] = useState({
    visible: false,
    title: null,
    action: '',
    content: null,
    api: { httpMethod: '', path: '' },
  });

  const content = (
    <>
      <Form.Item
        name={UserDataIndex.ID}
        noStyle
        children={<Input type="hidden" />}
      />
      <Form.Item
        name={UserDataIndex.USERNAME}
        label={<FormattedMessage id="components.usersContent.username" />}
        required
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="components.dialog.form.username.isRequired" />
            ),
          },
        ]}
        children={<Input />}
      />
      <Form.Item
        name={UserDataIndex.EMAIL}
        label={<FormattedMessage id="components.usersContent.email" />}
        children={<Input />}
      />
      <Form.Item
        name={UserDataIndex.ROLE}
        label={<FormattedMessage id="components.usersContent.role" />}
        required
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="components.dialog.form.role.isRequired" />
            ),
          },
        ]}
        children={<Select showSearch options={userRoleOptions} />}
      />
      <Form.Item
        name={UserDataIndex.STATUS}
        label={<FormattedMessage id="components.usersContent.status" />}
        required
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="components.dialog.form.status.isRequired" />
            ),
          },
        ]}
        children={<Select showSearch options={userStatusOptions} />}
      />
      {/*
        <Form.Item
          name="createdAt"
          label="createdAt"
          getValueFromEvent={(value) => new Date(value).toISOString()}
          getValueProps={(value) => ({ value: dayjs(value) })}
          children={
            <DatePicker format="DD-MM-YYYY HH:mm:ss" style={{ width: '100%' }} />
          }
        />
      */}
      {/*
        <Form.Item
          name="isChecked"
          label="isChecked"
          valuePropName="checked"
          children={
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          }
        />
      */}
    </>
  );

  const handleShowCreateUserDialog = () => {
    setDialog({
      visible: true,
      title: <FormattedMessage id="components.dialog.title.createUser" />,
      action: Action.CREATE,
      content,
      api: { httpMethod: HttpMethod.POST, path: '/users' },
    });
  };

  const handleShowUpdateUserDialog = async (id: number, form: FormInstance) => {
    const { data } = await request({
      method: HttpMethod.GET,
      url: `/users/${id}`,
    });
    form.setFieldsValue(data?.data);
    setDialog({
      visible: true,
      title: <FormattedMessage id="components.dialog.title.updateUser" />,
      action: Action.UPDATE,
      content,
      api: { httpMethod: HttpMethod.PUT, path: `/users/${id}` },
    });
  };

  const handleShowDeleteUserDialog = (id: number) => {
    setDialog({
      visible: true,
      title: <FormattedMessage id="components.dialog.title.deleteUser" />,
      action: Action.DELETE,
      content: (
        <div style={{ marginBottom: 30 }}>
          <FormattedMessage id="components.dialog.content.deleteUser" />
        </div>
      ),
      api: { httpMethod: HttpMethod.DELETE, path: `/users/${id}` },
    });
  };

  return {
    dialog,
    setDialog,
    handleShowUpdateUserDialog,
    handleShowCreateUserDialog,
    handleShowDeleteUserDialog,
  };
};
