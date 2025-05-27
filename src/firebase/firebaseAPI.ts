import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Exercise } from "../types";


export async function updateExercise(
    uid: string,
    date: Date,
    updatedExercise: Exercise
) {
    const docId = date.toISOString().split("T")[0]; // format YYYY-MM-DD
    const workoutRef = doc(db, "users", uid, "workouts", docId);

    const snap = await getDoc(workoutRef);
    let existingExercises: Exercise[] = [];

    if (snap.exists()) {
        const data = snap.data();
        existingExercises = data.exercises || [];
    }

    // Replace or add the updated exercise
    const newExercises = [
        ...existingExercises.filter((e) => e.id !== updatedExercise.id),
        updatedExercise,
    ];

    await setDoc(workoutRef, {
        date: docId,
        exercises: newExercises,
    });

    console.log("Exercise updated.");
}

export async function getExerciseByName(
    uid: string,
    date: Date,
    exerciseName: string
) {
    const docId = date.toISOString().split("T")[0]; // format YYYY-MM-DD
    const workoutRef = doc(db, "users", uid, "workouts", docId);
    const snap = await getDoc(workoutRef);

    if (!snap.exists()) {
        return null;
    }
    const data = snap.data();
    const exercises: Exercise[] = data.exercises || [];
    return exercises.find((e) => e.name === exerciseName) || null;
}
