import xml from 'xml';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';

import { generateProblemsXML } from './problemsXML';
import { generateTeamsXML } from './handlesXML';
import { generateSubmissionsXML } from './submissionsXML';
import { generateAwardsXML } from './awardsXML';

const contestInfo = xml([
    {
        info: [
            { 'contest-id': 1 },
            { title: 'AinShams University ACMASCIS Level 1 Contest' },
            { 'short-title': 'Level 1 Contest' },
            { length: '05:00:00' },
            { 'scoreboard-freeze-length': '01:00:00' },
            { 'penalty-amount': 20 },
        ],
    },
    {
        judgement: [{ acronym: 'ACC' }, { name: 'Accepted' }, { penalty: 'true' }, { solved: 'true' }],
    },
    {
        judgement: [{ acronym: 'WA' }, { name: 'Wrong Answer' }, { penalty: 'true' }, { solved: 'false' }],
    },
]);

export const generateContestXML = async (
    problems: Problem[],
    handlesIds: { [handle: string]: number },
    submissions: Submission[],
    awards: { [id: number]: { teamId: number; citation: string } },
) => {
    const problemsXML = await generateProblemsXML(problems);
    const teamsXML = await generateTeamsXML(handlesIds);
    const submissionsXML = await generateSubmissionsXML(submissions, handlesIds);
    const awardsXML = await generateAwardsXML(awards);

    const contestXML =
        xml([{}], { declaration: true }) +
        `<contest> ${contestInfo} ${problemsXML} ${teamsXML} ${submissionsXML} ${awardsXML} </contest>`;
    return contestXML;
};
