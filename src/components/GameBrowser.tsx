// ========================================
// CONFIGURAÇÃO DO SEU JOGO
// ========================================
// Para incluir seu jogo, edite uma das opções abaixo:

// OPÇÃO 1: URL do seu jogo (recomendado)
const GAME_URL = 'https://exemplo.com/seu-jogo';

// OPÇÃO 2: Arquivo local (cole o conteúdo HTML aqui)
const GAME_HTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Meu Jogo</title>
</head>
<body>
    <h1>Cole aqui o HTML completo do seu jogo</h1>
    <!-- Seu código do jogo aqui -->
</body>
</html>
`;

// ========================================
// NÃO EDITE ABAIXO DESTA LINHA
// ========================================

import { useEffect, useState } from 'react';

const GameBrowser = () => {
  const [gameSource, setGameSource] = useState<string>('');

  useEffect(() => {
    // Prioriza URL sobre HTML local
    if (GAME_URL && GAME_URL !== 'https://exemplo.com/seu-jogo') {
      setGameSource(GAME_URL);
    } else if (GAME_HTML && !GAME_HTML.includes('Cole aqui o HTML')) {
      // Cria um blob URL para o HTML local
      const blob = new Blob([GAME_HTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setGameSource(url);
    }
  }, []);

  if (!gameSource) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Configure seu jogo
          </h2>
          <p className="text-muted-foreground text-sm">
            Edite o arquivo src/components/GameBrowser.tsx e configure GAME_URL ou GAME_HTML no topo do arquivo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <iframe
        src={gameSource}
        className="w-full h-full border-0"
        title="Game"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default GameBrowser;