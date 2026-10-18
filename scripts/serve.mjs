import http from 'node:http';import fs from 'node:fs/promises';import path from 'node:path';
const root=path.resolve('dist');const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/bean-and-brew/,'');if(p.endsWith('/'))p+='index.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep))throw Error();const b=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain'});res.end(b)}catch{res.writeHead(404);res.end('Not found')}}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173/bean-and-brew/'));

