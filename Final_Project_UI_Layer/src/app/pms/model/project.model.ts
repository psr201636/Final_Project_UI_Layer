export class Project {
    projectId: number;
    project: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    userId: number;
    hide: boolean;
    taskCount: number;
    completeCount: number;

    constructor() {
        this.project = '';
        this.startDate = null;
        this.endDate = null;
        this.priority = 0;
        this.userId = 0;
    }
}
