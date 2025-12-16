<<<<<<< HEAD
# Backend Dockerfile: build and run the Java server

=======
# Build stage
>>>>>>> 3d20e5b (import docker deployment)
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY Server /app/Server
WORKDIR /app/Server
<<<<<<< HEAD
# Build backend, skip tests, and copy dependencies for runtime
RUN mvn -DskipTests clean package dependency:copy-dependencies

FROM eclipse-temurin:17-jre
WORKDIR /app/Server
COPY --from=build /app/Server/target/classes ./target/classes
COPY --from=build /app/Server/target/dependency ./target/dependency
COPY --from=build /app/Server/target/Arknights_Calculator-1.0-SNAPSHOT.jar ./target/Arknights_Calculator-1.0-SNAPSHOT.jar
=======
RUN mvn -DskipTests clean package dependency:copy-dependencies

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app/Server
COPY --from=build /app/Server/target/classes /app/Server/target/classes
COPY --from=build /app/Server/target/dependency /app/Server/target/dependency
COPY --from=build /app/Server/target/Arknights_Calculator-1.0-SNAPSHOT.jar /app/Server/target/Arknights_Calculator-1.0-SNAPSHOT.jar
>>>>>>> 3d20e5b (import docker deployment)

ENV PORT=8000
EXPOSE 8000

CMD ["java", "-cp", "target/classes:target/dependency/*:target/Arknights_Calculator-1.0-SNAPSHOT.jar", "Server.Main"]
