import useNotification from "./hooks/useNotification";
import useForm from "./hooks/useForm";
import { initialState } from "./state";
import { useCallback } from "react";
import checkboxesData from "./consts/checkboxesData";

const App: React.FC = () => {
  const {
    state,
    handleTitleChange,
    handleBodyChange,
    handleFileChange,
    handleCheckboxChange
  } = useForm(initialState);

  const [triggerNotif, permissions] = useNotification();

  const iconFile = state.file;
  const url = (iconFile && URL.createObjectURL(iconFile)) || "./logo.png";

  const handleButtonClick = useCallback(() => {
    const options: NotificationOptions = {
      body: state.body,
      icon: (state.checkboxes?.Icon && url) || undefined,
      image: (state.checkboxes?.Image && url) || undefined
    };

    triggerNotif(state.title || "Standard", options);
  }, [state, triggerNotif, url]);

  return (
    <div className="App">
      <h1>Notification status: {permissions}</h1>
      <img src={url} alt="preview" />
      <form>
        <div className="file-input">
          <input
            id="icon"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="icon">{state.file?.name || "Select image"}</label>
        </div>
        <div className="content">
          <input
            placeholder="Title"
            value={state.title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Text"
            value={state.body}
            onChange={handleBodyChange}
          />
        </div>
      </form>
      <div className="checkboxes-block">
        <span>Show image in:</span>
        {checkboxesData?.map(({ value, title }) => (
          <div className="checkbox-block" key={value}>
            <input
              type="checkbox"
              id={`${value}_checkbox`}
              name={value}
              checked={state.checkboxes[value] || false}
              onChange={handleCheckboxChange}
            />

            <label htmlFor={`${value}_checkbox`}>{title}</label>
          </div>
        ))}
      </div>
      <button onClick={handleButtonClick}>Show notification</button>
    </div>
  );
};

export default App;
