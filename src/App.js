// src/App.js
import React, { useState, useEffect } from "react";

const TradingViewWidget = ({ symbol }) => (
  <iframe
    title={symbol}
    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol}&symbol=BINANCE:${symbol}&theme=dark&style=1&toolbarbg=F1F3F6&studies=[]&hideideas=1&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=1&save_image=0&locale=ru`}
    width="100%"
    height="100%"
    frameBorder="0"
    allowTransparency={true}
    scrolling="no"
  ></iframe>
);

const ChartCard = ({ symbol }) => (
  <div style={{ background: "#2a2a2a", borderRadius: "8px", overflow: "hidden", height: "100%" }}>
    <TradingViewWidget symbol={symbol} />
  </div>
);

function App() {
  const [symbols] = useState(["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]);

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#fff", minHeight: "100vh", display: "flex", flexWrap: "wrap", margin: "0", padding: "0" }}>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        {symbols.map((symbol, i) => (
          <div key={i} style={{ width: "50%", height: "50%" }}>
            <ChartCard symbol={symbol} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
