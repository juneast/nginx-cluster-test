# nginx-cluster-test
NodeJS 환경에서 nginx와 cluster를 사용해 성능을 테스트 한다.

1) cluster를 통해 멀티쓰레드 서버를 구현
2) 1)번의 서버를 docker container로 만들어 여러개 동작
3) 사용자 요청에 대해 nginx를 통해 서버에 분산.

## 테스트 목적
 - Node 서버에 Nginx를 사용하는 것이 성능에 도움이 되는지 확인
 - 무거운 cpu 동작이 있는 요청에서 멀티 스레드를 사용하는 것이 얼마나 서버의 성능을 올리는지 확인.
 - 분산 서버에서 대량의 트래픽이 있을 때 어떤 이슈가 발생하는지 확인

## 테스트 가정
 - request 10k에 대해 요청 시작부터 마지막 응답이 돌아올 때까지 시간을 측정.  
 - 각 요청당 10ms의 cpu 연산이 있다고 가정.

## 테스트 변수
 - 클러스터의 스레드 동작 알고리즘 (RR / NONE)
 - 클러스터 내의 스레드 개수
 - Container로 생성한 서버의 개수
 - Nginx의 분산 알고리즘 등 셋팅

## 테스트 내용

### # 1 : Cluster 1개에서 worker 개수로 비교

**CASE1 : worker 1개**  
한 작업당 worker 1개가 한 작업당 10ms 소모하고 10000개의 요청을 받는다면 계산상 10ms*10000이 나와야 한다. 
```
It takes 101443ms
success : 10000 times, error : 0 times
```
거의 정확하다.

**CASE2 : worker 4개**  
10ms*10000 / 4 = 25000ms
```
It takes 26541ms
success : 10000 times, error : 0 times
```
**CASE3 : worker 10개**  
10ms*10000 / 10 = 10000ms, 내 컴퓨터의 `os.cpus().length`가 12이기 때문에 10개면 거의 최대값이다.
```
It takes 11617ms
success : 10000 times, error : 0 times
```

그러나 종종 이런 오류가 난다.
```
Error: connect EADDRINUSE 127.0.0.1:3000
    at TCPConnectWrap.afterConnect [as oncomplete] 
```
이 오류는 포트가 이미 사용중인데 또 연결하려고 하면 난다고 한다.
### # 2 : 


