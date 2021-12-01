import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = '嗨客精灵前端技术部出品';
  const currentYear = new Date().getFullYear();
  return <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} links={[]} />;
};
