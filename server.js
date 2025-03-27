import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';
import { setupWebSocket } from "./master/routesMaster/v1/countDown.js";

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createCustomServer() {
  const app = express();
  const server = createServer(app);
  setupWebSocket(server);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  let vite;
  
  if (IS_PRODUCTION) {
    const clientDistPath = path.resolve(__dirname, 'dist/client/');
    
    if (fs.existsSync(clientDistPath)) {
      app.use(express.static(clientDistPath, { index: false }));
    } else {
      console.warn('⚠️ Warning: dist/client/ not found! Run "npm run build" first.');
    }
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const indexPath = path.resolve(__dirname, 'public/index.html');
      let index = fs.readFileSync(indexPath, 'utf-8');

      let render, template;

      if (IS_PRODUCTION) {
        template = index;
        
        // Check kung may dist/client bago mag-import
        try {
          render = await import('./dist/client/').then((mod) => mod.render);
        } catch (err) {
          console.error('❌ Error loading dist/client/:', err);
          render = () => '<h1>⚠️ Build your frontend first: "npm run build"</h1>';
        }
      } else {
        template = await vite.transformIndexHtml(url, index);

        try {
          render = (await vite.ssrLoadModule('/public/main.js')).render;
        } catch (error) {
          console.warn('⚠️ Skipping SSR for main.js due to an error.');
          render = () => '';
        }
      }

      const context = {};
      const appHtml = await render(url, context);
      const html = template.replace('<!-- ssr -->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      next(e);
    }
  });

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    socket.emit('welcome', 'A message from the server');

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });

  const PORT = process.env.PORT || 9001 || 900;
  
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
      process.exit(1);
    } else {
      console.error('🔥 Server error:', err);
    }
  });
}

createCustomServer();
