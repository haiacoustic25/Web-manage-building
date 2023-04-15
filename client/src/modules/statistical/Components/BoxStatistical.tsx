import React from 'react';
import { EditFilled } from '@ant-design/icons';

type Props = {
  title: string;
  width?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  style?: any;
};

const BoxStatistical = ({ title, width, icon, children, style }: Props) => {
  return (
    <div className="box-statistical" style={{ width: width ? width : '', ...style }}>
      <div className="title">
        {icon && <div className="title__icon">{icon}</div>}
        <span>{title}</span>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default BoxStatistical;
