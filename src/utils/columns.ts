import { ColumnType } from 'antd/es/table';

export const generateColumns = (
  storedColumns: any[],
  defaultColumns: ColumnType<any>[]
) => {
  if (!storedColumns.length) {
    return defaultColumns.map((column) => ({ ...column, visible: true }));
  }
  const columns = [];
  storedColumns.forEach(({ id, visible }) => {
    const column = defaultColumns.find(({ dataIndex }) => dataIndex === id);
    if (column) {
      columns.push({ ...column, visible });
    }
  });
  return columns;
};
