import chalk from 'chalk';
import type { ExecException } from 'child_process';

export const DefaultTheme = {
    prefix: chalk.yellow('?'),
    style: {
        answer: chalk.yellow,
        highlight: chalk.yellow,
        description: chalk.yellow,
        error: (message: string) => chalk.red.bold(`! ${message}`)
    }
} as const;

export function logSuccess(message: string): void { console.log(chalk.greenBright(`\n${message}`)); }
export function logError(message: string): void { console.log(chalk.red.bold(`\n! ${message}`)); }
export function logDebug(message: ExecException | string): void { console.log(chalk.gray(`${message}`)); }