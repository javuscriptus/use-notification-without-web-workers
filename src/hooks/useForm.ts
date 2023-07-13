import { ChangeEvent, useCallback, useReducer } from "react";
import { reducer, State } from "../state";

function useForm(initialState: State) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "title", title: e.target.value });
  }, []);

  const handleBodyChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: "body", body: e.target.value });
    },
    []
  );

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    dispatch({ type: "file", file });
  }, []);

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "checkbox",
        name: e.target.name,
        checked: e.target.checked
      });
    },
    []
  );

  return {
    state,
    handleTitleChange,
    handleBodyChange,
    handleFileChange,
    handleCheckboxChange
  };
}

export default useForm;
