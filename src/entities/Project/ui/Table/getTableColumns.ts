export const getTableColumns = (t: (key: string) => string) =>
  [
    { id: 'name', label: t('name') },
    { id: 'domain', label: t('domain') },
    { id: 'start_date', label: t('startDate') },
    { id: 'end_date', label: t('endDate') },
  ] as const;
