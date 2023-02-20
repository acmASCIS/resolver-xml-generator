import CodeforcesClient from '@acmascis/codeforces-client';
import { ApiResponse } from '@acmascis/codeforces-client/build/interfaces/api-response.interface';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';

export const getStatusData = async (client: CodeforcesClient, contestId: string) => {
    const contestStatus = await client.contest.status({ contestId: contestId });
    const handlesIds = await getHandles(contestStatus);
    const submissions = await getSubmissions(contestStatus);

    return { handlesIds, submissions };
};

const getHandles = async (contestStatus: ApiResponse<Submission[]>) => {
    let id = 0;
    const handlesIds: { [handle: string]: number } = {};
    if (contestStatus.status === 'OK') {
        contestStatus.result.forEach((result) => {
            handlesIds[result.author.members[0].handle] = ++id;
        });
    }
    return handlesIds;
};

const getSubmissions = async (contestStatus: ApiResponse<Submission[]>) => {
    let submissions: Submission[] = [];
    if (contestStatus.status === 'OK') {
        submissions = contestStatus.result;
    }
    return submissions;
};
