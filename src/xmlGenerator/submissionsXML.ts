import xml from 'xml';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';

export const generateSubmissionsXML = async (submissions: Submission[], handlesIds: { [handle: string]: number }) => {
    let submissionsXML = '',
        id = 0;
    submissions.forEach((submission) => {
        let solved = 'false',
            verdict = 'WA';
        if (submission.verdict === 'OK') {
            solved = 'true';
            verdict = 'ACC';
        }
        submissionsXML += xml({
            run: [
                { judged: 'true' },
                { solved: solved },
                { result: verdict },
                { id: ++id },
                { problem: submission.problem.index.charCodeAt(0) - 64 },
                { team: handlesIds[submission.author.members[0].handle] },
                { time: submission.relativeTimeSeconds },
            ],
        });
    });
    return submissionsXML;
};
