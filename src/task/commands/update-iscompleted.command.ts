export class UpdateIsCompletedCommand{
    constructor(
        public readonly taskId: number,    
        public readonly isCompleted: boolean, 
      ) {}
}