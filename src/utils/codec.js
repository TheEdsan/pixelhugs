export function encodeData(data) {
  try {
    const jsonStr = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(jsonStr)));
  } catch (e) {
    console.error("Error encoding data", e);
    return null;
  }
}

export function decodeData(base64str) {
  try {
    const jsonStr = decodeURIComponent(escape(atob(base64str)));
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Error decoding data", e);
    return null;
  }
}
