import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TopicCreate(){
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const nav = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    const topics = JSON.parse(localStorage.getItem('campuslearn_topics')||'[]');
    const id = Math.random().toString(36).slice(2,10);
    const now = new Date().toISOString();
    topics.unshift({ id, title, subject, description, createdAt: now, messages: [] });
    localStorage.setItem('campuslearn_topics', JSON.stringify(topics));
    nav(`/thread/${id}`);
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:700, margin:'2rem auto'}}>
        <h2>New Topic</h2>
        <form className="stack" onSubmit={onSubmit}>
          <div>
            <div className="muted">Title</div>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required/>
          </div>
          <div>
            <div className="muted">Subject</div>
            <input className="input" value={subject} onChange={e=>setSubject(e.target.value)} required/>
          </div>
          <div>
            <div className="muted">Description</div>
            <textarea className="textarea" rows="6" value={description} onChange={e=>setDescription(e.target.value)} required/>
          </div>
          <button className="btn btn-primary">Create Topic</button>
        </form>
      </div>
    </div>
  )
}
