import { Problem } from "../../../../../codeforces-client/build/interfaces/problem.interface";

export const problemFormat = async(problems:Problem[])=>{
    var str:string = "";
    for (let index = 0; index < problems.length; index++){
        var id = index+1;
        var currentProblemFormat:string=
        `<problem>
        <id> ${id} </id>
        <label> ${problems[index].name} </label>
        <letter> ${problems[index].index} </letter>
        </problem>`;
        
        
        str+=currentProblemFormat;       
    }
   
    
    return str;
}