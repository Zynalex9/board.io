export const isActiveLink = (href: string, currentPath: string) => {
  return href === currentPath;
}