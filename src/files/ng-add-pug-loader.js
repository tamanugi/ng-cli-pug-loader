/**
 * Adds the pug-loader inside Angular CLI's webpack config, if not there yet.
 * @see https://github.com/danguilherme/ng-cli-pug-loader
 */
const fs = require('fs');
const commonCliConfig = '__COMMON_CLI_CONFIG_PATH__';
const pugRules = '__PUG_RULES__';

fs.readFile(commonCliConfig, (err, data) => {
  if (err) throw err;

  const configText = data.toString();
  // make sure we don't add the rule if it already exists
  if (configText.indexOf(pugRules) > -1) { return; }

  // Insert the pug webpack rule
  const position = configText.indexOf('rules: [') + 8;
  const output = [configText.slice(0, position), pugRules, configText.slice(position)].join('');
  const file = fs.openSync(commonCliConfig, 'r+');
  fs.writeFile(file, output, error => {
    if (error)
      console.error("An error occurred while overwriting Angular CLI's Webpack config");

    fs.close(file, () => {});
  });
});
