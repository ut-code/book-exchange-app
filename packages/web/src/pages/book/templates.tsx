import React from 'react';
import BookTemplateList from './BookTemplateList';
import { AppLayout } from '../../components/Layout';

const BookTemplatesPage: React.FC = () => {
  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: '本の管理', href: '/book' },
    { label: 'テンプレート一覧' },
  ];

  return (
    <AppLayout title="本のテンプレート一覧" breadcrumbs={breadcrumbs} showBackButton>
      <BookTemplateList />
    </AppLayout>
  );
};

export default BookTemplatesPage;