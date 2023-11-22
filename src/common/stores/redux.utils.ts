import React from 'react';
import { CaseReducerActions, Dispatch, Slice, SliceCaseReducers } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

type Dispatchers<TActions> = TActions;

export function createHookFromSlice<TState, TCaseReducer extends SliceCaseReducers<TState>>(
  slice: Slice<TState, TCaseReducer>,
  selector: (state: any) => any,
) {
  return function () {
    const state = useSelector(selector) as TState;
    const dispatch = useDispatch();

    const dispatchers = React.useMemo<Dispatchers<typeof slice.actions>>(() => {
      const result = {}

      Object.keys(slice.actions).forEach(key => {
        result[key] = (...args) => {
          const action = (slice.actions[key] as any)(...args);
          dispatch(action)
          return action;
        }
      });
      return result as Dispatchers<typeof slice.actions>;
    }, [dispatch]);

    return React.useMemo<[TState, Dispatchers<typeof slice.actions>]>(() => [state, dispatchers], [state, dispatchers]);
  };
}