import CodeforcesClient from '@acmascis/codeforces-client';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';
import { Standings } from '@acmascis/codeforces-client/build/interfaces/standings.interface';

export const GetAllProblems = async (client: CodeforcesClient, contestId: string) => {
    const standingsResponse = await client.contest.standings({ contestId: contestId });
    const problems: Problem[] = [];
    let standings!: Standings;
    if (standingsResponse.status === 'OK') {
        standings = standingsResponse.result;
        standingsResponse.result.problems.forEach((problemDetails) => {
            problems.push(problemDetails);
        });
    }
    return { standings, problems };
};
