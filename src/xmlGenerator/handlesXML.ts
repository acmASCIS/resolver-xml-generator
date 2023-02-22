import xml from 'xml';

export const generateTeamsXML = async (handlesIds: { [handle: string]: number }) => {
    let teamsXML = '';
    for (const handle in handlesIds) {
        teamsXML += xml({
            team: [
                { id: handlesIds[handle] },
                { name: handle },
                { university: 'AinShams' },
                { nationality: 'Egyptian' },
                { 'icpc-id': handlesIds[handle] },
            ],
        });
    }
    return teamsXML;
};
