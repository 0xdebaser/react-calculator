function Key(props) {
  return (
    <button onClick={props.clickHandler} id={props.keyName}>
      {props.keyLabel}
    </button>
  );
}

export default Key;
