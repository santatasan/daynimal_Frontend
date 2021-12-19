export interface Medication {
    id?: number;
    name: string;
    dosage: string;
    repetition: number;
    r_unit: string;
    start: Date;
    finish: Date;
    finished: number;
    fk_animal?: number;
    fk_user?: number;
};