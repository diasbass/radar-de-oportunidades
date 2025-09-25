function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="border-b border-slate-700">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-cyan-400">
            Radar de Oportunidades DeFi
          </h1>
          <p className="text-slate-400">
            As melhores taxas de juros em Stablecoins na rede Polygon
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Nossos cards de oportunidade irão aqui */}
        <p>Carregando oportunidades...</p>
      </main>
    </div>
  )
}

export default App