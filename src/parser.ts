import { input, select, confirm } from '@inquirer/prompts'
import { DefaultTheme } from './constants/themes.ts';
import { CommitTypes } from './constants/types.ts';
import chalk from 'chalk';

export async function parser(options: any): Promise<void> {

    const commitType = await select({
        message: 'Which type of change are you commiting:',
        choices: CommitTypes,
        pageSize: CommitTypes.length,
        theme: DefaultTheme
    });

    const commitScope = await input({
        message: 'What is the scope of this change (press [enter] to skip):',
        theme: { ...DefaultTheme, validationFailureMode: 'clear' },
        validate: (scope) => {
            if (scope.length === 0) {
                return true;
            }
            if ((scope.length > 10) || (scope.length < 2)) {
                return 'The scope length must be between 2 and 10 characters!';
            }
            return true;
        }
    });

    const commitDescription = await input({
        message: 'Write a short summary of the code changes:',
        theme: { ...DefaultTheme, validationFailureMode: 'keep' },
        validate: (description) => {
            if ((description.length > 50) || (description.length < 3) /* TODO: Apply the length limit set with --length option (or default value) */ ) {
                return 'The description length must be between 3 and 50 characters!';
            }
            return true;
        }
    });

    const commitBreakingChange = await confirm({
        message: 'Is this a BREAKING CHANGE:',
        default: false,
        theme: DefaultTheme
    });

    let commitMessage = commitType;
    if (commitScope.length !== 0) {
        commitMessage += `(${commitScope})`;
    }
    if (commitBreakingChange) {
        commitMessage += '!';
    }

    commitMessage += `: ${commitDescription}`;
    console.log('\n' + chalk.blueBright(commitMessage.toLowerCase()));
}