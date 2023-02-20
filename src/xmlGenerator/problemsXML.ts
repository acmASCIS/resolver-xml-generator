import xml from 'xml';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';

export const generateProblemsXML = async (problems: Problem[]) => {
    let problemsXML = '',
        id = 0;
    problems.forEach((problem) => {
        problemsXML += xml({
            problem: [{ id: ++id }, { label: problem.index }, { letter: problem.index }],
        });
    });
    return problemsXML;
};
