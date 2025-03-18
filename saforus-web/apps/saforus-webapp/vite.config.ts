/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

// Determine the Chrome executable path based on the environment
const isDocker = process.env.DOCKER_ENV === 'true';
const chromePath = isDocker
  ? '/opt/google/chrome/google-chrome' // Path in Docker
  : process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // macOS
  : process.platform === 'win32'
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Windows
  : '/usr/bin/google-chrome'; // Linux

export default defineConfig((config) => {
  return {
    cacheDir: '../../node_modules/.vite/saforus-webapp',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [
      react(),
      viteTsConfigPaths({
        root: '../../',
      }),
      createPrerender(prerenderRoutes, 'en'),
    ],

    build: {
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});

function createPrerender(routes: string[], lang?: string) {
  // The home root '/' already has a default version.
  routes = routes.filter((route) => route !== '/');

  return prerender({
    routes: routes,
    renderer: new PuppeteerRenderer({
      injectProperty: '__PRERENDER_INJECTED',
      inject: {
        isPrerendering: true,
        lang: lang,
      },
      maxConcurrentRoutes: 4,
      renderAfterTime: 3000,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      protocolTimeout: 30000,
      executablePath: chromePath,
    }),
    postProcess(renderedRoute) {
      renderedRoute.route = renderedRoute.originalRoute;
      renderedRoute.html = renderedRoute.html.replace(
        /<body[\s\S]*?<\/body>/,
        '<body>  <div id="root"></div>  </body>'
      );
    },
  });
}

const prerenderRoutes = [
  '/',
  '/login',
  '/dashboard/',
  '/dashboard/service-usage',
  '/dashboard/search-order',
  '/forensic-watermarking/',
  '/forensic-watermarking/create-order',
  '/forensic-watermarking/view-orders',
  '/piracy-detection/',
  '/piracy-detection/new-request',
  '/piracy-detection/view-orders',
  '/help/',
  '/help/help-center',
  '/user-info',
  '/user-info/team-members',
  '/user-info/service-plan',
];
