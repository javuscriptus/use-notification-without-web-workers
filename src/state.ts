export type State = {
  title: string;
  body: string;
  file: File | null;
  checkboxes: { [key: string]: boolean };
};

export type Action =
  | { type: "title"; title: string }
  | { type: "body"; body: string }
  | { type: "file"; file: File | null }
  | { type: "checkbox"; name: string; checked: boolean };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.title };
    case "body":
      return { ...state, body: action.body };
    case "file":
      return { ...state, file: action.file };
    case "checkbox":
      return {
        ...state,
        checkboxes: { ...state.checkboxes, [action.name]: action.checked }
      };
    default:
      return state;
  }
}

export const initialState: State = {
  title: "",
  body: "",
  file: null,
  checkboxes: {}
};
