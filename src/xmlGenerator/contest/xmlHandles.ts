import { Member } from "../../../../../codeforces-client/build/interfaces/member.interface";

export const handleFormat = async(members:Member[])=>{
    var handleSet:Set<string> = new Set();
    
    members.forEach(member => {
        handleSet.add(member.handle)
    });
    const handleArray = Array.from(handleSet);

    var str:string = "";
    for (let index = 0; index < handleArray.length; index++){
        var id = index+1;
        var currentHandleFormat:string=
            `<team>
            <id> ${id} </id>
            <name> ${handleArray[index]} </name>
            <university> AinShames </university>
            <nationality> Egyption </nationality>
            <icpc-id> ${id} </icpc-id>
            </team>`
        
        
        str+=currentHandleFormat;
0       
    }
   
    
    return str;
}