import CodeforcesClient from '@acmascis/codeforces-client';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';
import { Standings } from '@acmascis/codeforces-client/build/interfaces/standings.interface';

export const getAllProblems = async (client: CodeforcesClient, contestId: string) => {
    const standingsResponse = await client.contest.standings({ contestId: contestId });
    const problems: Problem[] = [];
    if (standingsResponse.status === 'FAILED') {
        console.error('Failed to fetch contest standings: ', standingsResponse.comment);
        process.exit(1);
    }
    const standings: Standings = standingsResponse.result;
    standingsResponse.result.problems.forEach((problemDetails) => {
        problems.push(problemDetails);
    });
    return { standings, problems };
};
