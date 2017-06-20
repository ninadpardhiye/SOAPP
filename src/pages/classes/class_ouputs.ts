import { SingleClassOutput } from './single_class_output';

export class ClassOutputs{
    class_number: string;
    english_outputs: Array<SingleClassOutput>;
    math_outputs : Array<SingleClassOutput>;
    science_outputs : Array<SingleClassOutput>;

    constructor(){
        this.class_number = '';
        this.english_outputs = new Array<SingleClassOutput>();
        this.math_outputs = new Array<SingleClassOutput>();
        this.science_outputs = new Array<SingleClassOutput>();
    }
}