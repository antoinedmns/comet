import { input, select, confirm } from '@inquirer/prompts'
import { DefaultTheme, logDebug, logError, logInfo, logSuccess } from './constants/themes.js';
import { CommitTypes } from './constants/types.js';
import { spawnSync } from 'child_process';
import clipboard from 'clipboardy';

const DESCRIPTION_MAX_DEFAULT = 50;
const SCOPE_MAX_DEFAULT = 10;
const PARAGRAPH_MAX_DEFAULT = 72;
const BREAKING_CHANGE_MAX_DEFAULT = 72;
const FOOTER_MAX_DEFAULT = 72;

export async function parser(options: any): Promise<void> {

    // Initial verification (if no dry run option) to check if Git is properly installed
    if (!options.dryRun) {
        const gitCheck = spawnSync('git', { encoding: 'utf8' });

        if (gitCheck.error) {
            logError('Git is not installed or can\'t be found.');
            if (options.debug) {
                logDebug(gitCheck.error.message);
            }
            return;
        }
    }

    const descriptionMaxLength = parseInt(options.length ?? DESCRIPTION_MAX_DEFAULT); // Set the maximum description length

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
            if ((scope.length > SCOPE_MAX_DEFAULT) || (scope.length < 2)) {
                return `The scope length must be between 2 and ${SCOPE_MAX_DEFAULT} characters!`;
            }
            return true;
        }
    });

    const commitSummary = await input({
        message: 'Write a short summary of the code changes:',
        theme: { ...DefaultTheme, validationFailureMode: 'keep' },
        validate: (description) => {
            if ((description.length > descriptionMaxLength) || (description.length < 3)) {
                return `The summary length must be between 3 and ${descriptionMaxLength} characters!`;
            }
            return true;
        }
    });

    const commitParagraph = await input({
        message: 'Provide additional contextual information about the code changes (press [enter] to skip):',
        theme: { ...DefaultTheme, validationFailureMode: 'keep' },
        validate: (scope) => {
            if (scope.length === 0) {
                return true;
            }
            if ((scope.length > PARAGRAPH_MAX_DEFAULT) || (scope.length < 2)) {
                return `The paragraph length must be between 2 and ${PARAGRAPH_MAX_DEFAULT} characters!`;
            }
            return true;
        }
    });

    const commitBreakingChange = await confirm({
        message: 'Is this a BREAKING CHANGE:',
        default: false,
        theme: DefaultTheme
    });

    let commitBreakingChangeFooter = '';

    if (commitBreakingChange) {
        commitBreakingChangeFooter = await input({
            message: 'Write an explanation about the BREAKING CHANGE (press [enter] to skip):',
            theme: { ...DefaultTheme, validationFailureMode: 'keep' },
            validate: (scope) => {
                if (scope.length === 0) {
                    return true;
                }
                if ((scope.length > BREAKING_CHANGE_MAX_DEFAULT) || (scope.length < 2)) {
                    return `The BREAKING CHANGE explanation length must be between 2 and ${BREAKING_CHANGE_MAX_DEFAULT} characters!`;
                }
                return true;
            }
        });
    }

    let commitBodyFooter = await input({
        message: 'Write a short footer to reference related issues or tickets (press [enter] to skip):',
        theme: { ...DefaultTheme, validationFailureMode: 'keep' },
        validate: (scope) => {
            if (scope.length === 0) {
                return true;
            }
            if ((scope.length > FOOTER_MAX_DEFAULT) || (scope.length < 2)) {
                return `The footer length must be between 2 and ${FOOTER_MAX_DEFAULT} characters!`;
            }
            return true;
        }
    });

    let commitMessage: string = commitType;

    if (commitScope) {
        commitMessage += `(${commitScope})`;
    }

    if (commitBreakingChange) {
        commitMessage += '!';
    }

    commitMessage += commitParagraph ? `: ${commitSummary}\n\n${commitParagraph}` : `: ${commitSummary}`;

    const footerParts: string[] = [];

    if (commitBreakingChange && commitBreakingChangeFooter) {
        footerParts.push(`BREAKING CHANGE: ${commitBreakingChangeFooter}`);
    }

    if (commitBodyFooter) {
        footerParts.push(commitBodyFooter);
    }

    const commitFooter = footerParts.join('\n');

    if (commitFooter) {
        commitMessage += `\n\n${commitFooter}`;
    }

    commitMessage = commitMessage.toLocaleLowerCase();

    if (options.add) {
        const gitAdd = spawnSync('git', ['add', '-A'], { encoding: 'utf8' });

        if (options.debug) {
            logDebug(gitAdd.stdout);
        }

        if (gitAdd.status !== 0) {
            logError('An error occurred while trying to stage all created, deleted or modified files.');
            return;
        }
    }

    if (options.copy) {
        await clipboard.write(commitMessage);

        logSuccess('The commit message has been successfully copied to your clipboard.');
        return;
    }

    if (options.dryRun) {
        logInfo(commitMessage);

        logSuccess('The dry run has been successfully performed.');
        return;
    } else {
        let gitCommitParameters = ['commit', '-m', commitMessage];
        
        if (options.sign) {
            gitCommitParameters.push('-s')
        }
        const gitCommit = spawnSync('git', gitCommitParameters, { encoding: 'utf8' });

        if (options.debug) {
            logDebug(gitCommit.stdout)
        }

        if (gitCommit.status !== 0) {
            logError('An error occured while trying to create a new commit.');
            return;
        }

        logSuccess('The new commit has been successfully created.');
    }

    if (options.push) {
        const gitPush = spawnSync('git', ['push'], { encoding: 'utf8'});

        if (gitPush.status !== 0) {
            logError('An error occured while trying to push staged files from the local to the remote repository.');
            if (options.debug) {
                logDebug(gitPush.stdout);
            }
            return;
        }

        if (options.debug) {
            logDebug(gitPush.stdout)
        }

        logSuccess('The staged files has been successfully push from the local to the remote repository.');
    }
}