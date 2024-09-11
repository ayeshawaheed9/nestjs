export class UpdateTitleCommand{
    constructor(
        public readonly taskId: number,    
        public readonly title: string
    ){}
}