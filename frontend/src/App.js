import "./index.css";
import React, { useState } from "react";
// Mocked authentication replaces Google API

// ─── Mock Data ────────────────────────────────────────────────────────
const JOBS = [
  { id: 1, title: "Senior UI/UX Designer", company: "Google", location: "California, CA", type: "Full time", experience: "1+", skills: ["Figma", "Photoshop", "Adobe XD"], applicants: 120, lang: "English : Excellent · Spanish : Intermediate", closed: "20 May, 2023", match: 98 },
  { id: 2, title: "Frontend Engineer", company: "Vercel", location: "Remote", type: "Full time", experience: "2+", skills: ["React", "JavaScript", "CSS"], applicants: 85, lang: "English : Excellent", closed: "25 May, 2023", match: 95 },
  { id: 3, title: "Product Manager", company: "Linear", location: "New York, NY", type: "Full time", experience: "4+", skills: ["Agile", "Strategy", "Jira"], applicants: 210, lang: "English : Native", closed: "30 Jun, 2023", match: 92 }
];

const INITIAL_CANDIDATES = [
  { id: 101, name: "Mac Jonathan", role: "Sr. UI UX Designer", score: 98, exp: "2.5 Yrs", email: "macjonathan@gmail.com", phone: "+1 234 567 890", status: "Recommended" },
  { id: 102, name: "Michael Anderson", role: "Sr. UI UX Designer", score: 92, exp: "3 Yrs", email: "michaelanderson@gmail.com", phone: "+1 234 567 891", status: "Applied" },
  { id: 103, name: "James Walker", role: "Sr. UI UX Designer", score: 88, exp: "2 Yrs", email: "jameswalker@gmail.com", phone: "+1 234 567 892", status: "Applied" },
  { id: 104, name: "Jessica Thompson", role: "Sr. UI UX Designer", score: 85, exp: "4 Yrs", email: "jessicathompson@gmail.com", phone: "+1 234 567 893", status: "Shortlisted" },
];

// ─── Auth Flow ────────────────────────────────────────────────────────
const AuthPage = ({ login, registeredUsers, setRegisteredUsers, initialIsLogin = true, initialEmail = "", initialName = "" }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError(""); setSuccess("");
    if (isLogin) {
      if (!email || !password) return setError("Email and Password are required");
      const user = registeredUsers.find(u => u.email === email && u.password === password);
      if (user) {
        login(user);
      } else {
        setError("Invalid email or password. Please verify or sign up.");
      }
    } else {
      if (!name || !email || !password || !location || !phone) return setError("All fields are required");
      if (registeredUsers.some(u => u.email === email)) return setError("Email already registered");
      const newUser = { name, email, password, location, phone, role };
      setRegisteredUsers([...registeredUsers, newUser]);
      setSuccess("Signup successful! Please log in.");
      setIsLogin(true);
      setPassword("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isLogin ? "Welcome back" : "Create an account"}</h2>
        <p className="auth-subtitle">{isLogin ? "Log in to your account" : "Join headsin today"}</p>
        
        {error && <div style={{color: 'var(--danger)', marginBottom: 12, textAlign: 'center', fontSize: 14}}>{error}</div>}
        {success && <div style={{color: 'var(--success)', marginBottom: 12, textAlign: 'center', fontSize: 14}}>{success}</div>}
        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
            <button
               type="button"
               style={{
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 width: '100%', padding: '10px', background: 'white',
                 border: '1px solid #dadce0', borderRadius: '4px',
                 cursor: 'pointer', fontFamily: 'Roboto, sans-serif',
                 fontSize: '14px', fontWeight: '500', color: '#3c4043'
               }}
               onClick={() => {
                 const mockedEmail = "seeker@headsin.com";
                 const mockedName = "Seeker User";
                 setEmail(mockedEmail);
                 setName(mockedName);
                 const user = registeredUsers.find(u => u.email === mockedEmail);
                 if (user) {
                    login(user);
                 } else {
                    setIsLogin(false); // force sign up
                    setSuccess("Google verified! Please complete registration.");
                 }
               }}
            >
               <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18, marginRight: 10 }} />
               {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </button>
        </div>
        
        <div style={{textAlign: "center", color: "var(--text-secondary)", fontSize: 12, marginBottom: 16}}>──────── OR ────────</div>

        <div className="role-selector">
          <div className={`role-option ${role === "seeker" ? "active" : ""}`} onClick={() => setRole("seeker")}>Job Seeker</div>
          <div className={`role-option ${role === "recruiter" ? "active" : ""}`} onClick={() => setRole("recruiter")}>Recruiter</div>
        </div>
        
        {!isLogin && (
          <>
            <input className="form-input" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <input className="form-input" placeholder="Location (e.g. San Francisco)" value={location} onChange={e => setLocation(e.target.value)} />
            <input className="form-input" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
          </>
        )}
        <input className="form-input" placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="form-input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        
        <button className="btn-primary-auth" style={{ marginBottom: "16px" }} onClick={handleSubmit}>
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <div style={{ textAlign: "center", fontSize: "14px", color: "var(--text-secondary)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: "var(--theme-accent)", cursor: "pointer", fontWeight: 700 }} onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Shared Components ───────────────────────────────────────────────
const MessagesPage = () => {
  const [contacts] = useState([
    { n: 'Mac Jonathan', m: 'Are you available for...', t: '10:30 AM', online: true },
    { n: 'Jessica Thompson', m: 'Thank you for applyi...', t: 'Yesterday', online: false }
  ]);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState({
    'Mac Jonathan': [
      { text: "Hi, I wanted to reach out regarding the Senior Designer position. Are you available for a quick chat today?", sender: 'them' },
      { text: "Hello Mac! Yes, absolutely. I'm free between 2 PM and 4 PM EST.", sender: 'me' }
    ],
    'Jessica Thompson': [
      { text: "Thank you for applying to our open role.", sender: 'them' }
    ]
  });
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = newMessage;
    setMessages(prev => ({
      ...prev,
      [activeContact.n]: [...(prev[activeContact.n] || []), { text: msg, sender: 'me' }]
    }));
    setNewMessage("");

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeContact.n]: [...(prev[activeContact.n] || []), { text: "Thanks for your message. I'm currently away but will reply to you as soon as possible!", sender: 'them' }]
      }));
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', background: 'white', borderRadius: '24px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
      <div style={{ width: '300px', borderRight: '1px solid var(--border-light)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: 800 }}>Messages</h3>
        <div className="search-bar" style={{ width: '100%', marginBottom: '24px', padding: '10px' }}>
          <input placeholder="Search contacts..." />
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {contacts.map((c, i) => {
            const isActive = activeContact.n === c.n;
            const lastMessage = messages[c.n] ? messages[c.n][messages[c.n].length - 1].text : c.m;
            return (
              <div key={i} onClick={() => setActiveContact(c)} style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '12px', background: isActive ? 'var(--bg-secondary)' : 'transparent', cursor: 'pointer', marginBottom: '8px' }}>
                 <div className="app-avatar" style={{ width: 48, height: 48, position: 'relative' }}>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${c.n}`} style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="avatar" />
                    {c.online && <div style={{position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: 'var(--success)', borderRadius: '50%', border: '2px solid white'}}></div>}
                 </div>
                 <div style={{ flex: 1, overflow: 'hidden' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                     <strong style={{ fontSize: '15px' }}>{c.n}</strong>
                     <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.t}</span>
                   </div>
                   <div style={{ fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lastMessage}</div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
         <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="app-avatar" style={{width: 44, height: 44}}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activeContact.n}`} style={{ width: '100%', borderRadius: '50%' }} alt="a"/></div>
            <div>
              <h3 style={{ margin: 0 }}>{activeContact.n}</h3>
              <span style={{ fontSize: '12px', color: activeContact.online ? 'var(--success)' : 'var(--text-secondary)' }}>{activeContact.online ? '● Online' : 'Offline'}</span>
            </div>
         </div>
         <div style={{ flex: 1, padding: '24px', background: 'var(--bg-secondary)', overflowY: 'auto' }}>
            {(messages[activeContact.n] || []).map((msg, i) => (
              <div key={i} style={msg.sender === 'me' ? { background: 'var(--theme-accent)', color: 'white', padding: '16px', borderRadius: '16px 16px 0 16px', maxWidth: '60%', marginLeft: 'auto', marginBottom: '16px' } : { background: 'white', padding: '16px', borderRadius: '16px 16px 16px 0', border: '1px solid var(--border-light)', maxWidth: '60%', marginBottom: '16px' }}>
                {msg.text}
              </div>
            ))}
         </div>
         <div style={{ padding: '20px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
               <input className="form-input" placeholder="Type a message..." style={{ margin: 0 }} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
               <button className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px' }} onClick={handleSend}>Send</button>
            </div>
         </div>
      </div>
    </div>
  );
};

const ResumePage = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true);
      // Simulate analysis
      setTimeout(() => {
        setIsUploading(false);
        // Random score between 65 and 99
        setScore(Math.floor(Math.random() * 35) + 65);
      }, 1500);
    }
  };

  return (
    <div>
      <div className="chart-header"><h3 style={{fontSize: 22, fontWeight: 800}}>AI Resume Builder & Analyzer</h3></div>
      <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(400px, 1fr) 300px' }}>
         <div className="chart-box" style={{ padding: '40px', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Upload your Resume for AI Analysis</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Drag & drop your PDF or Word document here</p>
            <label className="btn-primary" style={{ borderRadius: '12px', padding: '12px 24px', cursor: 'pointer', display: 'inline-block' }}>
               Browse Files
               <input type="file" style={{ display: 'none' }} onChange={handleUpload} accept=".pdf,.doc,.docx" />
            </label>
            {file && <div style={{marginTop: 16, fontWeight: 700, color: 'var(--theme-accent)'}}>📄 {file.name}</div>}
            {isUploading && <div style={{marginTop: 8, color: 'var(--text-secondary)'}}>Scanning with AI...</div>}
         </div>
         <div className="chart-box">
            <h3 className="chart-title">AI Compatibility Score</h3>
            {score ? (
              <>
                <div className="pie-chart" style={{ width: 140, height: 140, margin: '24px auto', background: `conic-gradient(${score > 80 ? 'var(--success)' : 'var(--warning)'} ${score}%, #f1f5f9 ${score}%)` }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: score > 80 ? 'var(--success)' : 'var(--warning)' }}>
                    {score}%
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Keywords Found</span> <strong>{Math.floor(score/2)}/50</strong></div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Readability</span> <strong>{score > 85 ? 'Excellent' : 'Good'}</strong></div>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Format Score</span> <strong>{Math.floor(score/10)}/10</strong></div>
                </div>
              </>
            ) : (
                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textAlign: 'center', fontSize: 13 }}>
                  Please upload a resume to see your generated AI score.
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, role }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    location: user.location,
    phone: user.phone,
    bio: "Passionate and results-driven professional with experience in building scalable products."
  });

  const handleChange = (e) => setProfileData({...profileData, [e.target.name]: e.target.value});

  const handleSave = () => {
    // Perform mock save functionality / Backend call
    setIsEditing(false);
  };

  return (
    <div className="chart-box" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
        <div className="app-avatar" style={{width: 100, height: 100}}>
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${profileData.name}`} style={{ width: '100%', borderRadius: '50%' }} alt="avatar"/>
        </div>
        <div>
           <h2 style={{ fontSize: '28px', fontWeight: 800 }}>{profileData.name}</h2>
           <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{role === 'seeker' ? 'UI UX Designer' : 'Talent Acquisition Manager'}</p>
        </div>
        {!isEditing ? (
          <button className="btn-primary" onClick={() => setIsEditing(true)} style={{ marginLeft: 'auto', borderRadius: '12px', background: 'var(--text-primary)', color: 'white' }}>Edit Profile</button>
        ) : (
          <button className="btn-primary" onClick={handleSave} style={{ marginLeft: 'auto', borderRadius: '12px', background: 'var(--success)', color: 'white' }}>Save Changes</button>
        )}
      </div>
      
      <div className="grid-2">
         <div>
           <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
           <input className="form-input" name="name" disabled={!isEditing} value={profileData.name} onChange={handleChange} />
         </div>
         <div>
           <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
           <input className="form-input" name="email" disabled={!isEditing} value={profileData.email} onChange={handleChange} />
         </div>
         <div>
           <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Location</label>
           <input className="form-input" name="location" disabled={!isEditing} value={profileData.location} onChange={handleChange} />
         </div>
         <div>
           <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number</label>
           <input className="form-input" name="phone" disabled={!isEditing} value={profileData.phone} onChange={handleChange} />
         </div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Bio</label>
        <textarea className="form-input" name="bio" disabled={!isEditing} style={{ height: '100px', resize: 'none' }} value={profileData.bio} onChange={handleChange} />
      </div>
    </div>
  );
};

// ─── Seeker Dashboard ────────────────────────────────────────────────
const SeekerDashboard = ({ user, logout }) => {
  const [activeMenu, setActiveMenu] = useState("Jobs");
  const [activeTab, setActiveTab] = useState("Recommended");
  const [appliedJobs, setAppliedJobs] = useState([2]); // Job ID 2 is applied initially
  const [savedJobs, setSavedJobs] = useState([3]);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('All');
  
  const TABS = ["Recommended by AI", "Applied", "Accepted & Rejected", "Saved"];
  
  // Logic
  const handleApply = (id) => !appliedJobs.includes(id) && setAppliedJobs([...appliedJobs, id]);
  const handleSave = (id) => {
    savedJobs.includes(id) ? setSavedJobs(savedJobs.filter(x => x !== id)) : setSavedJobs([...savedJobs, id]);
  };

  const getJobsForTab = () => {
    let filtered = JOBS.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));
    
    if (filterType !== 'All') {
       filtered = filtered.filter(j => (j.location && j.location.includes(filterType)) || (j.title && j.title.includes(filterType)));
    }
    
    if (activeTab === "Recommended") return filtered.filter(j => !appliedJobs.includes(j.id));
    if (activeTab === "Applied") return filtered.filter(j => appliedJobs.includes(j.id));
    if (activeTab === "Accepted") return []; // empty for mock
    if (activeTab === "Saved") return filtered.filter(j => savedJobs.includes(j.id));
    return filtered;
  };

  return (
    <div className="dashboard seeker-theme">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">h</div>
          <span>heads<b>in</b></span>
        </div>
        <div className="sidebar-nav">
          {["Jobs", "Messages", "Resume", "Profile"].map(item => (
            <div key={item} className={`sidebar-item ${activeMenu === item ? "active" : ""}`} onClick={() => setActiveMenu(item)}>
               {item === 'Jobs' && '💼'} {item === 'Messages' && '💬'} {item === 'Resume' && '📄'} {item === 'Profile' && '👤'} {item}
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className={`sidebar-item ${activeMenu === "Support" ? "active" : ""}`} onClick={() => setActiveMenu("Support")}>🎧 Support</div>
          <div className={`sidebar-item ${activeMenu === "Password Reset" ? "active" : ""}`} onClick={() => setActiveMenu("Password Reset")}>🔒 Reset Password</div>
          <div className="sidebar-item" onClick={logout}>⬅️ Log Out</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dash-header-top">
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Search for a Job</h2>
            <div style={{ display: 'flex' }}>
              <div className="search-bar">
                <input placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="search-icon-btn">🔍</button>
              </div>
              <div style={{ position: 'relative' }}>
                 <button className="filter-btn" onClick={() => setShowFilter(!showFilter)} style={filterType !== 'All' ? {background: 'var(--theme-accent)', color: 'white', borderColor: 'var(--theme-accent)'} : {}}>
                   <span style={{ fontSize: 20 }}>⚙️</span> {filterType !== 'All' ? filterType : 'Filter'}
                 </button>
                 {showFilter && (
                   <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '8px', zIndex: 10, minWidth: '150px' }}>
                      {['All', 'Remote', 'Bangalore', 'Designer'].map(opt => (
                         <div key={opt} onClick={() => { setFilterType(opt); setShowFilter(false); }} style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', background: filterType === opt ? 'var(--bg-secondary)' : 'transparent', fontWeight: 600 }}>
                           {opt}
                         </div>
                      ))}
                   </div>
                 )}
              </div>
            </div>
          </div>
          
          <div className="dash-profile" onClick={() => setActiveMenu("Profile")}>
            <div className="dash-profile-img">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} alt="avatar" style={{width: '100%', height: '100%'}}/>
            </div>
            <div>
              <div style={{fontWeight: 700, fontSize: 14}}>{user.name}</div>
              <div style={{fontSize: 12, color: 'var(--text-secondary)'}}>UI UX Designer</div>
            </div>
            <div style={{color: 'var(--theme-accent)', fontWeight: 800, paddingLeft: 12}}>Score 98</div>
          </div>
        </div>
        
        {activeMenu === "Jobs" && (
          <div>
            <div className="job-tabs">
               {TABS.map(t => {
                 const tabId = t.split(" ")[0];
                 return (
                   <div key={t} className={`job-tab ${activeTab === tabId ? "active" : ""}`} onClick={() => setActiveTab(tabId)}>
                      {t === "Recommended by AI" && "✨ Recommended by AI"}
                      {t === "Applied" && `💼 Applied (${appliedJobs.length})`}
                      {t === "Accepted & Rejected" && "✅ Accepted & Rejected"}
                      {t === "Saved" && `❤️ Saved (${savedJobs.length})`}
                   </div>
                 )
               })}
            </div>
            
            {getJobsForTab().length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "var(--text-secondary)" }}>No jobs found in this category.</div>
            ) : (
              <div className="grid-2">
                {getJobsForTab().map(j => {
                  const isApplied = appliedJobs.includes(j.id);
                  const isSaved = savedJobs.includes(j.id);
                  return (
                    <div key={j.id} className="job-card-lite">
                       <div className="job-card-header">
                          <div>
                            <h3 className="job-title-lite">{j.title}</h3>
                            <div className="job-applicants">{j.applicants} Applicants</div>
                          </div>
                          <button className="job-like-btn" onClick={() => handleSave(j.id)} style={{ color: isSaved ? "var(--danger)" : "var(--text-muted)" }}>❤️</button>
                       </div>
                       
                       <div className="job-meta-row">
                          <div className="job-meta-item">⏱️ {j.type}</div>
                          <div className="job-meta-item">🏢 Onsite</div>
                          <div className="job-meta-item">📅 {j.experience} Year Experience</div>
                          <div className="job-meta-item">📍 {j.location}</div>
                          <div className="job-meta-item" style={{marginLeft: 'auto', fontWeight: 800, fontSize: 16, color: '#0077b5'}}>in</div>
                       </div>
                       
                       <div className="job-skills-req">
                          <div className="req-title">Skill Required</div>
                          <div className="skill-tags">
                            {j.skills.map(s => <div key={s} className="skill-tag">{s}</div>)}
                          </div>
                       </div>
                       
                       <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                          <div className="req-title" style={{marginBottom: 4}}>Languages</div>
                          {j.lang}
                       </div>
                       
                       <div className="job-card-footer">
                          <div className="job-closed">Will be Closed: {j.closed}</div>
                          {isApplied ? (
                            <button className="apply-btn" style={{ background: "white", border: "1px solid var(--border-light)", color: "var(--success)" }} disabled>✔️ Applied</button>
                          ) : (
                            <button className="apply-btn" onClick={() => handleApply(j.id)}>✔️ Apply Now</button>
                          )}
                       </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Mock other tabs */}
        {activeMenu === "Messages" && <MessagesPage />}
        {activeMenu === "Resume" && <ResumePage />}
        {activeMenu === "Profile" && <ProfilePage user={user} role="seeker" />}
        {activeMenu === "Support" && (
          <div style={{padding: 40, background: 'white', borderRadius: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'}}>
            <h2 style={{fontSize: 24, fontWeight: 800, marginBottom: 16}}>Help & Support</h2>
            <p style={{color: 'var(--text-secondary)', marginBottom: 24}}>Need help? View our features or contact support.</p>
            <div style={{background: 'var(--bg-secondary)', padding: 20, borderRadius: 12, marginBottom: 16}}>
               <strong>Email Support:</strong> You can quickly reach us at support@headsin.com
            </div>
            <div style={{background: 'var(--bg-secondary)', padding: 20, borderRadius: 12}}>
               <strong>FAQs:</strong> Can I update my resume anytime? Yes! Head over to the Resume tab and upload a new one.
            </div>
          </div>
        )}
        {activeMenu === "Password Reset" && (
          <div style={{padding: 40, background: 'white', borderRadius: 24, maxWidth: 450, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'}}>
            <h2 style={{fontSize: 24, fontWeight: 800, marginBottom: 16}}>Reset Password</h2>
            <p style={{color: 'var(--text-secondary)', marginBottom: 24}}>Enter your registered email address. We will send an OTP or resetting instructions.</p>
            <input className="form-input" placeholder="Email Address" value={user.email} disabled />
            <button className="btn-primary-auth" onClick={() => alert('Password reset requirements sent to ' + user.email)}>Send Instructions</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Recruiter Dashboard ────────────────────────────────────────────────
const RecruiterDashboard = ({ user, logout }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("Recommended");
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [jobs, setJobs] = useState(JOBS);
  
  const handleShortlist = (id) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: "Shortlisted" } : c));
  };
  const handleReject = (id) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: "Rejected" } : c));
  };

  const getCandidatesForTab = () => {
    if (activeTab === "Recommended") return candidates.filter(c => c.status === "Recommended");
    if (activeTab === "Applied") return candidates.filter(c => c.status === "Applied");
    if (activeTab === "Shortlist") return candidates.filter(c => c.status === "Shortlisted");
    if (activeTab === "Rejected") return candidates.filter(c => c.status === "Rejected");
    return candidates;
  };

  return (
    <div className="dashboard recruiter-theme">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">h</div>
          <span>heads<b>in</b></span>
        </div>
        <div className="sidebar-nav">
          {["Dashboard", "Messages", "Jobs", "Profile"].map(item => (
            <div key={item} className={`sidebar-item ${activeMenu === item ? "active" : ""}`} onClick={() => setActiveMenu(item)}>
               {item === 'Dashboard' && '📊'} {item === 'Messages' && '💬'} {item === 'Jobs' && '💼'} {item === 'Profile' && '👤'} {item}
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className={`sidebar-item ${activeMenu === "Support" ? "active" : ""}`} onClick={() => setActiveMenu("Support")}>🎧 Support</div>
          <div className={`sidebar-item ${activeMenu === "Password Reset" ? "active" : ""}`} onClick={() => setActiveMenu("Password Reset")}>🔒 Reset Password</div>
          <div className="sidebar-item" onClick={logout}>⬅️ Log Out</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dash-header-top" style={{ marginBottom: 40 }}>
           <h2 style={{ fontSize: 24, fontWeight: 700 }}>&lt; {activeMenu}</h2>
           <button style={{ padding: "10px 24px", border: "1px solid var(--border-light)", borderRadius: 12, background: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onClick={() => setActiveMenu("Create Job")}
           >
             + Create a Job
           </button>
        </div>
        
        {activeMenu === "Dashboard" && (
          <>
            <div className="recruiter-stats">
               <div className="r-stat-card" onClick={() => setActiveMenu("Jobs")} style={{cursor: 'pointer'}}>
                 <div className="r-stat-icon">📄</div>
                 <div className="r-stat-info"><h2>{jobs.length}</h2><p>Job Posted</p></div>
               </div>
               <div className="r-stat-card" onClick={() => {setActiveMenu("Jobs"); setActiveTab("Applied");}} style={{cursor: 'pointer'}}>
                 <div className="r-stat-icon" style={{background: '#fef3c7', color: '#f59e0b'}}>📥</div>
                 <div className="r-stat-info"><h2>{candidates.length}</h2><p>Total Applications</p></div>
               </div>
               <div className="r-stat-card" onClick={() => {setActiveMenu("Jobs"); setActiveTab("Shortlist");}} style={{cursor: 'pointer'}}>
                 <div className="r-stat-icon" style={{background: '#e0e7ff', color: '#6366f1'}}>⭐</div>
                 <div className="r-stat-info"><h2>{candidates.filter(c => c.status === "Shortlisted").length}</h2><p>Shortlisted</p></div>
               </div>
            </div>
            
            <div className="charts-grid">
               <div className="chart-box" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: 'none'}}>
                 <div className="chart-header" style={{marginBottom: 32}}>
                   <div className="chart-title">Jobs & Applications Tracking</div>
                   <div style={{ fontSize: 13, color: "var(--theme-accent)", background: "var(--theme-accent-light)", padding: "6px 14px", borderRadius: 20, fontWeight: 700 }}>Live Data Active</div>
                 </div>
                 <div style={{ height: 200, display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", position: "relative", padding: '0 10px 10px' }}>
                    {/* Bar Chart Mock implementation */}
                    <div style={{width: '20px', height: '40%', background: 'var(--theme-accent)', borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>M</span></div>
                    <div style={{width: '20px', height: '60%', background: 'var(--theme-accent)', opacity: 0.6, borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>T</span></div>
                    <div style={{width: '20px', height: '80%', background: 'var(--theme-accent)', borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>W</span></div>
                    <div style={{width: '20px', height: '50%', background: 'var(--theme-accent)', opacity: 0.6, borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>T</span></div>
                    <div style={{width: '20px', height: '90%', background: 'var(--theme-accent)', borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>F</span></div>
                    <div style={{width: '20px', height: '100%', background: '#10b981', borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>S</span></div>
                    <div style={{width: '20px', height: '70%', background: 'var(--theme-accent)', opacity: 0.6, borderRadius: '4px 4px 0 0', position: 'relative'}}><span style={{position:'absolute', top:-20, fontSize:10}}>S</span></div>
                 </div>
               </div>
               
               <div className="chart-box" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: 'none', display: 'flex', flexDirection: 'column'}}>
                 <div className="chart-title" style={{ marginBottom: 24, alignSelf: 'flex-start' }}>Gender Demographics (Applicants)</div>
                 <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                     <div className="pie-chart" style={{background: 'conic-gradient(var(--theme-accent) 65%, #cbd5e1 65%)', width: 160, height: 160}}>
                       <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontWeight: 800, fontSize: 24}}>65%</div>
                     </div>
                     <div className="chart-legend" style={{marginTop: 'auto'}}>
                       <div><span style={{ color: "var(--theme-accent)" }}>●</span> Male (65%)</div>
                       <div><span style={{ color: "#cbd5e1" }}>●</span> Female (35%)</div>
                     </div>
                 </div>
               </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div className="chart-title">Recent Job Posted</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", cursor: "pointer" }} onClick={() => setActiveMenu('Jobs')}>View all ↗</div>
            </div>
            <div className="grid-2">
              {jobs.slice(0, 2).map((j, i) => (
                <div key={j.id} className="job-card-lite" style={{ background: i === 0 ? "var(--theme-accent-light)" : "white" }}>
                   <div className="job-card-header">
                      <div>
                        <h3 className="job-title-lite">{j.title}</h3>
                        <div className="job-applicants">{j.applicants} Applicants</div>
                      </div>
                   </div>
                   <div className="job-meta-row">
                      <div className="job-meta-item">⏱️ {j.type}</div>
                      <div className="job-meta-item">🏢 Onsite</div>
                      <div className="job-meta-item">📅 {j.experience} Year Experience</div>
                   </div>
                   {j.skills && j.skills.length > 0 && (
                     <div className="job-skills-req" style={{ borderBottom: "none" }}>
                        <div className="skill-tags">
                          {j.skills.map(s => <div key={s} className="skill-tag">{s}</div>)}
                        </div>
                     </div>
                   )}
                   <div className="job-closed" style={{ marginTop: 24 }}>Will be Closed: {j.closed}</div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {activeMenu === "Jobs" && (
          <div>
             <div className="job-tabs">
                <div className={`job-tab ${activeTab === 'Recommended' ? 'active' : ''}`} onClick={() => setActiveTab('Recommended')}>Recommended ({candidates.filter(c => c.status === "Recommended").length})</div>
                <div className={`job-tab ${activeTab === 'Applied' ? 'active' : ''}`} onClick={() => setActiveTab('Applied')}>Applied ({candidates.filter(c => c.status === "Applied").length})</div>
                <div className={`job-tab ${activeTab === 'Shortlist' ? 'active' : ''}`} onClick={() => setActiveTab('Shortlist')}>Shortlist ({candidates.filter(c => c.status === "Shortlisted").length})</div>
                <div className={`job-tab ${activeTab === 'Rejected' ? 'active' : ''}`} onClick={() => setActiveTab('Rejected')}>Rejected</div>
             </div>
             
             {getCandidatesForTab().length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "var(--text-secondary)" }}>No candidates in this list currently.</div>
             ) : (
                <div className="grid-2">
                  {getCandidatesForTab().map(c => (
                    <div key={c.id} className="rec-applicant-card" style={{ background: c.score > 90 ? "var(--theme-accent-light)" : "white" }}>
                       <div style={{ width: '100%' }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                             <div className="app-user-info">
                                <div className="app-avatar">
                                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${c.name}`} alt="avatar" style={{width: '100%', height: '100%', borderRadius: '50%'}}/>
                                </div>
                                <div>
                                  <div className="app-name">
                                    {c.name} 
                                    <span style={{fontSize: 10, color: 'var(--success)', background: 'var(--bg-secondary)', padding: "2px 6px", borderRadius: 4, marginLeft: 8}}>• {c.status}</span>
                                  </div>
                                  <div className="app-role">{c.role}</div>
                                </div>
                             </div>
                             <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "right" }}>
                                <div>20 May, 2023</div>
                             </div>
                          </div>
                          
                          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "var(--text-secondary)", marginBottom: 20, paddingLeft: 60 }}>
                             <div>{c.exp.replace(' Yrs', '')} <span style={{fontSize: 10}}>Yrs</span><br/><strong style={{color: '#000'}}>Experience</strong></div>
                             <div>{c.email}<br/><strong style={{color: '#000'}}>{c.phone}</strong></div>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                             <div className="app-score-col">
                                <div className="app-score">{c.score}</div>
                                <div>
                                   <strong style={{color: '#000', fontSize: 14}}>Head Score</strong><br/>
                                   <span style={{fontSize: 12, color: "var(--text-secondary)"}}>Full Match</span>
                                </div>
                             </div>
                             
                             {c.status !== "Shortlisted" && c.status !== "Rejected" && (
                               <div style={{ display: "flex", gap: "8px" }}>
                                 <button className="btn-shortlist" style={{ background: "white", color: "black", border: "1px solid var(--border-light)" }} onClick={() => handleReject(c.id)}>Reject</button>
                                 <button className="btn-shortlist" onClick={() => handleShortlist(c.id)}>✔️ Shortlist</button>
                               </div>
                             )}
                             {c.status === "Shortlisted" && <button className="btn-shortlist" disabled style={{ background: "var(--success)" }}>Shortlisted</button>}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
             )}
          </div>
        )}

        {/* Mock other tabs */}
        {activeMenu === "Messages" && <MessagesPage />}
        {activeMenu === "Profile" && <ProfilePage user={user} role="recruiter" />}
        {activeMenu === "Support" && (
          <div style={{padding: 40, background: 'white', borderRadius: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'}}>
            <h2 style={{fontSize: 24, fontWeight: 800, marginBottom: 16}}>Help & Support</h2>
            <p style={{color: 'var(--text-secondary)'}}>Need help? View our features or contact support. Reach out to employersupport@headsin.com for recruiter specific queries.</p>
          </div>
        )}
        {activeMenu === "Password Reset" && (
          <div style={{padding: 40, background: 'white', borderRadius: 24, maxWidth: 450, boxShadow: '0 4px 12px rgba(0,0,0,0.02)'}}>
            <h2 style={{fontSize: 24, fontWeight: 800, marginBottom: 16}}>Reset Password</h2>
            <p style={{color: 'var(--text-secondary)', marginBottom: 24}}>Enter your registered email address. We will send you instructions on how to reset.</p>
            <input className="form-input" placeholder="Email Address" value={user.email} disabled />
            <button className="btn-primary-auth" onClick={() => alert('Password reset requirements sent to ' + user.email)}>Send Instructions</button>
          </div>
        )}
        {activeMenu === "Create Job" && (
          <div style={{padding: 40, background: 'white', borderRadius: 24, maxWidth: 600}}>
             <h2 style={{fontSize: 24, fontWeight: 800, marginBottom: 24}}>Create a Job Posting</h2>
             <input className="form-input" placeholder="Job Title" id="cj-title" />
             <input className="form-input" placeholder="Company Name" id="cj-company" />
             <div className="grid-2">
                <input className="form-input" placeholder="Location" id="cj-location" />
                <input className="form-input" placeholder="Experience (e.g. 1+ Years)" id="cj-exp" />
             </div>
             <button className="btn-primary-auth" onClick={() => {
                const t = document.getElementById('cj-title').value || "New Position";
                const c = document.getElementById('cj-company').value || "Company Name";
                const l = document.getElementById('cj-location').value || "Remote";
                const e = document.getElementById('cj-exp').value || "Fresher";
                setJobs([{ id: Date.now(), title: t, company: c, location: l, experience: e, applicants: 0, closed: "Open", type: "Full Time", skills: [], match: 100 }, ...jobs]);
                setActiveMenu("Dashboard");
             }}>Post Job to Platform</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────
const HomePage = ({ onLoginClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const activeJobs = [
    { title: "Business Development Manager", company: "Shunya Digital", loc: "Delhi", ctc: "₹ 2,00,000 - 3,50,000 /year", icon: "💼" },
    { title: "Sales And Marketing Exec", company: "Quickship Enterprises", loc: "Work From Home", ctc: "₹ 2,01,000 - 3,05,000 /year", icon: "🏢" },
    { title: "Pharmacist- Apollo Hospital", company: "Apollo Pharmacy", loc: "Bangalore", ctc: "₹ 2,50,000 - 3,00,000 /year", icon: "🏥" },
    { title: "Customer Service Exec", company: "Hexaware", loc: "Thane", ctc: "₹ 2,00,000 - 2,50,000 /year", icon: "📞" },
  ];

  const filteredJobs = activeJobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="home-nav-left">
          <div className="home-brand">
            <div className="home-brand-icon">h</div>
            <span>heads<b>in</b></span>
          </div>
          <div className="home-nav-links">
            <div className="nav-item sub-dropdown-parent">
                Jobs <small>▼</small>
                <div className="sub-dropdown">
                    <div className="sub-dropdown-item">Top Locations</div>
                    <div className="sub-dropdown-item">Top Categories</div>
                    <div className="sub-dropdown-item">Fresher Jobs</div>
                    <div className="sub-dropdown-item">Explore More Jobs</div>
                </div>
            </div>
            <div className="nav-item sub-dropdown-parent">
                Internships <small>▼</small>
                <div className="sub-dropdown">
                    <div className="sub-dropdown-item">Work from home</div>
                    <div className="sub-dropdown-item">Internships in Bangalore</div>
                    <div className="sub-dropdown-item">Internships in Delhi</div>
                    <div className="sub-dropdown-item">Internships in Hyderabad</div>
                </div>
            </div>
            <div className="nav-item">Courses <span className="offer-tag">OFFER</span> <small>▼</small></div>
          </div>
        </div>
        <div className="home-nav-right">
          <div className="home-search">
            <span>🔍</span> <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <button className="home-btn-outline" onClick={onLoginClick}>Login</button>
          <button className="home-btn-filled" onClick={onLoginClick}>Register</button>
          
        </div>
      </nav>

      {/* Hero Section */}
      <div className="home-hero">
        <div className="home-hero-content">
          <h1>India's <span>#1 platform</span></h1>
          <h2>For fresher jobs, internships and courses</h2>
          
          <div className="home-signup-box">
            <div className="signup-box-title">Candidate sign up</div>
            <div className="signup-box-buttons">
              <button className="signup-google" onClick={() => onLoginClick({ email: 'seeker@headsin.com', name: 'Seeker User', isLogin: false })}>
                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
                Continue with Google
              </button>
              <button className="signup-email" onClick={onLoginClick}>
                ✉️ Continue with Email
              </button>
            </div>
            <div className="signup-terms">
              By continuing as a candidate, you agree to our <u>T&C.</u>
            </div>
          </div>
          
          
        </div>
        
        <div className="home-hero-images">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" alt="Student 1" className="student-img-1" />
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop" alt="Student 2" className="student-img-2" />
        </div>
      </div>
      
      {/* Brands Ribbon */}
      <div className="home-brands-ribbon">
        <div className="brands-stats">
          <div className="stat-num">10K+</div>
          <div className="stat-text">Openings daily</div>
        </div>
        <div className="brands-logos">
          <span>practo•</span>
          <span>OYO</span>
          <span>paytm</span>
          <span>Nestlē</span>
          <span>HCL</span>
        </div>
      </div>

      {/* Trending Now */}
      <div className="home-section">
        <h3 className="section-title">Trending now <span role="img" aria-label="fire">🔥</span></h3>
        <div className="trending-chips">
          {["Work from home", "Part-time", "MBA", "Engineering", "Media", "Design", "Data Science", "Marketing"].map(chip => (
            <div key={chip} className="trending-chip">{chip}</div>
          ))}
        </div>
      </div>

      {/* Actively Hiring Jobs */}
      <div className="home-section highlight-bg">
        <h3 className="section-title">What are you looking for today?</h3>
        <h4 className="section-subtitle">Actively hiring Jobs</h4>
        
        <div className="home-items-row">
          {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
             <div key={idx} className="home-item-card">
                <div className="item-card-header">
                  <div>
                    <h4 className="item-title">{job.title}</h4>
                    <div className="item-company">{job.company}</div>
                  </div>
                  <div className="item-logo">{job.icon}</div>
                </div>
                <div className="item-meta">📍 {job.loc}</div>
                <div className="item-meta">💰 {job.ctc}</div>
                <div className="item-meta"><span className="item-tag">Job</span></div>
                <div className="item-link" onClick={onLoginClick}>View details &gt;</div>
             </div>
          )) : (
             <div style={{padding: '24px', color: 'var(--text-secondary)'}}>No jobs found matching "{searchQuery}"</div>
          )}
        </div>
        <div className="explore-more-btn" onClick={onLoginClick}>Explore more than 15,000+ jobs</div>
      </div>
      
      {/* Internships Section */}
      <div className="home-section">
        <h3 className="section-title">Latest Internships</h3>
        
        <div className="home-items-row">
          {[
            { title: "Curriculum Developer", company: "Ampersand Group", loc: "Mumbai", stp: "₹ 15,000 - 20,000 /month", dur: "6 Months", icon: "📚" },
            { title: "Human Resources (HR)", company: "Sky Automobiles", loc: "Bhubaneswar", stp: "₹ 2,000 - 5,000 /month", dur: "2 Months", icon: "👥" },
            { title: "Video Editing/Making", company: "Scaler Academy", loc: "Bangalore", stp: "₹ 20,000 - 25,000 /month", dur: "4 Months", icon: "🎥" },
            { title: "Recruitment", company: "NoBroker Tech", loc: "Bangalore", stp: "₹ 12,500 - 18,000 /month", dur: "6 Months", icon: "🤝" },
          ].map((intern, idx) => (
             <div key={idx} className="home-item-card">
                <div className="item-card-header">
                  <div>
                    <h4 className="item-title">{intern.title}</h4>
                    <div className="item-company">{intern.company}</div>
                  </div>
                  <div className="item-logo">{intern.icon}</div>
                </div>
                <div className="item-meta">📍 {intern.loc}</div>
                <div className="item-meta">💰 {intern.stp}  •  ⏳ {intern.dur}</div>
                <div className="item-meta"><span className="item-tag internship">Internship</span></div>
                <div className="item-link">View details &gt;</div>
             </div>
          ))}
        </div>
        <div className="explore-more-btn">Explore more than 15,000+ internships</div>
      </div>
      
      {/* Placement Courses with AI */}
      <div className="home-section pt-bg">
        <h3 className="section-title-large">Placement Courses with AI</h3>
        <ul className="pt-perks">
          <li>✔️ Exclusive placement opportunities</li>
          <li>✔️ Course fee refund if not hired</li>
          <li>✔️ Get placed in top brands</li>
        </ul>
        
        <div className="home-items-row large">
          {[
            { title: "Full Stack Developer", lp: "18 LPA", img: "💻" },
            { title: "Data Scientist", lp: "9 LPA", img: "📊" },
            { title: "HR Manager", lp: "11.5 LPA", img: "👥" },
            { title: "Digital Marketer", lp: "10 LPA", img: "📈" }
          ].map((course, idx) => (
            <div key={idx} className="pt-course-card">
               <div className="pt-banner">{course.img}</div>
               <div className="pt-rating">⭐ 4.5</div>
               <div className="pt-become">Become a</div>
               <h4 className="pt-title">{course.title}</h4>
               <div className="pt-ai-badge">Placement Course with AI ✨</div>
               <ul className="pt-details">
                 <li>Highest salary offered: ₹{course.lp}</li>
                 <li>Learn from industry experts</li>
               </ul>
               <div className="pt-link">Know more &gt;</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Certification Courses */}
      <div className="home-courses-section">
        <h3>Popular certification courses</h3>
        <p>Fastest way to build your CV</p>
        
        <div className="home-courses-grid">
          {[
            { tag: 'Trending in AI', title: 'Artificial Intelligence and Machine Learning', duration: '8 weeks', rating: '4.1', learners: '91,313', icon: '🤖' },
            { title: 'Full Stack Web Development with AI', duration: '8 weeks', rating: '4.1', learners: '91,313', icon: '💻' },
            { title: 'Programming with Python with AI', duration: '6 weeks', rating: '4.1', learners: '73,600', icon: '🐍' },
            { title: 'Complete Digital Marketing with AI', duration: '8 weeks', rating: '4.1', learners: '56,913', icon: '📈' },
            { title: 'Machine Learning with AI', duration: '6 weeks', rating: '4.5', learners: '28,103', icon: '⚙️' },
            { title: 'Advanced Excel with AI', duration: '4 weeks', rating: '4.4', learners: '30,442', icon: '📊' },
            { title: 'AutoCAD with AI', duration: '6 weeks', rating: '4.3', learners: '31,673', icon: '📐' },
            { title: 'Data Science with AI', duration: '6 weeks', rating: '4.1', learners: '27,182', icon: '📅' },
          ].map((course, idx) => (
            <div key={idx} className="home-course-card">
              <div className="course-icon-banner">{course.icon}</div>
              <div className="course-duration">{course.duration}</div>
              <div className="course-title">{course.title}</div>
              {course.tag && <div className="course-tag">{course.tag}</div>}
              <div className="course-meta">
                <span className="course-rating">⭐ {course.rating}</span>
                <span className="course-learners">{course.learners} learners</span>
              </div>
              <div className="course-link">Know more &gt;</div>
            </div>
          ))}
        </div>
        <div className="explore-more-btn" style={{marginTop: 32}}>Learn in-demand skills and get certified</div>
      </div>
      
      {/* Resume Builder Section */}
      <div className="home-section resume-section">
         <div className="resume-section-content">
           <h3>No resume? No problem.</h3>
           <p style={{marginBottom: 24}}>Let us help you create one or improve the one you've got.</p>
           <ul className="resume-points">
             <li>🎯 AI-powered resume builder</li>
             <li>💡 Intelligent feedback engine</li>
             <li>🚀 Optimized for freshers</li>
           </ul>
         </div>
         <div className="resume-section-img">📄✨</div>
      </div>

      {/* Employers Section */}
      <div className="home-section employer-section">
         <div className="employer-section-content">
           <h3>headsin for employers</h3>
           <p className="subtitle" style={{fontWeight: 700}}>Looking to hire freshers and interns?</p>
           <p style={{marginBottom: 32}}>Access India's largest talent pool of 3.2 crore+ candidates with AI-powered tools and smart filters to hire faster.</p>
           <button className="emp-action-btn" onClick={onLoginClick}>Post a Job / Internship</button>
         </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="home-section">
        <h3 className="section-title" style={{textAlign: 'center', marginBottom: 8}}>28,48,723+ placements - read their stories</h3>
        <h4 className="section-subtitle" style={{textAlign: 'center', marginBottom: 40}}>Go-to platform for students and freshers</h4>
        <div className="home-items-row">
           {[
             { name: "Yogesh Singh", place: "Flipkart", title: "Got my dream job at Flipkart!", quote: "I landed my first internship from Internshala! This app has opportunities for every student and is a must-have for students looking to build their careers." },
             { name: "Yaswanth Mandapati", place: "Amazon", title: "Got my dream job at Amazon!", quote: "I applied to Amazon and got the job! It was my dream. I wanted to get into tech but I was from an electrical background. Thanks to Internshala." },
             { name: "Pankaj", place: "Star Health", title: "Turning doubts into success", quote: "Internshala guided me through the entire process, helping me build the right skills and confidence. Thanks to their support!" }
           ].map((t, idx) => (
             <div key={idx} className="testimonial-card">
               <div className="t-title">"{t.title}"</div>
               <div className="t-quote">{t.quote}</div>
               <div className="t-author">
                 <div className="t-avatar">👤</div>
                 <div>
                   <div className="t-name">{t.name}</div>
                   <div className="t-place">Placed in {t.place}</div>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
      
      {/* Pre-footer */}
      <div className="home-prefooter">
        <h3>Empower your career with Internshala today</h3>
        <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24, marginBottom: 16}}>
          <button className="signup-google prefooter-btn" style={{width: 'auto'}} onClick={() => onLoginClick({ email: 'seeker@headsin.com', name: 'Seeker User', isLogin: false })}>
            <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
            Continue with Google
          </button>
          <button className="signup-email prefooter-btn dark-btn" onClick={onLoginClick} style={{width: 'auto', background: 'rgba(255,255,255,0.1)'}}>
            ✉️ Continue with Email
          </button>
        </div>
        <div className="signup-terms" style={{color: 'rgba(255,255,255,0.7)', fontSize: 12}}>By continuing, you agree to our T&C.</div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-grid">
           <div>
             <h5>Internship by Places</h5>
             <small>Internship in Bangalore</small>
             <small>Internship in Delhi</small>
             <small>Internships in Hyderabad</small>
             <small>Internship in Mumbai</small>
             <small>Internship in Chennai</small>
             <small>Internship in Pune</small>
             <small style={{color: 'inherit'}}>View all internship...</small>
           </div>
           <div>
             <h5>Jobs by Places</h5>
             <small>Jobs in Bangalore</small>
             <small>Jobs in Delhi</small>
             <small>Jobs in Hyderabad</small>
             <small>Jobs in Gurgaon</small>
             <small>Jobs in Kolkata</small>
             <small>Jobs in Mumbai</small>
             <small style={{color: 'inherit'}}>View all jobs...</small>
           </div>
           <div>
             <h5>Fresher Jobs by Places</h5>
             <small>Fresher Jobs in Bangalore</small>
             <small>Fresher Jobs in Delhi</small>
             <small>Fresher Jobs in Hyderabad</small>
             <small>Fresher Jobs in Chennai</small>
             <small>Fresher Jobs in Pune</small>
             <small>Fresher Jobs in Mumbai</small>
             <small style={{color: 'inherit'}}>View all fresher jobs...</small>
           </div>
           <div>
             <h5>Certification Courses OFFER</h5>
             <small>Full Stack Web Development with AI</small>
             <small>Programming with Python with AI</small>
             <small>Machine Learning with AI</small>
             <small>Advanced Excel with AI</small>
             <small>AutoCAD with AI</small>
             <small>Data Science with AI</small>
             <small style={{color: 'inherit'}}>View all courses...</small>
           </div>
        </div>
        <div className="footer-bottom">
           <div>About us • We're hiring • Hire interns for your company • Post a Job • Our Services • Contact us</div>
           <div>© Copyright 2026 heads<b>in</b> Web App</div>
        </div>
      </footer>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authProps, setAuthProps] = useState({});
  const [registeredUsers, setRegisteredUsers] = useState([
    { name: 'Admin User', email: 'admin@headsin.com', password: 'password', location: 'NY', phone: '1234567890', role: 'recruiter' },
    { name: 'Seeker User', email: 'seeker@headsin.com', password: 'password', location: 'SF', phone: '0987654321', role: 'seeker' }
  ]);

  if (!user) {
    if (showAuth) {
      return (
        <>
           <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
             <button className="btn-ghost" onClick={() => setShowAuth(false)}>← Back to Home</button>
           </div>
           <AuthPage 
             login={(u) => setUser(u)} 
             registeredUsers={registeredUsers}
             setRegisteredUsers={setRegisteredUsers}
             initialIsLogin={authProps.isLogin ?? true}
             initialEmail={authProps.email || ''}
             initialName={authProps.name || ''}
           />
        </>
      );
    }
    return <HomePage onLoginClick={(props) => { setAuthProps(props || {}); setShowAuth(true); }} />;
  }
  
  // Create Main app contents without provider (since provider needs to wrap everything)
  const dashboard = user.role === "seeker" ? (
    <SeekerDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  ) : (
    <RecruiterDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  );

  return dashboard;
}

export default function AppWrapper() {
  return <App />;
}