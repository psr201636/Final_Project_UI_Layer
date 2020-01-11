export class Task {
    taskId: number;
    task: string;
    parentId: number;
    projectId: number;
    userId: number;
    priority: number;
    startDate: Date;
    endDate: Date;
    status: string;
    hide: boolean;

    constructor() {
        this.task = '';

        this.parentId = 0;
        this.projectId = 0;
        this.userId = 0;
        this.priority = 0;
        this.startDate = new Date();

        var d1 = new Date();
        d1.setDate(d1.getDate() + 1);
        this.endDate = d1;

        this.status = 'OPEN';
    }
}