import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../lib/session'

export default function TutorThread(){
  const { id } = useParams();
  const user = getUser();
  const [topic, setTopic] = useState(null);
  const [text, setText] = useState('');

  useEffect(()=>{
    const topics = JSON.parse(localStorage.getItem('campuslearn_topics')||'[]');
    setTopic(topics.find(t=>t.id===id) || null);
  },[id])

  function addMessage(){
    if(!text.trim()) return;
    const topics = JSON.parse(localStorage.getItem('campuslearn_topics')||'[]');
    const idx = topics.findIndex(t=>t.id===id);
    if(idx===-1) return;
    const msg = {
      id: Math.random().toString(36).slice(2,10),
      author: user?.fullName || 'Anon',
      role: user?.role || 'guest',
      text,
      createdAt: new Date().toISOString()
    };
    topics[idx].messages.push(msg);
    localStorage.setItem('campuslearn_topics', JSON.stringify(topics));
    setTopic(topics[idx]);
    setText('');
  }

  if(!topic) return <div className="container"><div className="card"><p>Topic not found.</p></div></div>;

  return (
    <div className="container">
      <div className="card" style={{marginTop:'1rem'}}>
        <h2>{topic.title}</h2>
        <p className="muted">{topic.subject} · {new Date(topic.createdAt).toLocaleString()}</p>
        <p style={{whiteSpace:'pre-wrap'}}>{topic.description}</p>
      </div>
      <div className="spacer"></div>
      <div className="card">
        <h3>Discussion</h3>
        {topic.messages.length===0 && <p className="muted">No messages yet. Start the conversation below.</p>}
        <div className="stack">
          {topic.messages.map(m=>(
            <div key={m.id} className="card" style={{background:'#0b1220'}}>
              <div className="muted">{m.author} ({m.role}) · {new Date(m.createdAt).toLocaleString()}</div>
              <div style={{whiteSpace:'pre-wrap', marginTop:'.25rem'}}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="spacer"></div>
        <div className="row">
          <div className="col">
            <textarea className="textarea" rows="4" placeholder="Type a message..." value={text} onChange={e=>setText(e.target.value)} />
          </div>
          <div style={{alignSelf:'end'}}>
            <button className="btn btn-primary" onClick={addMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
