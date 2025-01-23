import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#036BDD',
          fontFamily: 'inherit',
        },
        components: {
          Input: {
            controlHeight: 44,
          },
          InputNumber: {
            controlHeight: 44,
          },
          Select: {
            controlHeight: 44,
          },
          DatePicker: {
            controlHeight: 44,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
