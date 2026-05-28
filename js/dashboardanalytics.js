(() => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const segButtons = $$(".dash-analytics__seg-btn");
    const refreshBtn = $("#da-refresh");
    const exportBtn = $("#da-export");

    if (!segButtons.length) return;

    const els = {
        kpiVisits: $("#da-kpi-visits"),
        kpiVisitsDelta: $("#da-kpi-visits-delta"),
        kpiSession: $("#da-kpi-session"),
        kpiSessionDelta: $("#da-kpi-session-delta"),
        kpiClicks: $("#da-kpi-clicks"),
        kpiClicksDelta: $("#da-kpi-clicks-delta"),
        kpiBounce: $("#da-kpi-bounce"),
        kpiBounceDelta: $("#da-kpi-bounce-delta"),
        sparks: $$(".da-spark"),
        line: $("#da-line"),
        lineArea: $("#da-line-area"),
        bestDay: $("#da-best-day"),
        dailyAvg: $("#da-daily-avg"),
        trend: $("#da-trend"),
        sourceTotal: $("#da-source-total"),
        sourceTop: $("#da-source-top"),
        srcDirect: $("#da-src-direct"),
        srcSocial: $("#da-src-social"),
        srcSearch: $("#da-src-search"),
        donutSlices: $$("#da-donut .da-donut__slice"),
        heatmap: $("#da-heatmap"),
        heatHint: $("#da-heat-hint"),
        insightsList: $("#da-insights-list"),
        insightCount: $("#da-insight-count"),
    };

    const today = new Date();
    const fmtDay = new Intl.DateTimeFormat(undefined, { month: "short", day: "2-digit" });
    const fmtLong = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "2-digit", year: "numeric" });

    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const round = (n) => Math.round(n);

    const makeRng = (seed) => {
        let s = seed >>> 0;
        return () => {
            s = (s * 1664525 + 1013904223) >>> 0;
            return s / 4294967296;
        };
    };

    const formatInt = (n) => new Intl.NumberFormat().format(Math.max(0, Math.round(n)));

    const formatPct = (n) => `${Math.abs(n).toFixed(1)}%`;

    const formatDelta = (el, value) => {
        const v = Number.isFinite(value) ? value : 0;
        const isUp = v >= 0;
        el.classList.toggle("is-up", isUp);
        el.classList.toggle("is-down", !isUp);
        el.textContent = `${isUp ? "+" : "-"}${formatPct(v)}`;
    };

    const secondsToMmSs = (seconds) => {
        const s = Math.max(0, Math.round(seconds));
        const m = Math.floor(s / 60);
        const r = s % 60;
        return `${m}:${String(r).padStart(2, "0")}`;
    };

    const buildPath = (values, width, height, pad = 4) => {
        if (!values.length) return "";
        const min = Math.min(...values);
        const max = Math.max(...values);
        const span = Math.max(1e-6, max - min);
        const innerW = width - pad * 2;
        const innerH = height - pad * 2;

        return values
            .map((v, i) => {
                const x = pad + (i / (values.length - 1 || 1)) * innerW;
                const y = pad + (1 - (v - min) / span) * innerH;
                return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
            })
            .join(" ");
    };

    const buildAreaPath = (lineD, width, height, pad = 24) => {
        if (!lineD) return "";
        const start = `M${pad} ${height - pad}`;
        const end = `L${width - pad} ${height - pad} Z`;
        return `${start} ${lineD.replace(/^M/, "L")} ${end}`;
    };

    const generateSeries = (rangeDays, seed) => {
        const rng = makeRng(seed);
        const base = rangeDays <= 7 ? 780 : rangeDays <= 30 ? 520 : 420;
        const amp = rangeDays <= 7 ? 260 : rangeDays <= 30 ? 220 : 190;

        const values = [];
        let drift = (rng() - 0.5) * 0.6;
        for (let i = 0; i < rangeDays; i += 1) {
            drift += (rng() - 0.5) * 0.12;
            const wave = Math.sin(i / 4.3) * 0.32 + Math.sin(i / 9.2) * 0.18;
            const noise = (rng() - 0.5) * 0.75;
            const v = base + amp * (0.55 + wave + noise + drift);
            values.push(clamp(v, 80, 2600));
        }
        return values;
    };

    const computeDeltaPct = (cur, prev) => {
        if (!Number.isFinite(prev) || prev === 0) return 0;
        return ((cur - prev) / prev) * 100;
    };

    const setActiveRangeBtn = (btn) => {
        segButtons.forEach((b) => {
            const active = b === btn;
            b.classList.toggle("is-active", active);
            b.setAttribute("aria-selected", active ? "true" : "false");
        });
    };

    let nonce = 0;
    let lastState = null;

    const renderDonut = (percents) => {
        const r = 78;
        const c = 2 * Math.PI * r;
        const slices = els.donutSlices;
        if (slices.length < 3) return;

        const parts = [
            { key: "Direct", p: percents.direct, el: slices[0] },
            { key: "Social", p: percents.social, el: slices[1] },
            { key: "Search", p: percents.search, el: slices[2] },
        ];

        let offset = 0;
        parts.forEach((part) => {
            const len = (part.p / 100) * c;
            part.el.style.strokeDasharray = `${len} ${c - len}`;
            part.el.style.strokeDashoffset = `${-offset}`;
            offset += len;
        });

        const top = parts.slice().sort((a, b) => b.p - a.p)[0];
        els.sourceTop.textContent = top.key;
    };

    const buildHeatmap = (rangeDays, rng) => {
        if (!els.heatmap) return;
        const rows = 7;
        const cols = 14;
        const total = rows * cols;

        const cells = [];
        for (let i = 0; i < total; i += 1) {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.className = "da-heat__cell";
            cell.setAttribute("role", "gridcell");
            cell.setAttribute("aria-label", "Heat cell");
            cells.push(cell);
        }

        els.heatmap.replaceChildren(...cells);

        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (rangeDays - 1));

        const activity = Array.from({ length: rangeDays }, () => {
            const raw = rng();
            return raw < 0.12 ? 0 : raw < 0.38 ? 1 : raw < 0.62 ? 2 : raw < 0.83 ? 3 : 4;
        });

        const startIndex = Math.max(0, total - rangeDays);
        for (let i = 0; i < total; i += 1) {
            const cell = cells[i];
            if (i < startIndex) {
                cell.dataset.lvl = "0";
                cell.disabled = true;
                cell.title = "";
                continue;
            }

            const dayIndex = i - startIndex;
            const lvl = activity[dayIndex];
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + dayIndex);

            cell.disabled = false;
            cell.dataset.lvl = String(lvl);
            cell.dataset.date = d.toISOString();
            cell.title = `${fmtLong.format(d)} • Level ${lvl}`;
            cell.setAttribute("aria-label", `${fmtLong.format(d)} activity level ${lvl}`);
        }

        const onHover = (cell) => {
            if (!els.heatHint || cell.disabled) return;
            const iso = cell.dataset.date;
            const d = iso ? new Date(iso) : null;
            const lvl = Number(cell.dataset.lvl || 0);
            if (!d || !Number.isFinite(lvl)) return;
            const label = lvl === 0 ? "Very low" : lvl === 1 ? "Low" : lvl === 2 ? "Medium" : lvl === 3 ? "High" : "Peak";
            els.heatHint.textContent = `${fmtLong.format(d)} — ${label} activity.`;
        };

        cells.forEach((cell) => {
            cell.addEventListener("mouseenter", () => onHover(cell));
            cell.addEventListener("focus", () => onHover(cell));
        });
    };

    const buildInsights = ({ rangeDays, series, deltas, sources, bounce }) => {
        if (!els.insightsList || !els.insightCount) return;

        const items = [];
        const trend = deltas.visits >= 0 ? "up" : "down";
        const best = series.reduce((bestIdx, v, i, arr) => (v > arr[bestIdx] ? i : bestIdx), 0);
        const bestDate = new Date(today);
        bestDate.setDate(bestDate.getDate() - (rangeDays - 1 - best));

        items.push({
            icon: "fa-chart-line",
            tag: trend === "up" ? "Momentum" : "Correction",
            tone: trend === "up" ? "is-emerald" : "is-amber",
            text: `Traffic is ${trend} (${formatPct(deltas.visits)}) compared to the previous ${rangeDays} days.`,
        });

        const topSource = Object.entries(sources).sort((a, b) => b[1] - a[1])[0];
        items.push({
            icon: "fa-bullseye",
            tag: "Acquisition",
            tone: "is-violet",
            text: `${topSource[0]} is leading at ${topSource[1].toFixed(0)}% of visits for this range.`,
        });

        items.push({
            icon: "fa-calendar-day",
            tag: "Peak",
            tone: "is-cyan",
            text: `Highest daily visits happened on ${fmtDay.format(bestDate)}.`,
        });

        items.push({
            icon: "fa-door-open",
            tag: "Engagement",
            tone: bounce > 45 ? "is-amber" : "is-emerald",
            text: `Bounce rate is ${bounce.toFixed(0)}%. ${bounce > 45 ? "Improve landing focus with clearer CTAs." : "Good retention—keep this layout style."}`,
        });

        els.insightsList.replaceChildren(
            ...items.map((it) => {
                const li = document.createElement("li");
                li.className = "da-insight";
                li.innerHTML = `
                    <div class="da-insight__icon" aria-hidden="true"><i class="fa-solid ${it.icon}"></i></div>
                    <div class="da-insight__body">
                        <div class="da-insight__top">
                            <span class="da-badge ${it.tone}">${it.tag}</span>
                        </div>
                        <p>${it.text}</p>
                    </div>
                `;
                return li;
            })
        );

        els.insightCount.textContent = `${items.length} notes`;
    };

    const render = (rangeDays, seed) => {
        const rng = makeRng(seed);
        const series = generateSeries(rangeDays, seed);
        const prevSeries = generateSeries(rangeDays, seed ^ 0xa5a5a5a5);

        const total = series.reduce((a, b) => a + b, 0);
        const prevTotal = prevSeries.reduce((a, b) => a + b, 0);
        const trafficUp = total >= prevTotal;

        const sessionSec = 110 + rng() * 90 + (rangeDays <= 7 ? 12 : 0);
        const prevSessionSec = 110 + makeRng(seed ^ 0x1f2e3d4c)() * 90 + (rangeDays <= 7 ? 8 : 0);

        const clicks = Math.round(total * (0.055 + rng() * 0.03));
        const prevClicks = Math.round(prevTotal * (0.055 + makeRng(seed ^ 0x55aa33cc)() * 0.03));

        const bounce = clamp(32 + rng() * 24 + (trafficUp ? -2 : 4), 25, 64);
        const prevBounce = clamp(32 + makeRng(seed ^ 0x9988ee11)() * 24, 25, 64);

        const deltas = {
            visits: computeDeltaPct(total, prevTotal),
            session: computeDeltaPct(sessionSec, prevSessionSec),
            clicks: computeDeltaPct(clicks, prevClicks),
            bounce: computeDeltaPct(bounce, prevBounce),
        };

        if (els.kpiVisits) els.kpiVisits.textContent = formatInt(total);
        if (els.kpiSession) els.kpiSession.textContent = secondsToMmSs(sessionSec);
        if (els.kpiClicks) els.kpiClicks.textContent = formatInt(clicks);
        if (els.kpiBounce) els.kpiBounce.textContent = `${bounce.toFixed(0)}%`;

        if (els.kpiVisitsDelta) formatDelta(els.kpiVisitsDelta, deltas.visits);
        if (els.kpiSessionDelta) formatDelta(els.kpiSessionDelta, deltas.session);
        if (els.kpiClicksDelta) formatDelta(els.kpiClicksDelta, deltas.clicks);
        if (els.kpiBounceDelta) formatDelta(els.kpiBounceDelta, deltas.bounce);

        // Sparklines
        const sparkMap = {
            visits: series.slice(-24).map((v) => v),
            session: series.slice(-24).map((v, i) => v * (0.18 + 0.02 * Math.sin(i / 3))),
            clicks: series.slice(-24).map((v, i) => v * (0.08 + 0.02 * Math.cos(i / 2.1))),
            bounce: series.slice(-24).map((v, i) => 60 - (v / Math.max(...series)) * 24 + Math.sin(i / 2.2) * 4),
        };

        els.sparks.forEach((svg) => {
            const key = svg.dataset.spark;
            const path = svg.querySelector("path");
            const vals = sparkMap[key] || [];
            if (!path) return;
            path.setAttribute("d", buildPath(vals, 120, 36, 4));
        });

        // Line chart
        if (els.line && els.lineArea) {
            const w = 720;
            const h = 240;
            const pad = 24;
            const min = Math.min(...series);
            const max = Math.max(...series);
            const span = Math.max(1e-6, max - min);

            const lineD = series
                .map((v, i) => {
                    const x = pad + (i / (series.length - 1 || 1)) * (w - pad * 2);
                    const y = pad + (1 - (v - min) / span) * (h - pad * 2);
                    return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
                })
                .join(" ");

            els.line.setAttribute("d", lineD);
            els.lineArea.setAttribute("d", buildAreaPath(lineD, w, h, pad));
        }

        // Summary meta
        const bestIdx = series.reduce((best, v, i, arr) => (v > arr[best] ? i : best), 0);
        const bestDate = new Date(today);
        bestDate.setDate(bestDate.getDate() - (rangeDays - 1 - bestIdx));
        if (els.bestDay) els.bestDay.textContent = fmtLong.format(bestDate);
        if (els.dailyAvg) els.dailyAvg.textContent = `${formatInt(total / rangeDays)} / day`;
        if (els.trend) els.trend.textContent = deltas.visits >= 0 ? "Rising" : "Cooling";

        // Donut
        const direct = clamp(42 + rng() * 20, 35, 68);
        const social = clamp(16 + rng() * 22, 8, 40);
        const search = clamp(100 - direct - social, 8, 45);
        const normalize = direct + social + search;
        const sources = {
            Direct: (direct / normalize) * 100,
            Social: (social / normalize) * 100,
            Search: (search / normalize) * 100,
        };

        if (els.sourceTotal) els.sourceTotal.textContent = `${formatInt(total)} visits`;
        if (els.srcDirect) els.srcDirect.textContent = `${sources.Direct.toFixed(0)}%`;
        if (els.srcSocial) els.srcSocial.textContent = `${sources.Social.toFixed(0)}%`;
        if (els.srcSearch) els.srcSearch.textContent = `${sources.Search.toFixed(0)}%`;
        renderDonut({ direct: sources.Direct, social: sources.Social, search: sources.Search });

        // Heatmap
        buildHeatmap(rangeDays, rng);

        buildInsights({
            rangeDays,
            series,
            deltas,
            sources: { Direct: sources.Direct, Social: sources.Social, Search: sources.Search },
            bounce,
        });

        lastState = { rangeDays, seed, series, total, clicks, bounce, sessionSec, sources };
    };

    const pickSeed = (rangeDays) => {
        const dayKey = Math.floor(new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 86400000);
        return (dayKey * 2654435761 + rangeDays * 97531 + nonce * 911) >>> 0;
    };

    const applyRange = (rangeDays, { focus = false } = {}) => {
        const btn = segButtons.find((b) => Number(b.dataset.range) === rangeDays);
        if (btn) setActiveRangeBtn(btn);
        render(rangeDays, pickSeed(rangeDays));
        if (focus && btn) btn.focus();
    };

    segButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const rangeDays = Number(btn.dataset.range || 7);
            applyRange(rangeDays);
        });
    });

    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            nonce += 1;
            const active = segButtons.find((b) => b.classList.contains("is-active"));
            const rangeDays = Number(active?.dataset.range || 7);
            applyRange(rangeDays, { focus: true });
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            if (!lastState) return;
            const payload = {
                generatedAt: new Date().toISOString(),
                rangeDays: lastState.rangeDays,
                totals: {
                    visits: Math.round(lastState.total),
                    projectClicks: Math.round(lastState.clicks),
                    bounceRate: Number(lastState.bounce.toFixed(1)),
                    avgSessionSeconds: Math.round(lastState.sessionSec),
                },
                sources: {
                    directPct: Number(lastState.sources.Direct.toFixed(1)),
                    socialPct: Number(lastState.sources.Social.toFixed(1)),
                    searchPct: Number(lastState.sources.Search.toFixed(1)),
                },
                series: lastState.series.map((v) => Math.round(v)),
            };

            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `thefox-analytics-${lastState.rangeDays}d.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
    }

    // Initial render
    applyRange(7);
})();
