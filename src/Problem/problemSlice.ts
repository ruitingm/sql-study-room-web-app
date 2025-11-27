import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Problem } from "./problemType";

type problemState = {
  problems: Problem[] | null;
};

const initialState: problemState = {
  problems: [],
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setProblems: (state, action: PayloadAction<Problem[]>) => {
      state.problems = action.payload;
    },
    addProblem: (state, action: PayloadAction<Problem>) => {
      const newProblem: Problem = {
        pId: action.payload.pId,
        pTitle: action.payload.pTitle,
        difficultyTag: action.payload.difficultyTag,
        conceptTag: action.payload.conceptTag,
        pDescription: action.payload.pDescription,
        pSolutionId: action.payload.pSolutionId,
        reviewed: true,
      };
      state.problems = state.problems
        ? [...state.problems, newProblem]
        : [newProblem];
    },
    deleteProblem: (state, action: PayloadAction<Problem>) => {
      state.problems = state.problems
        ? (state.problems.filter(
            (p: Problem) => p.pId !== action.payload.pId
          ) as Problem[])
        : state.problems;
    },
    updateProblem: (state, action: PayloadAction<Problem>) => {
      state.problems = state.problems
        ? (state.problems.map((p: Problem) =>
            p.pId === action.payload.pId ? action.payload : p
          ) as Problem[])
        : state.problems;
    },
  },
});

export const { setProblems, addProblem, deleteProblem, updateProblem } =
  problemSlice.actions;
export default problemSlice.reducer;
