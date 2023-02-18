import fs from 'fs';

const path = "../GeneratedXmlFiles"
export const WriteToXmlFile = async (FileName:string, DatToBeWritten:string) =>{
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);}

    var logger = fs.createWriteStream(`${path}/${FileName}.xml`, {
        flags: 'a'
    })
    logger.write(DatToBeWritten);
}


