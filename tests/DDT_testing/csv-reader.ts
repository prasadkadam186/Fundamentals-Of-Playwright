import fs from 'fs';
import csv from 'csv-parser';

export interface LoginData{
    username : string;
    password : string;
    description : string;
    shouldPass : string;
    expectedError : string;
}
// Please make sure that while deal with YAML file you hit the below commands
// npm install csv-parser
export async function readCSV(filePath : string): Promise<LoginData[]>{
    return new Promise((resolve, reject)=>{
        const result : LoginData[] = [];
        fs.createReadStream(filePath).pipe(csv())
            .on('data', (data)=> result.push(data))
            .on('end', ()=>resolve(result))
            .on('error', (error)=>reject(error))
    })
}