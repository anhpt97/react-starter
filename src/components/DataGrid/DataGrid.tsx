import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Pagination, Row, Spin, Table } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import DragListView from 'react-drag-listview';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { DEFAULT_LIMIT } from 'src/constants/pagination';
import { setLimit } from 'src/store/slices/paginationSlice';
import { ColumnPicker } from '../ColumnPicker/ColumnPicker';
import './DataGrid.css';

const { Search } = Input;

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DataGrid = ({
  hasActions = false,
  handleShowUpdateDialog = null,
  handleShowCreateDialog = null,
  handleShowDeleteDialog = null,
  form,
  columns,
  setColumns,
  loading,
  items,
  total,
  limit,
  page,
  setPage,
  keyword,
  setKeyword,
  setSort,
  fetchData,
}) => {
  const filteredColumns = columns.filter(({ visible }) => visible);
  const [value, setValue] = useState(limit);
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    if (value === keyword) {
      fetchData();
    } else {
      setKeyword(value);
    }
  };

  const handleDragTable = (fromIndex: number, toIndex: number) => {
    if (filteredColumns[fromIndex] && filteredColumns[toIndex]) {
      const firstColumnIndex = columns.findIndex(
        ({ dataIndex }) => dataIndex === filteredColumns[fromIndex].dataIndex
      );
      const secondColumnIndex = columns.findIndex(
        ({ dataIndex }) => dataIndex === filteredColumns[toIndex].dataIndex
      );
      const temp = columns[firstColumnIndex];
      columns[firstColumnIndex] = columns[secondColumnIndex];
      columns[secondColumnIndex] = temp;
      setColumns(
        columns.map(({ dataIndex, visible }) => ({
          id: dataIndex,
          visible,
        }))
      );
      fetchData();
    }
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    if (!Array.isArray(sorter)) {
      setSort(
        JSON.stringify(
          sorter.order
            ? {
                by: sorter.field,
                direction:
                  sorter.order === 'ascend'
                    ? SortDirection.ASC
                    : SortDirection.DESC,
              }
            : undefined
        )
      );
    }
  };

  const handleChangeLimit = (value: any) => {
    value = value || DEFAULT_LIMIT;
    setValue(value);
    if (value === limit) {
      fetchData();
    } else {
      dispatch(setLimit(value));
    }
  };

  const actionColumn = {
    title: <FormattedMessage id="components.dataGrid.action" />,
    width: 180,
    fixed: 'right',
    render: ({ id }) => {
      return (
        <>
          <Button type="link" onClick={() => handleShowUpdateDialog(id, form)}>
            <FormattedMessage id="components.dataGrid.button.edit" />
          </Button>
          <Button type="link" danger onClick={() => handleShowDeleteDialog(id)}>
            <FormattedMessage id="components.dataGrid.button.remove" />
          </Button>
        </>
      );
    },
  };

  return (
    <>
      <Row justify="end">
        <Search
          allowClear
          onChange={({ target }) => {
            if (!target.value) {
              setKeyword();
            }
          }}
          onSearch={handleSearch}
          enterButton={
            <Button type="primary">
              <SearchOutlined />{' '}
              <FormattedMessage id="components.dataGrid.button.search" />
            </Button>
          }
          style={{ marginBottom: 12, width: 450 }}
        />
        {hasActions && (
          <Button
            type="primary"
            style={{ marginBottom: 12, marginLeft: 12 }}
            onClick={handleShowCreateDialog}
          >
            <PlusOutlined />{' '}
            <FormattedMessage id="components.dataGrid.button.add" />
          </Button>
        )}
        <ColumnPicker
          columns={columns}
          setColumns={setColumns}
          fetchData={fetchData}
        />
      </Row>
      <Spin
        spinning={loading}
        size="large"
        tip={<FormattedMessage id="components.dataGrid.loading" />}
      >
        <DragListView.DragColumn onDragEnd={handleDragTable} nodeSelector="th">
          <Table
            bordered
            columns={
              hasActions ? [...filteredColumns, actionColumn] : filteredColumns
            }
            dataSource={items}
            pagination={false}
            showSorterTooltip={false}
            onChange={handleTableChange}
            scroll={{ x: 1024, y: 576 }}
          />
        </DragListView.DragColumn>
        <Row style={{ marginTop: 24 }}>
          <Col lg={6} />
          <Col
            xs={24}
            sm={10}
            lg={9}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <Pagination
              current={page}
              total={total}
              onChange={(page: number) => {
                setPage(page);
              }}
            />
          </Col>
          <Col
            xs={24}
            sm={14}
            lg={9}
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <div style={{ marginTop: 8, marginRight: 8 }}>
              <FormattedMessage id="components.dataGrid.rows" />
            </div>
            <Search
              type="number"
              value={value}
              onChange={({ target }) => {
                setValue(target.value);
              }}
              onSearch={handleChangeLimit}
              enterButton={
                <Button style={{ color: 'black' }}>
                  <FormattedMessage id="components.dataGrid.show" />
                </Button>
              }
              style={{ width: 170 }}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
