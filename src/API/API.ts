import { updateExercise } from "../firebase/firebaseAPI";
import { Exercise } from "../types";


export function writeExercise(exercise: Exercise) {
    const uid = '1234';
    updateExercise(
        uid,
        new Date(),
        exercise
    )
}