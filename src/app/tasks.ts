export class Task {
    constructor(
        public user_id: number,
        public id: number,
        public title: string,
        public complete: boolean){}
}