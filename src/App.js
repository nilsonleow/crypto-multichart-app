import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ symbol = "BTCUSDT" }) => {
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

    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=96`)
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
  }, [symbol]);

  return <div ref={chartContainerRef} style={{ flex: 1 }} />;
};

const App = () => {
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", backgroundColor: "black", gap: 0, minHeight: "100vh" }}>
      {symbols.map((symbol, i) => (
        <CryptoChart key={i} symbol={symbol} />
      ))}
    </div>
  );
};

export default App;
