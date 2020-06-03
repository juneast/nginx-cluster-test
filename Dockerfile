FROM node:carbon
MAINTAINER DONGJUN LIM dlaehd1994@naver.com


#app 폴더 만들기 - NodeJs 어플리케이션 폴더
RUN mkdir -p /app
#winston 등을 사용할땐 log 폴더도 생성

#어플리케이션 폴더를 Workdir로 지정 - 서버가 동용
WORKDIR /app


#서버 파일 복사 ADD [어플리케이션파일 위치] [컨테이너내부의 어플리케이션 파일위치]
ADD ./ /app

#패키지파일들 받기
RUN npm install

#배포버전으로 설정 - 이 설정으로 환경을 나눌 수 있다
ENV NODE_ENV=production

#서버실행
CMD node app.js