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
    try {
      const _ = await navigator.clipboard.writeText(value);
      callback();
    } catch (_) {
      const input = document.createElement('input');
      input.value = value;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      document.execCommand('Copy');
      document.body.removeChild(input);
      callback();
    }
  } catch (err) {
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
    try {
      await copyToClipBoard(params.url, fallbackCallback);
    } catch (err) {
      throw err;
    }
  }
}
