import React, { useState, useEffect } from "react";

const TradingViewWidget = ({ symbol, theme, timeframe, range }) => (
  <iframe
    title={symbol}
    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol}&symbol=BINANCE:${symbol}&theme=${theme}&style=1&toolbarbg=F1F3F6&studies=[]&hideideas=1&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&save_image=0&locale=ru&interval=${timeframe}&range=${range}`}
    width="100%"
    height="100%"
    frameBorder="0"
    allowTransparency={true}
    scrolling="no"
  ></iframe>
);

const ChartCard = ({ symbol, theme, timeframe, range }) => (
  <div style={{ background: theme === "dark" ? "#2a2a2a" : "#f0f0f0", borderRadius: "8px", padding: "0.25rem", flex: 1 }}>
    <TradingViewWidget symbol={symbol} theme={theme} timeframe={timeframe} range={range} />
  </div>
);

function App() {
  const [symbols] = useState(["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [timeframe, setTimeframe] = useState(() => localStorage.getItem("timeframe") || "15"); // 15 мин
  const [range, setRange] = useState(() => localStorage.getItem("range") || "48h"); // 48 часов

  // Сохранение настроек в localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("timeframe", timeframe);
    localStorage.setItem("range", range);
  }, [theme, timeframe, range]);

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh", padding: "0.5rem", display: "flex", flexWrap: "wrap" }}>
      <div style={{ flexBasis: "100%", display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Переключить тему ({theme === "dark" ? "тёмная" : "светлая"})
        </button>
        <div>
          <label>
            Таймфрейм:
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="15">15 мин</option>
              <option value="30">30 мин</option>
              <option value="60">1 ч</option>
              <option value="240">4 ч</option>
              <option value="D">1 день</option>
            </select>
          </label>
          <label>
            Интервал:
            <select value={range} onChange={(e) => setRange(e.target.value)}>
              <option value="48h">48 ч</option>
              <option value="7d">7 дн.</option>
              <option value="30d">30 дн.</option>
            </select>
          </label>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", width: "100%" }}>
        {symbols.map((symbol, i) => (
          <ChartCard
            key={i}
            symbol={symbol}
            theme={theme}
            timeframe={timeframe}
            range={range}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
