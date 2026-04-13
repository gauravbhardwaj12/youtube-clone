export const extractVideoId = (url) => {
  const regex = /(?:v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};