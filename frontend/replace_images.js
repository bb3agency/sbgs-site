/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const sweetsDir = 'd:\\Agency\\Clients\\SBGS\\sbgs-site\\frontend\\public\\images\\sweets';
const sweetsImages = fs.readdirSync(sweetsDir).filter(f => f.endsWith('.jpg'));

function getRandomSweet() {
  return '/images/sweets/' + sweetsImages[Math.floor(Math.random() * sweetsImages.length)];
}

function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next') {
        walkSync(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

let filesChanged = 0;
walkSync('d:\\Agency\\Clients\\SBGS\\sbgs-site\\frontend', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/https:\/\/images\.unsplash\.com\/[^\s\"\'\`]+/g, () => getRandomSweet());
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated: ' + filePath);
    filesChanged++;
  }
});
console.log('Total files changed: ' + filesChanged);
