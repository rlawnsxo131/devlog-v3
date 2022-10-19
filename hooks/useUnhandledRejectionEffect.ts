import { useEffect } from 'react';

export default function useUnhandledRejectionEffect() {
  useEffect(() => {
    window.addEventListener('unhandledrejection', function (event) {
      alert(event.promise); // [object Promise] - 에러를 생성하는 프라미스
      alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
    });
  }, []);
}
