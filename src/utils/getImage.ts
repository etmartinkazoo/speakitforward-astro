export function getAssetURL(id: string) {
  if (!id) return null;
  return `https://mule-box.directus.app/assets/${id}`;
}
