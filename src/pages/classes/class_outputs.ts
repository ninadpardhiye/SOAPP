import { SingleClassOutput } from './single_class_output';

export class ClassOutputs{
    class_number: string;
    output: SingleClassOutput;
    subbed: boolean;

    constructor(){
        this.class_number = '';
        this.subbed = false;
        this.output = new SingleClassOutput();
    }
}
