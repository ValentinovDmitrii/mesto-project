export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function renderLoading(button, caption, isLoading) {
  if (isLoading) {
    button.textContent = caption + '...';
  } else {
    button.textContent = caption;
  }
}
