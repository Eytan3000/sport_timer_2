
export interface ExerciseSet {
    reps: number;
    weight: number;
}
export interface Exercise {
    id: string;
    name: string;
    sets: ExerciseSet[];
}

export interface Workout {
    date: Date;
    exercises: Exercise[];
}

