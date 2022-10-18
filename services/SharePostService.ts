/**
 * @TODO 아래 에러 확인한번 더하기
 * NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
 */

interface SharePostServiceParams {
  title?: string;
  text?: string;
  url?: string;
}

export default class SharePostService {
  private static instance: SharePostService;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  public async excute(
    params: SharePostServiceParams,
    fallbackCallback: () => void,
  ) {
    try {
      await this.shareMobileWithNavigationAPI({
        ...params,
      });
    } catch (e) {
      if (e.toString().includes('AbortError')) {
        console.error('share cancel error: aborted');
        return;
      }
      this.copyToClipBoard(params.url, fallbackCallback);
    }
  }

  private shareMobileWithNavigationAPI({
    title,
    text,
    url,
  }: SharePostServiceParams) {
    return navigator.share({
      title,
      text,
      url,
    });
  }

  private copyToClipBoard(value: string, callback: () => void) {
    try {
      navigator.clipboard.writeText(value).then((_) => {
        callback();
      });
    } catch (e) {
      const input = document.createElement('input');
      input.value = value;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      document.execCommand('Copy');
      document.body.removeChild(input);
      callback();
    }
  }
}
