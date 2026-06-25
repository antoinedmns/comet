import chalk from 'chalk';

export const DefaultTheme = {
    prefix: chalk.yellow('?'),
    style: {
        answer: chalk.yellow,
        highlight: chalk.yellow,
        description: chalk.yellow,
        error: (message: string) => chalk.red.bold(`! ${message}`)
    }
} as const;