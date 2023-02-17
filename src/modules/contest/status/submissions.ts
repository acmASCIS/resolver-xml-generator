import  {CodeforcesClient} from '../../../../../../codeforces-client/build/CodeforcesClient';




export const GetAllSubmissions = async(key:string,secret:string,contestId:string)=>{

    const client = new CodeforcesClient(key,secret);
    const apiResponse =  await client.contest.status({contestId:contestId});
    if(apiResponse.status=="OK"){
        apiResponse.result.forEach(result => {
            console.log(result);
            
        })
    }
    
    return Array.from(handleSet);

    
};
