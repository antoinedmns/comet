const CommitPrefixes = {
    feat: 'feat',
    fix: 'fix',
    build: 'build',
    docs: 'docs',
    refactor: 'refactor',
    test: 'test',
    perf: 'perf',
    style: 'style',
    ci: 'ci'
} as const;

export const CommitTypes = [
    {
        name: 'feat',
        value: CommitPrefixes.feat,
        description: 'A new feature.'
    },
    {
        name: 'fix',
        value: CommitPrefixes.fix,
        description: 'A bug fix.'
    },
    {
        name: 'build',
        value: CommitPrefixes.build,
        description: 'Changes that affect the build system or external dependencies.'
    },
    {
        name: 'docs',
        value: CommitPrefixes.docs,
        description: 'Documentation only changes.'
    },
    {
        name: 'refactor',
        value: CommitPrefixes.refactor,
        description: 'A code change that neither fixes a bug nor adds a feature.'
    },
    {
        name: 'test',
        value: CommitPrefixes.test,
        description: 'Adding missing tests or correcting existing tests.'
    },
    {
        name: 'perf',
        value: CommitPrefixes.perf,
        description: 'A code change that improves performance.'
    },
    {
        name: 'style',
        value: CommitPrefixes.style,
        description: 'Changes that do not affect the meaning of the code.'
    },
    {
        name: 'ci',
        value: CommitPrefixes.ci,
        description: 'Changes to our CI configuration files and scripts.'
    }
] as const;