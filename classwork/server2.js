require('dotenv').config();
const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const PORT = process.env.PORT || 3000;
const MENU_FILE = path.join(__dirname, 'data', 'menu.json');
const CATEGORIES_FILE = path.join(__dirname, 'data', 'categories.json');
function sendJson(res, statusCode, data) {
 res.statusCode = statusCode;
 res.setHeader('Content-Type', 'application/json');
 res.end(JSON.stringify(data));
}
async function readJsonFile(filePath) {
 const data = await fs.readFile(filePath, 'utf8');
 return JSON.parse(data);
}
const server = http.createServer(async (req, res) => {
 const { url, method } = req;
 try {
   // GET /menu
   if (url === '/menu' && method === 'GET') {
     const items = await readJsonFile(MENU_FILE);
     return sendJson(res, 200, items);
   }
   // GET /menu/:id
   if (url.startsWith('/menu/') && method === 'GET') {
     const id = Number(url.split('/')[2]);
     const items = await readJsonFile(MENU_FILE);
     const item = items.find((i) => i.id === id);
     if (!item) {
       return sendJson(res, 404, { error: 'Item not found' });
     }
     return sendJson(res, 200, item);
   }
   // GET /categories
   if (url === '/categories' && method === 'GET') {
     const categories = await readJsonFile(CATEGORIES_FILE);
     return sendJson(res, 200, categories);
   }
   sendJson(res, 404, { error: 'Not found' });
 } catch (err) {
   console.error(err);
   sendJson(res, 500, { error: 'Could not read data' });
 }
});
server.listen(PORT, () => {
 console.log(`Dunkin API (Lab 2, callbackvsPromises) running on http://localhost:${PORT}`);
});
