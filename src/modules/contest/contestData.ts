import CodeforcesClient from '@acmascis/codeforces-client';
import { Member } from '@acmascis/codeforces-client/build/interfaces/member.interface';
import { Problem } from '@acmascis/codeforces-client/build/interfaces/problem.interface';
import { handleFormat } from '../../xmlGenerator/contest/xmlHandles';
import { problemFormat } from '../../xmlGenerator/contest/xmlProblems';
import { submissionFormat } from '../../xmlGenerator/contest/xmlSubmissions';


export const GetAllHandles = async(client:CodeforcesClient, contestId:string)=>{

    var memebers:Member[] = [];
    const apiResponse =  await client.contest.status({contestId:contestId});
    if(apiResponse.status=="OK"){
        apiResponse.result.forEach(async result => {
                result.author.members.forEach(memeber => {
                    memebers.push(memeber)
                });
        })
        return handleFormat(memebers)
    }
    return 0;
    
};

export const GetAllProblems = async(client:CodeforcesClient,contestId:string )=>{

    
    var problems:Problem[] = [];
    const apiResponse =  await client.contest.standings({contestId:contestId});
    if(apiResponse.status=="OK"){
    await apiResponse.result.problems.forEach(problemDetails => {
     problems.push(problemDetails);
});
    
return problemFormat(problems)
 
}};


export const GetAllSubmissions = async(client:CodeforcesClient, contestId:string)=>{

    const apiResponse =  await client.contest.status({contestId:contestId});
    if(apiResponse.status=="OK"){
       return submissionFormat(apiResponse.result);
    }

}