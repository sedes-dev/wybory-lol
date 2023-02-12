const fs = require('fs');

async function createGHPageDir() {
  if (fs.existsSync('./ghpage')) {
    await fs.promises.rm('./ghpage', {recursive: true});
  }
  
  await fs.promises.mkdir('./ghpage');
  await fs.promises.cp('./index.html', './ghpage/index.html');
  await fs.promises.cp('./static', './ghpage/static', {recursive: true});
  await fs.promises.cp('./dist', './ghpage/dist', {recursive: true});
  await fs.promises.appendFile('./ghpage/CNAME', 'wybory.lol', {flag: 'w'});
}

createGHPageDir();