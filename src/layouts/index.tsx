import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Layout: React.FC = (props) => {
  return <PageHeaderWrapper>{props.children}</PageHeaderWrapper>;
};

export default Layout;
