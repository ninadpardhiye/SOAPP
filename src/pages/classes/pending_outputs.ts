import { Volunteer } from './volunteer';

export class PendingOutputs{
    class_number: string;
    subject: string;
    date: Date;
    teacher: Volunteer;

    constructor(){
        this.class_number = '';
        this.subject = '';
        this.date = new Date;
        this.teacher = new Volunteer();
    }
}