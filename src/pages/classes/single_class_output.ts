import { Volunteer } from './volunteer';
import { KidReview } from './kid_review';
export class SingleClassOutput{
    date: Date;
    teacher: Volunteer;
    class_output: string;
    kids: Array<KidReview>;

    constructor(){
        this.date = new Date;
        this.teacher = new Volunteer();
        this.class_output = '';
        this.kids = new Array<KidReview>();
    }
}