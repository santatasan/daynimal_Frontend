export interface Reminder {
    id?: number;
    description: string;
    type: string;
    start_date: Date;
    reminder_date: Date;
    animal: string;
    fk_animal?: number;
    fk_user?: number;
};