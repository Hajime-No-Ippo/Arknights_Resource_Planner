package Server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import org.json.JSONObject;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/calculate", new CalculateHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server is running on http://localhost:8080");
    }

    static class CalculateHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("POST".equals(exchange.getRequestMethod())) {
                try {
                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    JSONObject input = new JSONObject(requestBody);
                    int input1 = input.getInt("input1");
                    int input2 = input.getInt("input2");
                    int input3 = input.getInt("input3");
                    int input4 = input.getInt("input4");

                    int result = Arknights.calculate(input1, input2, input3, input4);

                    JSONObject response = new JSONObject();
                    response.put("result", result);
                    String responseText = response.toString();

                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, responseText.getBytes().length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(responseText.getBytes());
                    }
                } catch (Exception e) {
                    String errorResponse = "{\"error\":\"Invalid request\"}";
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(400, errorResponse.getBytes().length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(errorResponse.getBytes());
                    }
                }
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }
    }
}
