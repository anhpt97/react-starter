import { Input } from 'antd';

const { Search } = Input;

export const SearchFilter = ({
  setSelectedKeys,
  confirm,
  filter,
  setFilter,
  dataIndex,
  fetchData,
}) => {
  try {
    filter = JSON.parse(filter);
  } catch (error) {
    filter = {};
  }

  return (
    <div
      style={{ width: 200, padding: 8 }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Search
        allowClear
        onSearch={(value) => {
          setSelectedKeys(value);
          confirm(/* { closeDropdown: false } */);
          if (value && filter[dataIndex] && value === filter[dataIndex]) {
            fetchData();
          } else {
            setFilter(
              JSON.stringify({ ...filter, [dataIndex]: value || undefined })
            );
          }
        }}
      />
    </div>
  );
};
