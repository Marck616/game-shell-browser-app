import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Settings, Upload, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const GameBrowser = () => {
  const [gameUrl, setGameUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const loadGame = () => {
    if (!gameUrl.trim()) {
      toast.error('Por favor, insira uma URL válida');
      return;
    }

    setIsLoading(true);
    setCurrentUrl(gameUrl);
    setIsSettingsOpen(false);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Jogo carregado com sucesso!');
    }, 1000);
  };

  const refreshGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      toast.success('Jogo atualizado!');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/html') {
      const url = URL.createObjectURL(file);
      setGameUrl(url);
      toast.success('Arquivo HTML carregado!');
    } else {
      toast.error('Por favor, selecione um arquivo HTML válido');
    }
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  if (!isSettingsOpen && currentUrl) {
    return (
      <div className="h-screen w-full relative">
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={refreshGame}
            className="shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={openSettings}
            className="shadow-lg"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="h-full flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando jogo...</p>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className="w-full h-full border-0"
            title="Game Frame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Game Browser</h1>
          <p className="text-muted-foreground">Navegador simples para jogos web</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Configurações do Jogo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL do Jogo</TabsTrigger>
                <TabsTrigger value="file">Arquivo Local</TabsTrigger>
              </TabsList>
              
              <TabsContent value="url" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL do seu jogo</label>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com/meu-jogo"
                    value={gameUrl}
                    onChange={(e) => setGameUrl(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Cole aqui a URL completa do seu jogo web
                  </p>
                </div>
                
                <Button 
                  onClick={loadGame} 
                  className="w-full"
                  disabled={!gameUrl.trim()}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Carregar Jogo
                </Button>
              </TabsContent>
              
              <TabsContent value="file" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Arquivo HTML do jogo</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Clique para selecionar o arquivo HTML do seu jogo
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Selecionar Arquivo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".html,.htm"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={loadGame} 
                  className="w-full"
                  disabled={!gameUrl.trim()}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Carregar Jogo Local
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {currentUrl && (
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Jogo Atual</p>
                  <p className="text-xs text-muted-foreground truncate max-w-xs">
                    {currentUrl}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setCurrentUrl('')}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GameBrowser;