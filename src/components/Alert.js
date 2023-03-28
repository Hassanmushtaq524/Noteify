import React, { useContext } from 'react';
import AlertContext from '../context/AlertContext';

const Alert = () => {
  let { alert } = useContext(AlertContext);
  const capitalize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{ height: '50px' }}>

      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {capitalize(alert.msg)}
      </div>}

    </div>
  )
}

export default Alert;
