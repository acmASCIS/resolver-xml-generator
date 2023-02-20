/* eslint-disable @typescript-eslint/no-non-null-assertion */

import _ from 'lodash';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';
import { Standings } from '@acmascis/codeforces-client/build/interfaces/standings.interface';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';

let id = 0;
const awards: { [id: number]: { teamId: number; citation: string } } = {};

export const GetAwards = async (
    standings: Standings,
    problems: Problem[],
    handlesIds: { [handle: string]: number },
    submissions: Submission[],
) => {
    await getFirstTwo(handlesIds, submissions);
    await getSecondTwo(handlesIds, submissions);
    await getFirstToSolve(problems, handlesIds, submissions);
    await getMedals(standings, handlesIds);
    return awards;
};

const getFirstTwo = async (handlesIds: { [handle: string]: number }, submissions: Submission[]) => {
    const sortedSubmissions = _.sortBy(submissions, ['relativeTimeSeconds', 'creationTimeSeconds']);

    const extremeProgrammerHandle = _.find(
        sortedSubmissions,
        (data) => data.author.participantType === 'CONTESTANT' && data.verdict === 'OK',
    )?.author.members[0].handle;
    awards[++id] = { teamId: handlesIds[extremeProgrammerHandle!], citation: 'Extreme Programmer' };

    const steadfastGuruHandle = _.findLast(
        sortedSubmissions,
        (data) => data.author.participantType === 'CONTESTANT' && data.verdict === 'OK',
    )?.author.members[0].handle;
    awards[++id] = { teamId: handlesIds[steadfastGuruHandle!], citation: 'Steadfast Guru' };
};

const getSecondTwo = async (handlesIds: { [handle: string]: number }, submissions: Submission[]) => {
    const contestantsStatus = _.filter(submissions, (status) => status.author.participantType === 'CONTESTANT');
    const statusGroupedByHandles = _.groupBy(contestantsStatus, (status) => status.author.members[0].handle);
    let solidContestant = '',
        maxScore = -1,
        relentlessContestant = '',
        maxTrials = -1;

    for (const handle in statusGroupedByHandles) {
        const contestantSubmissions = _.groupBy(
            statusGroupedByHandles[handle],
            (submission) => submission.problem.index,
        );
        let score = 0;
        for (const index in contestantSubmissions) {
            if (contestantSubmissions[index].length === 1 && contestantSubmissions[index][0].verdict === 'OK') score++;

            const found = _.find(contestantSubmissions[index], (data) => data.verdict === 'OK');
            if (found !== undefined && contestantSubmissions[index].length > maxTrials) {
                maxTrials = contestantSubmissions[index].length;
                relentlessContestant = handle;
            }
        }
        if (score > maxScore) {
            maxScore = score;
            solidContestant = handle;
        }
    }
    awards[++id] = { teamId: handlesIds[solidContestant!], citation: `Solid Programmer With ${maxScore} Problems` };
    awards[++id] = {
        teamId: handlesIds[relentlessContestant!],
        citation: `Relentless programmer With ${maxTrials} Submissions`,
    };
};

const getFirstToSolve = async (
    problems: Problem[],
    handlesIds: { [handle: string]: number },
    submissions: Submission[],
) => {
    const problemsIndex: string[] = [];
    problems.forEach((problem) => problemsIndex.push(problem.index));

    const firstToSolveData = _.sortBy(submissions, ['problem.index', 'relativeTimeSeconds', 'creationTimeSeconds']);
    problemsIndex.forEach((index) => {
        const firstToSolve = _.find(
            firstToSolveData,
            (data) =>
                data.author.participantType === 'CONTESTANT' && data.problem.index === index && data.verdict === 'OK',
        );
        const firstToSolveHandle = firstToSolve?.author.members[0].handle;
        awards[++id] = {
            teamId: handlesIds[firstToSolveHandle!],
            citation: `First to solve problem ${index}`,
        };
    });
};

const getMedals = async (standings: Standings, handlesIds: { [handle: string]: number }) => {
    const standing = _.filter(standings.rows, (row) => row.party.participantType === 'CONTESTANT');
    const goldMedalHandle = standing[0].party.members[0].handle;
    const silverMedalHandle = standing[1].party.members[0].handle;
    const bronzeMedalHandle = standing[2].party.members[0].handle;
    awards[++id] = { teamId: handlesIds[goldMedalHandle!], citation: 'Gold Medalist' };
    awards[++id] = { teamId: handlesIds[silverMedalHandle!], citation: 'Silver Medalist' };
    awards[++id] = { teamId: handlesIds[bronzeMedalHandle!], citation: 'Bronze Medalist' };
};
