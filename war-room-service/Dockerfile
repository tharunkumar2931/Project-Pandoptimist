FROM openjdk:11-jre-slim
ADD target/war-room-service-0.0.1-SNAPSHOT.jar warroom-spring-boot.jar
EXPOSE 9095
ENTRYPOINT ["java","-jar","warroom-spring-boot.jar"]