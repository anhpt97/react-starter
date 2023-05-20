import { Select, Spin, message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { HttpMethod } from 'src/enums/http-method';
import { getErrorMessage } from 'src/utils/error';
import { request } from 'src/utils/request';
import { delay } from 'src/utils/time';

export const SelectFilter = ({
  setSelectedKeys,
  confirm,
  filter,
  setFilter,
  dataIndex,
  fetchData,
  api = { path: '', paramKey: '' },
  options: _options = [],
}) => {
  const [fetching, setFetching] = useState(false);
  const [value, setValue] = useState();
  const [options, setOptions] = useState(_options);

  useEffect(() => {
    if (api.path) {
      if (value) {
        setFetching(true);
      }
      void (async () => {
        try {
          await delay(1);
          const { data } = await request({
            method: HttpMethod.GET,
            url: api.path,
            params: {
              [api.paramKey]: value,
            },
          });
          setOptions(
            data?.data.map(
              (value: any) => ({ label: value, value } as DefaultOptionType)
            )
          );
        } catch (error) {
          void message.error({
            content: getErrorMessage(error),
          });
        }
        setFetching(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
      <Select
        allowClear
        notFoundContent={fetching ? <Spin size="small" /> : undefined}
        showSearch
        onClear={() => {
          setSelectedKeys();
          confirm(/* { closeDropdown: false } */);
          setFilter(
            JSON.stringify({
              ...filter,
              [dataIndex]: undefined,
            })
          );
        }}
        onSearch={(value: any) => setValue(value)}
        onSelect={(value) => {
          setSelectedKeys(value);
          confirm(/* { closeDropdown: false } */);
          if (value === filter[dataIndex]) {
            fetchData();
          } else {
            setFilter(JSON.stringify({ ...filter, [dataIndex]: value }));
          }
        }}
        options={options}
        style={{ width: '100%' }}
      />
    </div>
  );
};
