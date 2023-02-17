import  {CodeforcesClient} from '../../../../../../codeforces-client/build/CodeforcesClient';
import { Problem } from '../../../../../../codeforces-client/build/interfaces/problem.interface';




export const GetAllProblems = async(key:string,secret:string,contestId:string)=>{

    const client = new CodeforcesClient(key,secret);
    var problems:Problem[] = [];
    const apiResponse =  await client.contest.standings({contestId:contestId});
    if(apiResponse.status=="OK"){
    await apiResponse.result.problems.forEach(problemDetails => {
     problems.push(problemDetails);
});
    
return problems as Problem[];
    
}};
