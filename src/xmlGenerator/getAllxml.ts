
import { contestInfo } from "./contest/xmlContest";
import { problemFormat } from "./contest/xmlProblems";
import CodeforcesClient from "@acmascis/codeforces-client";
import { GetAllHandles, GetAllProblems, GetAllSubmissions } from "../modules/contest/contestData";


export const getAllData = async (client:CodeforcesClient,contestId:string) => {
  var problems = await GetAllProblems(client,contestId)
  var handles = await GetAllHandles(client,contestId)
  var submissions = await GetAllSubmissions(client,contestId)

  var allContestData =
  `${contestInfo}
  ${problems}
  ${handles}
  ${submissions}
  </contest>
  `
return allContestData;
}

