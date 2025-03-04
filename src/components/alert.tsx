interface Props {
  message: string;      
  type: string;
  onConfirm: () => void;
}

export const Alert = ({message, type, onConfirm}:Props) => {
  return (
    <div className={`alert alert-${type}`}>
      <p>{message}</p>
      <button onClick={onConfirm} className="form-button-submit">Confirm</button>
    </div>
  )
}