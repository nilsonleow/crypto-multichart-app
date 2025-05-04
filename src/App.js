import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const TIMEFRAMES = {
  '15m': '15m',
  '1h': '1h',
  '4h': '4h',
  '1d': '1d'
};

const CryptoChart = ({ symbol = "BTCUSDT", interval = "15m" }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#000" },
        textColor: "#DDD"
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" }
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addCandlestickSeries();

    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=96`)
      .then(res => res.json())
      .then(data => {
        const transformed = data.map(d => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4])
        }));
        candleSeries.setData(transformed);
      });

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [symbol, interval]);

  return <div ref={chartContainerRef} style={{ flex: 1 }} />;
};

const App = () => {
  const [selectedSymbols, setSelectedSymbols] = useState(["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]);
  const [interval, setInterval] = useState("15m");

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}>
      <div style={{ padding: "10px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <label>Таймфрейм:&nbsp;</label>
          <select value={interval} onChange={(e) => setInterval(e.target.value)}>
            {Object.keys(TIMEFRAMES).map(tf => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
        {selectedSymbols.map((symbol, i) => (
          <CryptoChart key={i} symbol={symbol} interval={interval} />
        ))}
      </div>
    </div>
  );
};
