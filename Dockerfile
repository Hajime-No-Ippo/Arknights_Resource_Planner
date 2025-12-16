# Backend Dockerfile: build and run the Java server

FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY Server /app/Server
WORKDIR /app/Server
# Build backend, skip tests, and copy dependencies for runtime
RUN mvn -DskipTests clean package dependency:copy-dependencies

FROM eclipse-temurin:17-jre
WORKDIR /app/Server
COPY --from=build /app/Server/target/classes ./target/classes
COPY --from=build /app/Server/target/dependency ./target/dependency
COPY --from=build /app/Server/target/Arknights_Calculator-1.0-SNAPSHOT.jar ./target/Arknights_Calculator-1.0-SNAPSHOT.jar

ENV PORT=8000
EXPOSE 8000

CMD ["java", "-cp", "target/classes:target/dependency/*:target/Arknights_Calculator-1.0-SNAPSHOT.jar", "Server.Main"]
