FROM openjdk:11-jre-slim
EXPOSE 8089
ADD target/user-management-service-0.0.1-SNAPSHOT.jar user-management-service.jar
ENTRYPOINT ["java", "-jar", "/user-management-service.jar"]

