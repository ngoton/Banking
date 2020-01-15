FROM maven:3.6.0-jdk-11-slim AS MAVEN_BUILD

COPY . /Banking
RUN rm -rf /Banking/banking-ui
WORKDIR /Banking
RUN mvn package

FROM openjdk:11-jdk-slim

RUN mkdir -p /Banking
WORKDIR /Banking
COPY --from=MAVEN_BUILD /Banking/banking-platform/target/banking-platform-0.0.1-SNAPSHOT.jar /Banking

#run the spring boot application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dblabla", "-jar","banking-platform-0.0.1-SNAPSHOT.jar"]