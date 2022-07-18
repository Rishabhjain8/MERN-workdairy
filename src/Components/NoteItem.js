import React, { useContext } from 'react'
import NoteContext from '../context/noteContext';

const NoteItem = (props) => {
    const { note, updateNote, showMessage } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-2" style = {{width: '14rem'}}>
                <div className="card-body d-flex">
                    <div className='content'>
                        <h5 className="card-title" style={{color: props.mode === 'dark'?'white':'black'}}>{note.title}</h5>
                        <p className="card-text" style={{color: props.mode === 'dark'?'white':'black'}}>{note.description}</p>
                    </div>
                    <div className='d-flex'>
                        <i className="fa-solid fa-pen-to-square mx-2" style={{color: props.mode === 'dark'?'white':'black'}} onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-trash-can mx-2" style={{color: props.mode === 'dark'?'white':'black'}} onClick={() => { deleteNote(note._id); showMessage("Note has been deleted successfully", "danger")}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem