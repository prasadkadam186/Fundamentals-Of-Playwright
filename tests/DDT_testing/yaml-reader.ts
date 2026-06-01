import fs from 'fs';
import yaml from 'js-yaml';

export interface loginCred{
    description : string;
    username : string;
    password : string;
    shouldPass : string;
    expectedError : string;
}

// Please make sure that while deal with YAML file you hit the below commands
// 1. npm install js-yaml
// 2.npm install --save-dev @types/js-yaml
export function readYAML(filePath: string): loginCred[]{
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return yaml.load(fileContent) as loginCred[];
}