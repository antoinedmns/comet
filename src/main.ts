import { Command } from 'commander';
import { parser } from './parser.ts';
const program = new Command();

program
    .name('comet')
    .description('CLI tool for conventional commits.')
    .version('0.0.1');

program.command('commit')
    .description('Create a new commit.')
    .option('--dry-run', 'Perform a dry run without executing any commands.')
    .option('-r, --retry', 'Retry the last commit.')
    .option('-c, --copy', 'Copy the commit message to your clipboard instead of committing.')
    .option('-a, --add', 'Automatically stage all created, deleted or modified files.')
    .option('-p, --push', 'Automatically push staged files from the local to the remote repository.')
    .option('-s, --sign', 'Sign your commit.')
    .option('-l, --lenght <number>', 'Set the length limit of the message.')
    .action((options) => {
        parser(options)
    })
;

program.parse();