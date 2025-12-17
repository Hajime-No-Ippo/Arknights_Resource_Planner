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
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.createContext("/api/calculate", new CalculateHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server is running on http://localhost:"+ port);
    }

    static class CalculateHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
            
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            
            if (!"POST".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1);
                exchange.close();
                return;
            }

                    String requestBody = new String(exchange.getRequestBody().readAllBytes());
                    System.out.println("Request body: " + requestBody);

                    JSONObject input = new JSONObject(requestBody);

                    int input1 = input.optInt("input1");
                    int input2 = input.optInt("input2");
                    int input3 = input.optInt("input3");
                    int input4 = input.optInt("input4");

                    int result = Arknights.calculate(input1, input2, input3, input4);

                    JSONObject response = new JSONObject();
                    response.put("result", result);
                    byte[] bytes = response.toString().getBytes();

                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, bytes.length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(bytes);
                    }
                    
                } catch (Exception e) {
                    e.printStackTrace();
                    byte[] bytes = "{\"error\":\"Internal Server Error\"}".getBytes();
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(500, bytes.length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(bytes);
                    }
                }finally{
                    exchange.close();
                }
            
        }
    }
}
