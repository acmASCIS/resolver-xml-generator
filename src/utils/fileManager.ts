import fs from 'fs';

export const WriteToXmlFile = async (fileName: string, dataToBeWritten: string) => {
    const path = 'GeneratedXmlFiles';
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    try {
        fs.writeFileSync(`${path}/${fileName}.xml`, dataToBeWritten, { flag: 'w' });
    } catch (err) {
        console.error(err);
    }
};
