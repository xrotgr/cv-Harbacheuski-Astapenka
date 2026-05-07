export const getTableColumns = (t: (key: string) => string) =>
  [
    { id: 'name', label: t('name') },
    { id: 'education', label: t('education') },
    { id: 'employee', label: t('employee') },
    { id: 'details', label: '' },
  ] as const;
