export const getTableColumns = (t: (key: string) => string) =>
  [
    { id: 'name', label: t('name') },
    { id: 'internal_name', label: t('internal_name') },
    { id: 'domain', label: t('domain') },
    { id: 'start_date', label: t('start_date') },
    { id: 'end_date', label: t('end_date') },
  ] as const;
