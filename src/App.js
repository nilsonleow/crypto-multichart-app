import React, { useState, useEffect } from "react";

const TradingViewWidget = ({ symbol, theme }) => (
  <iframe
    title={symbol}
    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol}&symbol=BINANCE:${symbol}&theme=${theme}&style=1&toolbarbg=F1F3F6&studies=[]&hideideas=1&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&save_image=0&locale=ru`}
    width="100%"
    height="400"
    frameBorder="0"
    allowTransparency={true}
    scrolling="no"
  ></iframe>
);

const ChartCard = ({ symbol, theme }) => (
  <div style={{ background: theme === "dark" ? "#2a2a2a" : "#f0f0f0", borderRadius: "8px", padding: "0.25rem" }}>
    <TradingViewWidget symbol={symbol} theme={theme} />
  </div>
);

function App() {
  const [symbols] = useState(["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh", padding: "0.5rem" }}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Переключить тему ({theme === "dark" ? "тёмная" : "светлая"})</button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", marginTop: "0.5rem" }}>
        {symbols.map((symbol, i) => (
          <ChartCard
            key={i}
            symbol={symbol}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
