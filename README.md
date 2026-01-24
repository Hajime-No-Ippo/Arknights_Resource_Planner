
# Arknights Resource Calculator

A minimal Java maven backend + React (Vite) frontend to calculate pull expectations from your resources. This project aim to help players to calculate their resouces to enhance their game experience.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/erictao)

### Main Page
![alt text](/readmepic/image.png)
The main page can intake 4 inputs, this was mapping to the 4 types of game resources in Arknights.

## Quick start

```bash
git clone https://github.com/your-username/arknights-resource-evaluator.git
cd arknights-resource-evaluator
```

Install deps (frontend uses pnpm; npm works too):
```bash
cd Arknights_Resource_Calculator
pnpm install
# backend has no extra install; Maven will download dependencies on first run
```

Run both (frontend + backend) from the frontend folder:
```bash
pnpm run dev:all
```
Frontend will print a local URL (e.g., http://localhost:5173/ or 5174).
Backend listens on http://localhost:8080/calculate.

Run individually:
```bash
# backend only
cd Server
mvn exec:java -Dexec.mainClass=Server.Main

# frontend only
cd Arknights_Resource_Calculator
pnpm run dev
```

Build production frontend:
```bash
cd Arknights_Resource_Calculator
pnpm run build
```

## Project layout
```
Server/                      # Java backend (HttpServer)
  src/main/java/Server       # Main + Arknights calculator
  src/test/java/Server       # JUnit tests
Arknights_Resource_Calculator/ # React + Vite frontend
```

## Testing
- Backend: `cd Server && mvn test`
- Frontend: add tests under `Arknights_Resource_Calculator/test` 

## Disclaimer
This Project is NOT affiliated with Hypergryph or Yostar, it is open resouce and welcome to any contrbutions.

## New Patch
Enhance the COR methods, reduce preflight from service dom to frontend, enabled simple signals, for better user experience.