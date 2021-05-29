import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Answer } from "./../../../app/types";

export const mockAnswer: Answer[] = [
  {
    promptId: 0,
    answerId: 1,
  },
  {
    promptId: 1,
    answerId: 2,
  },
];

export interface AnswerState {
  correctAnswer: number | undefined;
  answers: number[];
}

const initialState: AnswerState = {
  correctAnswer: undefined,
  answers: [],
};

export const selectCurrentAnswer = (state: RootState) =>
  state.answer.correctAnswer;

export const getAnswer = createAsyncThunk(
  "answer/getAnswer",
  async (questionId: number) => {
    return mockAnswer.find((answer) => answer.promptId === questionId)
      ?.answerId;
  }
);

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnswer.fulfilled, (state, action) => {
      state.correctAnswer = action.payload;
      state.answers = state.answers.concat([action.payload as number]);
    });
  },
});

export default answerSlice.reducer;
