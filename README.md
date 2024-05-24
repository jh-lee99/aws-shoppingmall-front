# AWS 환경에서 동작하는 리액트 프론트앤드

Cloud9에서 Clone 후 AWS codecommit에 push합니다.

## 필요한 컨테이너 환경변수

쇼핑몰 SHOP_HOST, SHOP_PORT

### 쇼핑몰

**Note: SHOP_HOST: 쇼핑몰 기능을 제공하는 백앤드 컨테이너의 주소를 입력합니다. (ex. myshop)**

**Note: SHOP_PORT: 쇼핑몰 기능을 제공하는 백앤드 컨테이너가 동작하는 포트를 입력합니다. (ex. 3000)**

**Note: REACT_APP_AWS_REGION: aws 리전을 입력합니다. (ex. ap-northeast-2)**

**Note: REACT_APP_AWS_ACCESS_KEY_ID: aws 엑세스 키를 입력합니다. (ex. asjkdnkasjndk)**

**Note: REACT_APP_AWS_SECRET_ACCESS_KEY: aws 시크릿 키를 입력합니다. (ex. jjsaidfbnidbsbdkfjbas)**

**Note: REACT_APP_BUCKET_NAME: 이미지를 가져올 버킷의 이름을 입력합니다. (ex. mybucket)**

### docker build 빌드 명령어 예시

docker build --build-arg REACT_APP_BUCKET_NAME="your-bucket" --build-arg REACT_APP_AWS_REGION="your-region" --build-arg REACT_APP_AWS_ACCESS_KEY_ID="your-access-key" --build-arg REACT_APP_AWS_SECRET_ACCESS_KEY="your-secret-access-key" -t "image-name" . && docker run -itd --network "your-network" -p 80:80 -e SHOP_HOST="your-backend-application" -e SHOP_PORT="your-backend-port" --name "container name" "image-name"

깃허브 주소 [https://github.com/jh-lee99](https://github.com/jh-lee99)
