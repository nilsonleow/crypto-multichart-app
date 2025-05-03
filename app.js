import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const availableSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT", "DOGEUSDT"];
const intervals = ["1", "5", "15", "60", "240", "D"];

const TradingViewWidget = ({ symbol, interval, theme }) => {
  return (
    <iframe
      title={symbol}
      src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol}&symbol=BINANCE:${symbol}&interval=${interval}&theme=${theme}&style=1&toolbarbg=F1F3F6&studies=[]&hideideas=1&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&save_image=0&locale=ru`}
      width="100%"
      height="400"
      frameBorder="0"
      allowTransparency={true}
      scrolling="no"
    ></iframe>
  );
};

const ChartCard = ({ index, selected, onChangeSymbol, interval, onChangeInterval, theme }) => {
  return (
    <div style={{ background: theme === "dark" ? "#2a2a2a" : "#f0f0f0", borderRadius: "8px", padding: "0.5rem", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <select value={selected} onChange={(e) => onChangeSymbol(index, e.target.value)} style={{ padding: "0.2rem" }}>
          {availableSymbols.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={interval} onChange={(e) => onChangeInterval(index, e.target.value)} style={{ padding: "0.2rem" }}>
          {intervals.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
      <TradingViewWidget symbol={selected} interval={interval} theme={theme} />
    </div>
  );
};

const App = () => {
  const [symbols, setSymbols] = useState(() => JSON.parse(localStorage.getItem("symbols")) || ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]);
  const [chartIntervals, setChartIntervals] = useState(() => JSON.parse(localStorage.getItem("intervals")) || ["60", "60", "60", "60"]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("symbols", JSON.stringify(symbols));
  }, [symbols]);

  useEffect(() => {
    localStorage.setItem("intervals", JSON.stringify(chartIntervals));
  }, [chartIntervals]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSymbolChange = (index, newSymbol) => {
    const updated = [...symbols];
    updated[index] = newSymbol;
    setSymbols(updated);
  };

  const handleIntervalChange = (index, newInterval) => {
    const updated = [...chartIntervals];
    updated[index] = newInterval;
    setChartIntervals(updated);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div style={{
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      color: theme === "dark" ? "#fff" : "#000",
      minHeight: "100vh",
      padding: "1rem"
    }}>
      <button onClick={toggleTheme} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
        Переключить тему ({theme === "dark" ? "тёмная" : "светлая"})
      </button>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem"
      }}>
        {symbols.map((symbol, i) => (
          <ChartCard
            key={i}
            index={i}
            selected={symbol}
            interval={chartIntervals[i]}
            onChangeSymbol={handleSymbolChange}
            onChangeInterval={handleIntervalChange}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  ReactDOM.render(<App />, container);
}
