
interface UndoRedoControlsProps { 
    undo: () => void
    redo: () => void
}

const UndoRedoControls = (props : UndoRedoControlsProps) => {
  return (
    <><div>UndoRedoControls</div>
    <button className="btn btn-outline-secondary btn-sm undoButton"
          onClick={props.undo}
      >
          <i className="bi bi-arrow-counterclockwise"></i> Undo
      </button><button className="btn btn-outline-secondary btn-sm redoButton"
          onClick={props.redo}
      >
              <i className="bi bi-arrow-clockwise"></i> Redo
          </button></>
  )
}

export default UndoRedoControls