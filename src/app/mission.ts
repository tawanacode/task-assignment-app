export class Mission {
    constructor(
        public id: number,
        public farm_id: number,
        public title: string,
        public date: string,
        public complete: boolean){}
}