export interface Care {
    id?: number;
    type: string;
    date: Date;
    notes?: string;
    place: string;
    fk_animal?: number;
};