import fs from 'fs';

export const WriteToXmlFile = async (fileName: string, datToBeWritten: string) => {
    const path = 'src/GeneratedXmlFiles';
    if (!(fs.existsSync(path))) {
        fs.mkdirSync(path);
    }

    try {
        const logger = fs.createWriteStream(`${path}/${fileName}.xml`, {
            flags: 'a',
        });
        logger.write(datToBeWritten);
    } catch (err) {
        console.error(err);
    }
};
