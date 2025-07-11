export const useAsset = () => {
  const storageUrl = import.meta.env.VITE_BE_STORAGE_URL;

  const getStorageUrl = (path) => {
    if (!path) return '';

    if (path.startsWith('http')) return path;

    const cleanPath = path.replace(/^\//, '');

    return `${storageUrl}/${cleanPath}`;
  }

  return {
    getStorageUrl
  }
}
