var chalk = require('chalk');

module.exports = {
    exit: function(text) {
        if (text instanceof Error) {
            console.error(chalk.red(text.message || text.stack));
        } else {
            console.error(chalk.red(text));
        }
        process.exit(1);
    },
    error: function(text) {
        if (text instanceof Error) {
            console.error(chalk.red(text.message || text.stack));
        } else {
            console.error(chalk.red(text));
        }
    }
}
