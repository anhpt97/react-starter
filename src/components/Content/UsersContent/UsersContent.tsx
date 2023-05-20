import { Form, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from 'src/components/DataGrid/DataGrid';
import { Dialog } from 'src/components/Dialog/Dialog';
import { SearchFilter } from 'src/components/Filters/SearchFilter/SearchFilter';
import { SelectFilter } from 'src/components/Filters/SelectFilter/SelectFilter';
import { HttpMethod } from 'src/enums/http-method';
import { useUserDialog } from 'src/hooks/useUserDialog';
import { generateColumns } from 'src/utils/columns';
import { getErrorMessage } from 'src/utils/error';
import { getUserColumns, setUserColumns } from 'src/utils/localStorage';
import { request } from 'src/utils/request';
import { delay } from 'src/utils/time';
import { userRoleOptions, userStatusOptions } from 'src/utils/user';
import {
  UserDataIndex,
  userDefaultColumns,
} from './userDefaultColumns/userDefaultColumns';

export const UsersContent = () => {
  const {
    dialog,
    setDialog,
    handleShowUpdateUserDialog,
    handleShowCreateUserDialog,
    handleShowDeleteUserDialog,
  } = useUserDialog();
  const [form] = Form.useForm();
  const columns = generateColumns(getUserColumns(), userDefaultColumns);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { limit } = useSelector((state: any) => state.pagination);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState();
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();

  const fetchData = useCallback(() => {
    setLoading(true);
    void (async () => {
      try {
        await delay(1);
        const { data } = await request({
          method: HttpMethod.GET,
          url: '/users',
          params: {
            limit,
            page,
            keyword,
            filter,
            sort,
          },
        });
        setItems(
          data?.data?.items.map((item: any) => ({ key: item.id, ...item }))
        );
        setTotal(data?.data?.total);
      } catch (error) {
        void message.error({
          content: getErrorMessage(error),
        });
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, keyword, limit, page, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  for (const column of columns) {
    const { dataIndex } = column;
    switch (dataIndex) {
      case UserDataIndex.USERNAME:
      case UserDataIndex.EMAIL:
        column.filterDropdown = ({ setSelectedKeys, confirm }) => (
          <SearchFilter
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            dataIndex={dataIndex}
            filter={filter}
            setFilter={setFilter}
            fetchData={fetchData}
          />
        );
        break;
      case UserDataIndex.ROLE:
        column.filterDropdown = ({ setSelectedKeys, confirm }) => (
          <SelectFilter
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            dataIndex={dataIndex}
            filter={filter}
            setFilter={setFilter}
            fetchData={fetchData}
            // api={{ path: '/users/roles', paramKey: 'keyword' }}
            options={userRoleOptions}
          />
        );
        break;
      case UserDataIndex.STATUS:
        column.filterDropdown = ({ setSelectedKeys, confirm }) => (
          <SelectFilter
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            dataIndex={dataIndex}
            filter={filter}
            setFilter={setFilter}
            fetchData={fetchData}
            // api={{ path: '/users/statuses', paramKey: 'keyword' }}
            options={userStatusOptions}
          />
        );
        break;
    }
  }

  return (
    <>
      <Dialog
        open={dialog.visible}
        setDialog={setDialog}
        title={dialog.title}
        action={dialog.action}
        form={form}
        content={dialog.content}
        api={dialog.api}
        fetchData={fetchData}
      />
      <DataGrid
        columns={columns}
        setColumns={setUserColumns}
        loading={loading}
        hasActions={true}
        items={items}
        total={total}
        limit={limit}
        page={page}
        setPage={setPage}
        keyword={keyword}
        setKeyword={setKeyword}
        setSort={setSort}
        fetchData={fetchData}
        handleShowUpdateDialog={handleShowUpdateUserDialog}
        handleShowCreateDialog={handleShowCreateUserDialog}
        handleShowDeleteDialog={handleShowDeleteUserDialog}
        form={form}
      />
    </>
  );
};
