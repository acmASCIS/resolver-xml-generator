import { Problem } from "../../../../../codeforces-client/build/interfaces/problem.interface";
import { Submission } from "../../../../../codeforces-client/build/interfaces/submission.interface";
import { handlesMap } from "./xmlHandles";

export const submissionFormat = async(submissions:Submission[])=>{
    var str:string = "";
    for (let index = 0; index < submissions.length; index++){
        var id = index+1;
        var solved = "true";
        var result = "ACC"
        var problem = submissions[index].problem.index.charCodeAt(0) - 64;
        if(submissions[index].verdict!= "OK"){
            solved = "false"
            result = "WA"
        }
        

        var currentSubmissionFormat:string=
        `<run>
        <judged>true</judged>
        <solved>${solved}</solved>
        <result>${result}</result>
        <id>${submissions[index].id}</id>
        <problem>${problem}</problem>
        <team>${handlesMap.get(submissions[index].author.members[0].handle)}</team>
        <time>${submissions[index].timeConsumedMillis}</time>
            </run>`;
          
        str+=currentSubmissionFormat;    
    }
   
    
    return str;
}