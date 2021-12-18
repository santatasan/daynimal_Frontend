export interface VetVisit {
    id?: number;
    vet: string;
    notes?: string;
    date: Date;
    price: number;
    fk_animal?: number;
    fk_user?: number;
};