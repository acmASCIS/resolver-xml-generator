/* eslint-disable @typescript-eslint/no-non-null-assertion */

import _ from 'lodash';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';
import { RanklistRow } from '@acmascis/codeforces-client/build/interfaces/rank.list.row.interface';

let id = 0;
export const getAwards = async (
    standings: RanklistRow[],
    problems: Problem[],
    handlesIds: { [handle: string]: number },
    submissions: Submission[],
) => {
    const awards: { [id: number]: { teamId: number; citation: string } } = {
        ...getExtremeProgrammer(handlesIds, submissions),
        ...getSteadfastGuru(handlesIds, submissions),
        ...getSolidAndRelentless(handlesIds, submissions),
        ...getFirstToSolve(problems, handlesIds, submissions),
        ...getMedals(standings, handlesIds),
    };
    return awards;
};

const getExtremeProgrammer = (handlesIds: { [handle: string]: number }, submissions: Submission[]) => {
    const awards: { [id: number]: { teamId: number; citation: string } } = [];
    const sortedSubmissions = _.sortBy(submissions, ['relativeTimeSeconds', 'creationTimeSeconds']);

    const extremeProgrammerHandle = _.find(sortedSubmissions, (data) => data.verdict === 'OK')
        ?.author.members[0].handle;
    awards[++id] = { teamId: handlesIds[extremeProgrammerHandle!], citation: 'Extreme Programmer' };

    return awards;
};

const getSteadfastGuru = (handlesIds: { [handle: string]: number }, submissions: Submission[]) => {
    const awards: { [id: number]: { teamId: number; citation: string } } = [];
    const sortedSubmissions = _.sortBy(submissions, ['relativeTimeSeconds', 'creationTimeSeconds']);

    const steadfastGuruHandle = _.findLast(sortedSubmissions, (data) => data.verdict === 'OK')
        ?.author.members[0].handle;
    awards[++id] = { teamId: handlesIds[steadfastGuruHandle!], citation: 'Steadfast Guru' };
    return awards;
};

const getSolidAndRelentless = (handlesIds: { [handle: string]: number }, submissions: Submission[]) => {
    const awards: { [id: number]: { teamId: number; citation: string } } = [];
    const statusGroupedByHandles = _.groupBy(submissions, (status) => status.author.members[0].handle);
    let solidContestant = '',
        maxScore = -1,
        solidLastAcceptedTime = Infinity,
        lastAcceptedTime = Infinity,
        relentlessContestant = '',
        maxTrials = -1,
        relentlessAcceptedTime = Infinity;

    for (const handle in statusGroupedByHandles) {
        const contestantSubmissions = _.groupBy(
            statusGroupedByHandles[handle],
            (submission) => submission.problem.index,
        );
        let score = 0;
        for (const index in contestantSubmissions) {
            if (contestantSubmissions[index].length === 1 && contestantSubmissions[index][0].verdict === 'OK') {
                score++;
                lastAcceptedTime = contestantSubmissions[index][0].relativeTimeSeconds;
            }

            const found = _.find(contestantSubmissions[index], (data) => data.verdict === 'OK');
            const trials =
                contestantSubmissions[index].length -
                _.countBy(contestantSubmissions[index], (data) => data.verdict === 'COMPILATION_ERROR').true;
            if (
                found !== undefined &&
                (trials > maxTrials || (trials === maxTrials && found.relativeTimeSeconds < relentlessAcceptedTime))
            ) {
                maxTrials = trials;
                relentlessContestant = handle;
                relentlessAcceptedTime = found.relativeTimeSeconds;
            }
        }
        if (score > maxScore || (score === maxScore && lastAcceptedTime < solidLastAcceptedTime)) {
            maxScore = score;
            solidContestant = handle;
            solidLastAcceptedTime = lastAcceptedTime;
        }
    }
    awards[++id] = { teamId: handlesIds[solidContestant!], citation: `Solid Programmer With ${maxScore} Problems` };
    awards[++id] = {
        teamId: handlesIds[relentlessContestant!],
        citation: `Relentless programmer With ${maxTrials} Submissions`,
    };
    return awards;
};

const getFirstToSolve = (problems: Problem[], handlesIds: { [handle: string]: number }, submissions: Submission[]) => {
    const awards: { [id: number]: { teamId: number; citation: string } } = [];
    const problemsIndex: string[] = [];
    problems.forEach((problem) => problemsIndex.push(problem.index));

    const firstToSolveData = _.sortBy(submissions, ['problem.index', 'relativeTimeSeconds', 'creationTimeSeconds']);
    problemsIndex.forEach((index) => {
        const firstToSolve = _.find(firstToSolveData, (data) => data.problem.index === index && data.verdict === 'OK');
        const firstToSolveHandle = firstToSolve?.author.members[0].handle;
        awards[++id] = {
            teamId: handlesIds[firstToSolveHandle!],
            citation: `First to solve problem ${index}`,
        };
    });
    return awards;
};

const getMedals = (standings: RanklistRow[], handlesIds: { [handle: string]: number }) => {
    const awards: { [id: number]: { teamId: number; citation: string } } = [];
    for (let i = 0; i < 4; i++) {
        const goldMedalHandle = standings[i].party.members[0].handle;
        awards[++id] = { teamId: handlesIds[goldMedalHandle!], citation: 'Gold Medalist' };
    }
    for (let i = 4; i < 8; i++) {
        const silverMedalHandle = standings[i].party.members[0].handle;
        awards[++id] = { teamId: handlesIds[silverMedalHandle!], citation: 'Silver Medalist' };
    }
    for (let i = 8; i < 12; i++) {
        const bronzeMedalHandle = standings[i].party.members[0].handle;
        awards[++id] = { teamId: handlesIds[bronzeMedalHandle!], citation: 'Bronze Medalist' };
    }
    return awards;
};
