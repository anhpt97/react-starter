import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { Locale, setLanguage } from 'src/store/slices/languageSlice';

const items = [
  {
    key: Locale.EN_US,
    label: <a>🇺🇸 English (US)</a>,
  },
  {
    key: Locale.VI_VN,
    label: <a>🇻🇳 Tiếng Việt</a>,
  },
];

export const LanguageSwitcher = () => {
  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    dispatch(setLanguage(key));
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <a
        onClick={(e) => e.preventDefault()}
        style={{ marginTop: 23, marginRight: 16 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Ic_translate_48px.svg"
          width="18"
          height="18"
        />
      </a>
    </Dropdown>
  );
};
