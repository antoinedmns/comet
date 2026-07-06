import { Command, Option } from 'commander';
import { parser } from './parser.js';
const program = new Command();

program
    .name('comet')
    .description('CLI tool for conventional commits.')
    .version('0.0.1');

program.command('commit')
    .description('Create a new commit.')
    .addOption(new Option('--dry-run', 'Perform a dry run without executing any commands.').conflicts(['add', 'push', 'sign']))
    .addOption(new Option('-c, --copy', 'Copy the commit message to your clipboard instead of committing.').conflicts(['push', 'sign']))
    .addOption(new Option('-a, --add', 'Automatically stage all created, deleted or modified files.'))
    .addOption(new Option('-p, --push', 'Automatically push staged files from the local to the remote repository.'))
    .addOption(new Option('-s, --sign', 'Sign your commit.'))
    .addOption(new Option('-d, --debug', 'Display the debug output.'))
    .addOption(new Option('-l, --length <number>', 'Set the length limit of the message.'))
    .action((options) => {
        parser(options)
    })
;

program.parse();