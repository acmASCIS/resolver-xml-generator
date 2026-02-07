# Resolver XML generator

A contest data converter that generates an XML file accepted by the ICPC Resolver tool.

## Overview

This tool fetches contest data from Codeforces and produces an XML file that the ICPC Resolver uses to run a blind-hour presentation showing awards and final standings.

## Important notes

- To include submissions that happened after the blind hour, you must first *unfreeze the contest on Codeforces* before generating the XML.
- After generation, copy the produced XML file into the Resolver installation folder (the same folder that contains `resolver.sh` / `resolver.bat`).
- This project is compatible with Resolver version `resolver-2.3.514`. Newer Resolver versions may not work — install `resolver-2.3.514` from ICPC Tools if needed.

## How to run

1. Generate the XML using this project. From the project root you can run (example):

```powershell
npx ts-node src/index.ts --key=<CF_API_KEY> --secret=<CF_API_SECRET> --contest=<CONTEST_ID>
```

Or, if you built the project, run the built script:

```powershell
node build/index.js --key=<CF_API_KEY> --secret=<CF_API_SECRET> --contest=<CONTEST_ID>
```

2. Copy the generated XML (e.g., `contest.xml`) into the Resolver folder.

3. Run the Resolver to present the blind-hour results. From the Resolver folder run:

- On Linux/macOS (run the shell wrapper inside the Resolver directory):

```bash
sh resolver.sh contest.xml --test --singleStep 999
```

- On Windows (run the batch file inside the Resolver directory):

```powershell
resolver.bat contest.xml --test --singleStep 999
```

4. Refer to the Resolver README in the Resolver folder for presentation controls and advanced options.

## Output

- The generated XML should be copied to the Resolver folder and used as the input file for the Resolver command above.

