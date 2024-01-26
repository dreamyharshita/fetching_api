import React,{useRef} from 'react'


export default function Form() {

    const titleRef = useRef();
    const textRef = useRef();
    const dateRef = useRef();

    function displayData(e)
    {
        e.preventDefault();
        const obj ={title:titleRef.current.value,
            text:textRef.current.value,
            date:dateRef.current.value
        }
        console.log(obj)
    }

    return (
        <form>
            <label htmlFor="title">Title </label>
            <input ref={titleRef} style={{borderRadius:'10px'}} type='text' id='title'></input>
            <label htmlFor="txt"> Opening Text </label>
            <input ref={textRef} style={{borderRadius:'10px'}} id='txt' type="text" />
            <label htmlFor="rd"> Release Date </label>
            <input ref={dateRef} style={{borderRadius:'10px'}} type="date" id='rd' />
            <button onClick={displayData} >Add</button>
        </form>
    )
}