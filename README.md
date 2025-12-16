# Arknights Resource Calculator

A lightweight tool for evaluating and planning **resource consumption and efficiency** in *Arknights*, designed to help players make informed decisions about operator upgrades, materials farming, and long-term progression.

---

## 🎯 Intended Audience

* Arknights players who want **better planning tools**
* Developers interested in **game data analysis**
* Students practicing **clean code, data modeling, and evaluation logic**

---

## ⚠️ Disclaimer

This project:

* Is **not affiliated** with Hypergryph or Yostar
* Does **not automate gameplay**
* Uses publicly available game data for **educational and analytical purposes only**

---

## 🤝 Contributions

Contributions are welcome!

* New operators or updated data
* Optimization logic improvements
* UI or visualization extensions
* Bug fixes and refactors

Please submit a pull request with a clear description of changes.

---

## Quick start

A minimal Java backend + React (Vite) frontend to calculate pull expectations from your resources. 

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
- Frontend: add tests under `pnpm test` 

## Disclaimer
Not affiliated with Hypergryph or Yostar. For educational/demo purposes only.
