import { Command } from 'commander';
import CodeforcesClient from '@acmascis/codeforces-client';

import { getAllProblems } from './services/problems';
import { getStatusData } from './services/status';
import { generateContestXML } from './xmlGenerator/contestXML';
import { getAwards } from './services/awards';
import { WriteToXmlFile } from './utils/fileManager';

(async function () {
    const program = new Command();

    program
        .requiredOption('--key <key>', 'cf api key')
        .requiredOption('--secret <secret>', 'cf api secret')
        .requiredOption('--contest <contest-id>', 'cf contest id');
    program.parse(process.argv);

    const { key, secret, contest } = program.opts();
    const client = new CodeforcesClient(key, secret);

    const { standings, problems } = await getAllProblems(client, contest);
    const { handlesIds, submissions } = await getStatusData(client, contest);
    const awards = await getAwards(standings, problems, handlesIds, submissions);
    const contestXML = await generateContestXML(problems, handlesIds, submissions, awards);
    WriteToXmlFile('contest', contestXML);
})();
