package Server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


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
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }

            int input1 = 0, input2 = 0, input3 = 0, input4 = 0;

            // 2) GET: 从 query 读
            if ("GET".equals(exchange.getRequestMethod())) {
                Map<String, String> q = parseQuery(exchange.getRequestURI().getRawQuery());
                input1 = parseIntSafe(q.get("input1"));
                input2 = parseIntSafe(q.get("input2"));
                input3 = parseIntSafe(q.get("input3"));
                input4 = parseIntSafe(q.get("input4"));
            }
            else if ("POST".equals(exchange.getRequestMethod())) {
                String requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                JSONObject input = new JSONObject(requestBody);
                input1 = input.optInt("input1");
                input2 = input.optInt("input2");
                input3 = input.optInt("input3");
                input4 = input.optInt("input4");
            }else {
                exchange.sendResponseHeaders(405, -1);
                return;
            }

            int result = Arknights.calculate(input1, input2, input3, input4);
            JSONObject response = new JSONObject();
            response.put("result", result);

            byte[] bytes = response.toString().getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
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

    private static Map<String, String> parseQuery(String query) {
        Map<String, String> map = new HashMap<>();
        if (query == null || query.isEmpty()) return map;

        for (String pair : query.split("&")) {
            int idx = pair.indexOf('=');
            if (idx < 0) continue;
            String key = URLDecoder.decode(pair.substring(0, idx), StandardCharsets.UTF_8);
            String val = URLDecoder.decode(pair.substring(idx + 1), StandardCharsets.UTF_8);
            map.put(key, val);
        }
        return map;
    }

    private static int parseIntSafe(String s) {
        if (s == null || s.isBlank()) return 0;
        try { return Integer.parseInt(s); }
        catch (Exception e) { return 0; }
    }
}