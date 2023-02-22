import _ from 'lodash';
import CodeforcesClient from '@acmascis/codeforces-client';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';

export const getStatusData = async (client: CodeforcesClient, contestId: string) => {
    const contestStatus = await client.contest.status({ contestId: contestId });
    if (contestStatus.status === 'FAILED') {
        console.error('Failed to fetch contest status: ', contestStatus.comment);
        process.exit(1);
    }
    const handlesIds = await getHandles(contestStatus.result);
    const submissions = await getSubmissions(contestStatus.result);

    return { handlesIds, submissions };
};

const getHandles = async (submissions: Submission[]) => {
    let id = 0;
    const handlesIds: { [handle: string]: number } = {};
    submissions.forEach((submission) => {
        handlesIds[submission.author.members[0].handle] = ++id;
    });
    return handlesIds;
};

const getSubmissions = async (submissions: Submission[]) => {
    submissions = _.filter(submissions, (submission) => submission.author.participantType === 'CONTESTANT');
    return submissions;
};
