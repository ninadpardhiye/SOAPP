import { Volunteer } from './volunteer';

export class PendingOutputs{
    class_number: string;
    date: Date;
    subject: string;
    teacher: Volunteer;
    subbed: boolean;
    $key: string;
    $exists: () => boolean;

    constructor(){
        this.subbed = false;
        this.class_number = '';
        this.date = new Date;
        this.subject = '';
        this.teacher = new Volunteer();
        this.$key = '';
        this.$exists = () => false;
    }

}
