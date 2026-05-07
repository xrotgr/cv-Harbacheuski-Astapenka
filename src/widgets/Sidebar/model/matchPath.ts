export const isPathMatch = (pathname: string, path: string) => {
  const normalized = pathname.replace(/^\/[a-zA-Z-]{2,5}(?=\/)/, '');

  return normalized === path || normalized.startsWith(`${path}/`);
};
