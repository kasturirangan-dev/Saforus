import { PageShowNotification } from './interface';

export function mockNotification(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        type: 'NOTICE',
        title: 'SaForus 웹서비스 페이지 주소 변경 안내',
        imageSrc: 'https://picsum.photos/900/600',
        description: `고객님, 안녕하세요!
                SaForus입니다.

                SaForus 콘솔 서비스 페이지 주소가 아래와 같이 변경됩니다.
                이전주소 : contents.saforus.com
                변경주소 : cs.saforus.com
                변경일시 : 2000. 00. 00

                기존 주소로 접속은 2000년 00월 0일 까지 이용 가능합니다.
                서비스 이용에 참고 부탁드립니다.
                감사합니다.'`,
        isHideAvailable: true,
        isShowBanner: true,
        setShowOnPage: PageShowNotification.Dashboard,
      };
      // Resolve the promise with the mock data
      const response = {
        mess: 'success',
        notificationData: data,
      };
      resolve(response);
    }, 1000);
  });
}
