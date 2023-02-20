import xml from 'xml';

export const generateAwardsXML = async (awards: { [id: number]: { teamId: number; citation: string } }) => {
    let awardsXML = '';
    for (const awardId in awards) {
        awardsXML += xml({
            award: [{ teamId: awards[awardId].teamId }, { id: awardId }, { citation: awards[awardId].citation }],
        });
    }
    awardsXML += xml({
        finalized: [{ 'last-gold': 1 }, { 'last-silver': 2 }, { 'last-bronze': 3 }, { comment: 'CONGRATULATIONS' }],
    });
    return awardsXML;
};
