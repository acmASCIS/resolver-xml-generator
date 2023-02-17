import { Command } from 'commander';
import {CodeforcesClient} from '../../../codeforces-client/build/CodeforcesClient';
import { Problem } from '../../../codeforces-client/build/interfaces/problem.interface';
import { GetAllProblems } from './modules/contest/standings/problems';
import { GetAllHandles } from './modules/contest/status/handles';
import { handleFormat } from './xmlGenerator/contest/xmlHandles';
import { problemFormat } from './xmlGenerator/contest/xmlProblems';



const main = async() => {
  // const client = new CodeforcesClient("e0b254abd488218b98538f9393a7678011170da3","44a91c5fb0dc4cd0f02ea0bebaf5aeb1a0529845");
  // var result = await client.contest.status({contestId:"232207", count:5})
  // if(result.status=="OK"){
  //   var auth = result.result[0].author;
  //   console.log(auth);
    

  // }
  
  var result = await GetAllProblems("e0b254abd488218b98538f9393a7678011170da3","44a91c5fb0dc4cd0f02ea0bebaf5aeb1a0529845","232207");
  if(result != undefined){
    result = result;
    console.log(await problemFormat(result));
    
  }


  


  
}
main()

// const program = new Command();

// program
//   .requiredOption('--contest <contest-id>', 'cf contest id')
//   .requiredOption('--api-key <api-key>', 'cf api key');

// program.parse(process.argv);

// const { contest, apiKey } = program.opts();

// // Parsing code here
// console.info('[PLEASE REMOVE ME] generating XML');
