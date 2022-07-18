import React, { useContext, useState } from 'react';
import NoteContext from '../context/noteContext';
import Note from './Note';

export const Home = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "Personal" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showMessage("Note has been added successfully!", "success");
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container'>
                <h2 className='my-3' style={{color: props.mode === 'dark'?'white':'black'}}>Add a note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" style={{color: props.mode === 'dark'?'white':'black'}}>Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" style={{color: props.mode === 'dark'?'white':'black'}}>Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" style={{color: props.mode === 'dark'?'white':'black'}}>Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

            <div className='container my-3'>
                <Note showMessage={props.showMessage} mode={props.mode}/>
            </div>
        </div>
    )
}
