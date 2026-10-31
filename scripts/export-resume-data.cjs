// Export the real dictionary for PDF QA; no duplicated fixture.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const scope = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/data/content.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, scope);
fs.writeFileSync(process.argv[2] || '/tmp/resume-data.json', JSON.stringify(scope.exports));
