# Backend Dockerfile: build and run the Java server

FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app/Server

COPY Server/pom.xml .
COPY Server/src ./src

RUN mvn -B -DskipTests dependency:go-offline
# Build backend, skip tests, and copy dependencies for runtime
RUN mvn -DskipTests clean package dependency:copy-dependencies

FROM eclipse-temurin:17-jre
WORKDIR /app/Server

# Copy compiled jar and dependencies
COPY --from=build /app/Server/target/Arknights_Calculator-1.0-SNAPSHOT.jar ./app.jar
COPY --from=build /app/Server/target/dependency ./dependency

ENV PORT=8000
EXPOSE 8000

# Use classpath so external dependencies are available
CMD ["java", "-cp", "app.jar:dependency/*", "Server.Main"]
