# react-dockerizing/Dockerfile

# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:18-alpine as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app
ENV TZ=Asia/Seoul

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

# 리액트 파일 빌드 시 환경변수가 사라지기 때문에 빌드 단계에서 사용할 환경변수 설정이 필요함 
# ARG REACT_APP_BUCKET_NAME
# ARG REACT_APP_AWS_REGION
# ARG REACT_APP_AWS_ACCESS_KEY_ID
# ARG REACT_APP_AWS_SECRET_ACCESS_KEY
# ARG REACT_APP_BUCKET_NAME

# ENV REACT_APP_BUCKET_NAME $REACT_APP_BUCKET_NAME
# ENV REACT_APP_AWS_REGION $REACT_APP_AWS_REGION
# ENV REACT_APP_AWS_ACCESS_KEY_ID $REACT_APP_AWS_ACCESS_KEY_ID
# ENV REACT_APP_AWS_SECRET_ACCESS_KEY $REACT_APP_AWS_SECRET_ACCESS_KEY
# ENV REACT_APP_BUCKET_NAME $REACT_APP_BUCKET_NAME

# 빌드를 실행합니다.
RUN apk add g++ make py3-pip && npm install && npm run build

# prod environment
# FROM nginx:stable-alpine
# FROM nginx

# # # UTF-8 로케일 설정
# # RUN apt-get update \
# #   && apt-get install -y locales \
# #   && locale-gen ko_KR.UTF-8 \
# #   && apt-get clean

# # ENV LANG=ko_KR.UTF-8 \
# #   LANGUAGE=ko_KR:ko \
# #   LC_ALL=ko_KR.UTF-8

# # 컨테이너의 80번 포트를 열어준다.
# EXPOSE 80

# # 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
# COPY --from=build /app/build /usr/share/nginx/html

# # nginx 설정 파일을 적용한다.
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf.template

# # 복사한 스크립트 파일에 실행 권한을 부여
# COPY docker-entrypoint.sh /

# COPY nginx/nginx.conf /etc/nginx/nginx.conf.template

# COPY docker-entrypoint.sh /

# RUN chmod +x /docker-entrypoint.sh

# RUN chown root:root /docker-entrypoint.sh

# ENTRYPOINT ["/docker-entrypoint.sh"]

# # nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
# CMD ["nginx", "-g", "daemon off;"]



# prod environment
FROM nginx:stable-alpine

# 컨테이너의 80번 포트를 열어준다.
EXPOSE 80

# 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

# nginx 설정 파일을 적용한다.
COPY nginx/nginx.conf /etc/nginx/nginx.conf.template

COPY docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]