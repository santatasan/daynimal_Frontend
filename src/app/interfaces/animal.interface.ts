export interface Animal {
    id?: number;
    name: string;
    gender: string;
    specie: string;
    breed: string;
    size: string;
    color: string;
    weight: string;
    w_unit: string;
    spayed: number;
    birthday: Date;
    image?: string;
    fk_user?: number;
};