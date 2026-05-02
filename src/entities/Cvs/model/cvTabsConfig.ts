export const cvTabsConfig = (id: string) => {
  const basePath = `/cvs/${id}`;

  return [
    { label: 'Details', value: `${basePath}/details` },
    { label: 'Skills', value: `${basePath}/skills` },
    { label: 'Projects', value: `${basePath}/projects` },
    { label: 'Preview', value: `${basePath}/preview` },
  ];
};
