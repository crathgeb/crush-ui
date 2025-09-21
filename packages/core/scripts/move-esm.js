const fs = require('fs');
const path = require('path');

// Move the main ESM entry point
const esmIndexPath = path.join(__dirname, '../dist/esm/index.js');
const targetPath = path.join(__dirname, '../dist/index.esm.js');

if (fs.existsSync(esmIndexPath)) {
  fs.renameSync(esmIndexPath, targetPath);
  console.log('✓ Moved ESM entry point');
}

// Move component ESM files
const componentsEsmPath = path.join(__dirname, '../dist/esm/components/index.js');
const componentsTargetPath = path.join(__dirname, '../dist/components/index.esm.js');

if (fs.existsSync(componentsEsmPath)) {
  // Ensure target directory exists
  const targetDir = path.dirname(componentsTargetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.renameSync(componentsEsmPath, componentsTargetPath);
  console.log('✓ Moved components ESM files');
}

// Move utils ESM files
const utilsEsmPath = path.join(__dirname, '../dist/esm/utils/index.js');
const utilsTargetPath = path.join(__dirname, '../dist/utils/index.esm.js');

if (fs.existsSync(utilsEsmPath)) {
  // Ensure target directory exists
  const targetDir = path.dirname(utilsTargetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.renameSync(utilsEsmPath, utilsTargetPath);
  console.log('✓ Moved utils ESM files');
}

// Move types ESM files
const typesEsmPath = path.join(__dirname, '../dist/esm/types/index.js');
const typesTargetPath = path.join(__dirname, '../dist/types/index.esm.js');

if (fs.existsSync(typesEsmPath)) {
  // Ensure target directory exists
  const targetDir = path.dirname(typesTargetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.renameSync(typesEsmPath, typesTargetPath);
  console.log('✓ Moved types ESM files');
}

// Clean up empty esm directory
const esmDir = path.join(__dirname, '../dist/esm');
if (fs.existsSync(esmDir)) {
  fs.rmSync(esmDir, { recursive: true, force: true });
  console.log('✓ Cleaned up ESM directory');
}