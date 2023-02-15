import { Command } from 'commander';

const program = new Command();

program
  .requiredOption('--contest <contest-id>', 'cf contest id')
  .requiredOption('--api-key <api-key>', 'cf api key');

program.parse(process.argv);

const { contest, apiKey } = program.opts();

// Parsing code here
console.info('[PLEASE REMOVE ME] generating XML');
