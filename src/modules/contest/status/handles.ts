import  {CodeforcesClient} from '../../../../../../codeforces-client/build/CodeforcesClient';




export const GetAllHandles = async(key:string,secret:string,contestId:string)=>{

    const client = new CodeforcesClient(key,secret);
    // var handleSet:Set<string> = new Set();
    const apiResponse =  await client.contest.status({contestId:contestId});
    if(apiResponse.status=="OK"){
        apiResponse.result.forEach(result => {
            return result.author.members;
        })
    }
    
    // return Array.from(handleSet);

    
};
