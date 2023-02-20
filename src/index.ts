import { Command } from 'commander';
import CodeforcesClient from '@acmascis/codeforces-client';

import { GetAllProblems } from './services/problems';
import { getStatusData } from './services/status';
import { generateContestXML } from './xmlGenerator/contestXML';
import { GetAwards } from './services/awards';
import { WriteToXmlFile } from './utils/fileManager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const main = (async function () {
    const program = new Command();

    program
        .requiredOption('--key <key>', 'cf api key')
        .requiredOption('--secret <secret>', 'cf api secret')
        .requiredOption('--contest <contest-id>', 'cf contest id');
    program.parse(process.argv);

    const { key, secret, contest } = program.opts();
    const client = new CodeforcesClient(key, secret);

    const { standings, problems } = await GetAllProblems(client, contest);
    const { handlesIds, submissions } = await getStatusData(client, contest);
    const awards = await GetAwards(standings, problems, handlesIds, submissions);
    const contestXML = await generateContestXML(problems, handlesIds, submissions, awards);
    WriteToXmlFile('contest', contestXML);
})();
