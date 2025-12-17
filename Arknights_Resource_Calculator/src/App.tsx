import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";

export default function Calculator() {
    // If VITE_API_URL is set (prod), use it; otherwise use the Vite dev proxy at /api
    const apiBase = import.meta.env.VITE_API_URL || "";
    const apiPath = "/api/calculate";
    // Use empty strings so placeholders show until the user types
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClear = () => {
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setResult(null);
        setError(null);
    }

    const handleCalculate = async () => {
        setError(null);
        setLoading(true);
        setResult(null);
        try {
            const url = apiBase ? `${apiBase}${apiPath}` : apiPath;
            console.log("Calling backend:", url);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    input1: Number(input1) || 0,
                    input2: Number(input2) || 0,
                    input3: Number(input3) || 0,
                    input4: Number(input4) || 0,
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Request failed");
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const hint = apiBase ? `${apiBase}${apiPath}` : apiPath;
            setError(`Request failed. Make sure the backend is reachable at ${hint}.\nDetails: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
            <Card className="w-full max-w-3xl border-slate-200/70 bg-white/90 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-slate-900">Arknights Resource Calculator</CardTitle>
                    <CardDescription className="text-base text-slate-600">
                        Enter your resources to calculate the expected pulls.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="Orundum">Orundum</Label>
                            <Input
                                id="Orundum"
                                type="number"
                                value={input1}
                                placeholder="How much Orundum you have"
                                onChange={(e) => setInput1(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="gems">Gacha</Label>
                            <Input
                                id="gems"
                                type="number"
                                value={input2}
                                placeholder="How many Gacha you have"
                                onChange={(e) => setInput2(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="ten">Ten-times Employment Tickets</Label>
                            <Input
                                id="ten"
                                type="number"
                                value={input3}
                                placeholder="How many 10x tickets you have"
                                onChange={(e) => setInput3(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="single">Single Employment Tickets</Label>
                            <Input
                                id="single"
                                type="number"
                                value={input4}
                                placeholder="How many single tickets you have"
                                onChange={(e) => setInput4(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button onClick={handleCalculate} disabled={loading}>
                            {loading ? "Calculating..." : "Calculate the pulls"}
                        </Button>
                        <Button onClick={handleClear} disabled={loading}>
                            {loading ? "Calculating..." : "Clear Inputs"}
                        </Button>
                        {loading && <span className="text-sm text-slate-500">Crunching numbers…</span>}
                    </div>

                    {result !== null && (
                        <p className="text-base font-semibold text-slate-900">
                            Result: <span className="font-bold text-primary">{result}</span>
                        </p>
                    )}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </CardContent>
            </Card>
        </main>
    );
}
