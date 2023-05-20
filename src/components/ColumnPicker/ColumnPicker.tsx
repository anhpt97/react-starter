import { DownSquareOutlined } from '@ant-design/icons';
import { Checkbox, Col, Popover, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';

export const ColumnPicker = ({ columns, setColumns, fetchData }) => {
  const [value, setValue] = useState(
    columns.flatMap(({ dataIndex, visible }) => (visible ? dataIndex : []))
  );

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);
    setColumns(
      columns.map(({ dataIndex }) => ({
        id: dataIndex,
        visible: checkedValues.includes(dataIndex),
      }))
    );
    fetchData();
  };

  return (
    <Popover
      placement="bottomRight"
      content={
        <Checkbox.Group onChange={onChange} value={value}>
          <Row>
            {columns.map(({ dataIndex, title }, i: number) => (
              <Col key={i} span={8} style={{ padding: 4 }}>
                <Checkbox value={dataIndex} style={{ width: 120 }}>
                  {title}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      }
      trigger="click"
    >
      <Row justify="end" align="middle">
        <a
          onClick={(e) => e.preventDefault()}
          style={{ marginBottom: 10, marginLeft: 12 }}
        >
          <DownSquareOutlined style={{ fontSize: 20 }} />
        </a>
      </Row>
    </Popover>
  );
};
