export const cvTabsConfig = (id: string, t: (key: string) => string) => {
  const basePath = `/cvs/${id}`;

  return [
    { label: t('details'), value: `${basePath}/details` },
    { label: t('skills'), value: `${basePath}/skills` },
    { label: t('projects'), value: `${basePath}/projects` },
    { label: t('preview'), value: `${basePath}/preview` },
  ];
};
