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

  // Логирование состояния
  console.log('Symbols:', symbols);
  console.log('Intervals:', chartIntervals);
  console.log('Theme:', theme);

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
