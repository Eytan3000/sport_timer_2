import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
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

export async function getAllExercisesByUserId(uid: string) {
    // Fetch all workouts for the user
    const workoutsRef = collection(db, "users", uid, "workouts");
    const snapshot = await getDocs(workoutsRef);
    let allExercises: Exercise[] = [];
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.exercises && Array.isArray(data.exercises)) {
            allExercises = allExercises.concat(data.exercises);
        }
    });
    return allExercises;
}

export async function getAllWorkoutsByUserId(uid: string) {
    const workoutsRef = collection(db, "users", uid, "workouts");
    const snapshot = await getDocs(workoutsRef);
    const workouts: { date: string, exercises: Exercise[] }[] = [];
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.exercises && Array.isArray(data.exercises)) {
            workouts.push({ date: data.date, exercises: data.exercises });
        }
    });
    // Sort by date descending
    workouts.sort((a, b) => b.date.localeCompare(a.date));
    return workouts;
}

