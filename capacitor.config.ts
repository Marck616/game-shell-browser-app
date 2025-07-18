import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aaac17b722274fdd956fc2b7716ea26a',
  appName: 'Game Browser',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://aaac17b7-2227-4fdd-956f-c2b7716ea26a.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: false
    }
  }
};

export default config;