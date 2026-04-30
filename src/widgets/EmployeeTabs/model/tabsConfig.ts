export const tabsConfig = (id: string) => [
  { label: 'Profile', value: `/employees/${id}/profile` },
  { label: 'Skills', value: `/employees/${id}/skills` },
  { label: 'Languages', value: `/employees/${id}/languages` },
];
