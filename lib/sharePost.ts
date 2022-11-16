interface SharePostParams {
  title?: string;
  text?: string;
  url?: string;
}

function shareMobileWithNavigationAPI({ title, text, url }: SharePostParams) {
  return navigator.share({
    title,
    text,
    url,
  });
}

async function copyToClipBoard(value: string, callback: () => void) {
  try {
    await window.navigator.clipboard.writeText(value);
    callback();
  } catch (err) {
    if (err instanceof TypeError) {
      const input = document.createElement('input');
      input.value = value;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      document.execCommand('Copy');
      document.body.removeChild(input);
      callback();
      return;
    }
    throw err;
  }
}

export default async function sharePost(
  params: SharePostParams,
  fallbackCallback: () => void,
) {
  try {
    await shareMobileWithNavigationAPI({
      ...params,
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('share cancel error: AbortError');
      return;
    }
    return copyToClipBoard(params.url, fallbackCallback);
  }
}
