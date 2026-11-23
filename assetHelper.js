/**
 * Helper to resolve asset paths reliably across localhost, subdirectories,
 * GitHub Pages, and Render static deployments.
 */
export function resolveAsset(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.replace(/^\.?\//, '');
  return `${cleanBase}${cleanPath}`;
}
