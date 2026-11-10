export interface Todo {
    id: number;
    title: string;
    description: string | null;
    priority: number;
    isComplete: boolean;
    createdAt: string;
}