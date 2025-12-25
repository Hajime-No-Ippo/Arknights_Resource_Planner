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
    const [opsBroadcast, setOpsBroadcast] = useState(false);
    const [activeView, setActiveView] = useState<"calculator" | "guides">("calculator");
    const guideCatalogue = [
        {
            id: "ops-brief",
            title: "Operations Brief",
            description:
                "Quick-read mission prep. Covers daily intake priorities, sanity efficiency, and banner timing snapshots.",
        },
        {
            id: "materials",
            title: "Material Routes",
            description:
                "Suggested farm loops for common mats with swap guidance based on event availability and drop rates.",
        },
        {
            id: "pull-planning",
            title: "Pull Planning",
            description:
                "Basic budget map for banner streaks. Use alongside the calculator for projection checks.",
        },
    ];
    const [activeGuideId, setActiveGuideId] = useState(guideCatalogue[0].id);
    const activeGuide = guideCatalogue.find((guide) => guide.id === activeGuideId) ?? guideCatalogue[0];

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

    const handleOpsToggle = () => {
        setOpsBroadcast((prev) => !prev);
    };

    return (
        <div className="ark-page">
            <header className="ark-site-header">
                <div className="ark-brand">
                    <div>
                        <p className="ark-brand-title">Rhodes Island Logistics</p>
                        <p className="ark-brand-subtitle">Resource Intake Console</p>
                    </div>
                </div>
                <div className="ark-header-row">
                    <nav className="ark-nav">
                        <button
                            className={`ark-nav-item ${activeView === "calculator" ? "ark-nav-item--active" : ""}`}
                            type="button"
                            onClick={() => setActiveView("calculator")}
                        >
                            Calculator
                        </button>
                        <button
                            className={`ark-nav-item ${activeView === "guides" ? "ark-nav-item--active" : ""}`}
                            type="button"
                            onClick={() => setActiveView("guides")}
                        >
                            Guides
                        </button>
                    </nav>
                    <div className="ark-header-actions">
                        <button className="ark-nav-item ark-nav-item--ghost" type="button" onClick={handleOpsToggle}>
                            {opsBroadcast ? "Disable Ops" : "Enable Ops"}
                        </button>
        
                        
                    </div>
                </div>
            </header>

            <main className="ark-shell ark-main">
                <div className="ark-card-glow w-full max-w-4xl">
                    {activeView === "calculator" ? (
                        <Card className="ark-card rounded-none">
                            <CardHeader className="ark-header">
                                <CardTitle className="ark-title">Arknights Resource Calculator</CardTitle>
                                <CardDescription className="ark-subtitle">
                                    Enter your resources to calculate the expected pulls.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="ark-content">
                                <div className="ark-grid">
                                    <div className="ark-field">
                                        <Label className="ark-label" htmlFor="Orundum">
                                            Orundum
                                        </Label>
                                        <div className="ark-input-shell">
                                            <Input
                                                className="ark-input"
                                                id="Orundum"
                                                type="number"
                                                value={input1}
                                                placeholder="How much Orundum you have"
                                                onChange={(e) => setInput1(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="ark-field">
                                        <Label className="ark-label" htmlFor="gems">
                                            OP (Originite Prime)
                                        </Label>
                                        <div className="ark-input-shell">
                                            <Input
                                                className="ark-input"
                                                id="gems"
                                                type="number"
                                                value={input2}
                                                placeholder="How many OP you have"
                                                onChange={(e) => setInput2(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="ark-field">
                                        <Label className="ark-label" htmlFor="ten">
                                            Ten-times Employment Tickets
                                        </Label>
                                        <div className="ark-input-shell">
                                            <Input
                                                className="ark-input"
                                                id="ten"
                                                type="number"
                                                value={input3}
                                                placeholder="How many 10x tickets you have"
                                                onChange={(e) => setInput3(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="ark-field">
                                        <Label className="ark-label" htmlFor="single">
                                            Single Employment Tickets
                                        </Label>
                                        <div className="ark-input-shell">
                                            <Input
                                                className="ark-input"
                                                id="single"
                                                type="number"
                                                value={input4}
                                                placeholder="How many single tickets you have"
                                                onChange={(e) => setInput4(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="ark-actions">
                                    <Button className="ark-button" onClick={handleCalculate} disabled={loading}>
                                        {loading ? "Calculating..." : "Calculate the pulls"}
                                    </Button>
                                    <Button
                                        className="ark-button ark-button--secondary"
                                        variant="secondary"
                                        onClick={handleClear}
                                        disabled={loading}
                                    >
                                        {loading ? "Calculating..." : "Clear Inputs"}
                                    </Button>
                                    {loading && <span className="ark-status">Crunching numbers…</span>}
                                </div>

                                {result !== null && (
                                    <p className="ark-result">
                                        Result: <span className="ark-result-value">{result}</span>
                                    </p>
                                )}
                                {error && <p className="ark-error">{error}</p>}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="ark-card rounded-none">
                            <CardHeader className="ark-header">
                                <CardTitle className="ark-title">Guides Catalogue</CardTitle>
                                <CardDescription className="ark-subtitle">
                                    Select a catalogue entry to render the operator briefing.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="ark-content">
                                <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                                    <div className="flex flex-col gap-3">
                                        {guideCatalogue.map((guide) => (
                                            <button
                                                key={guide.id}
                                                className={`ark-nav-item ${
                                                    guide.id === activeGuideId ? "ark-nav-item--active" : ""
                                                }`}
                                                type="button"
                                                onClick={() => setActiveGuideId(guide.id)}
                                            >
                                                Catalogue {guide.title}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <p className="ark-label">User Description</p>
                                        <p className="text-sm text-slate-300">{activeGuide.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>

            <footer className="ark-site-footer">
                <p>Rhodes Island · Resource Division</p>
                <p>All estimates are rounded. Verify with in-game totals.</p>
            </footer>
        </div>
    );
}
