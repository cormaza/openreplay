import React from 'react';
import { Alert, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from 'App/mstore';

const levelToType: Record<
  string,
  'success' | 'info' | 'warning' | 'error'
> = {
  alert: 'error',
  error: 'error',
  warning: 'warning',
  warn: 'warning',
  info: 'info',
  success: 'success',
};

function AlertsBanner() {
  const { userStore } = useStore();
  const alerts = userStore.account?.alerts;
  if (!alerts?.length) return null;

  return (
    <>
      {alerts.map((alert, idx) => {
        const type = levelToType[alert.level?.toLowerCase() ?? ''] ?? 'info';
        const action =
          alert.button && alert.url ? (
            <Button
              size="small"
              onClick={() =>
                window.open(alert.url, '_blank', 'noopener,noreferrer')
              }
            >
              {alert.button}
            </Button>
          ) : null;
        return (
          <Alert
            key={idx}
            message={alert.text}
            type={type}
            showIcon
            banner
            action={action}
          />
        );
      })}
    </>
  );
}

export default observer(AlertsBanner);
