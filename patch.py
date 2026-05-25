import re

with open('frontend/src/App.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update AuthPage
auth_replacement = '''const AuthPage = ({ login, registeredUsers, setRegisteredUsers, initialIsLogin = true, initialEmail = "" }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState("");
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
};'''

old_auth = re.search(r'const AuthPage = \(\{ login \}\) => \{.*?\n\};\n', content, flags=re.DOTALL)
if old_auth:
    content = content.replace(old_auth.group(0), auth_replacement + '\n')
else:
    print("Could not find AuthPage")

# 2. Update MessagesPage Send functionality
msg_send_old = '''const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages({
      ...messages,
      [activeContact.n]: [...(messages[activeContact.n] || []), { text: newMessage, sender: 'me' }]
    });
    setNewMessage("");
  };'''

msg_send_new = '''const handleSend = () => {
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
  };'''
content = content.replace(msg_send_old, msg_send_new)

# 3. Seeker Dashboard - Support & Password Reset activeMenus, and sidebar bottom links
seeker_sidebar_bottom_old = '''<div className="sidebar-bottom">
          <div className="sidebar-item" onClick={() => alert("Support ticket opened in new window. An agent will be with you shortly.")}>🎧 Support</div>
          <div className="sidebar-item" onClick={() => alert("Password reset link has been uniquely sent to your email address.")}>🔒 Reset Password</div>
          <div className="sidebar-item" onClick={logout}>⬅️ Log Out</div>
        </div>'''
seeker_sidebar_bottom_new = '''<div className="sidebar-bottom">
          <div className={`sidebar-item ${activeMenu === "Support" ? "active" : ""}`} onClick={() => setActiveMenu("Support")}>🎧 Support</div>
          <div className={`sidebar-item ${activeMenu === "Password Reset" ? "active" : ""}`} onClick={() => setActiveMenu("Password Reset")}>🔒 Reset Password</div>
          <div className="sidebar-item" onClick={logout}>⬅️ Log Out</div>
        </div>'''
content = content.replace(seeker_sidebar_bottom_old, seeker_sidebar_bottom_new)

seeker_tabs_old = '''{/* Mock other tabs */}
        {activeMenu === "Messages" && <MessagesPage />}
        {activeMenu === "Resume" && <ResumePage />}
        {activeMenu === "Profile" && <ProfilePage user={user} role="seeker" />}'''

seeker_tabs_new = '''{/* Mock other tabs */}
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
        )}'''
content = content.replace(seeker_tabs_old, seeker_tabs_new)

# 4. Recruiter Dashboard - Sidebar links & state for "Create Job"
recruiter_sidebar_bottom_old = '''<div className="sidebar-bottom">
          <div className="sidebar-item">🎧 Support</div>
          <div className="sidebar-item">🔒 Reset Password</div>
          <div className="sidebar-item" onClick={logout}>⬅️ Log Out</div>
        </div>'''
recruiter_sidebar_bottom_new = '''<div className="sidebar-bottom">
          <div className={`sidebar-item ${activeMenu === "Support" ? "active" : ""}`} onClick={() => setActiveMenu("Support")}>🎧 Support</div>
          <div className={`sidebar-item ${activeMenu === "Password Reset" ? "active" : ""}`} onClick={() => setActiveMenu("Password Reset")}>🔒 Reset Password</div>
          <div className="sidebar-item" onClick={logout}>⬅️ Log Out</div>
        </div>'''
content = content.replace(recruiter_sidebar_bottom_old, recruiter_sidebar_bottom_new)

# Recruiter Create Job form
recruiter_create_job_btn_old = '''<button style={{ padding: "10px 24px", border: "1px solid var(--border-light)", borderRadius: 12, background: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onClick={() => setJobs([{ id: Date.now(), title: "New Job Posting", company: "Your Co", experience: "0+", applicants: 0, closed: "Open", type: "Full Time", skills: [], match: 100 }, ...jobs])}
           >'''
recruiter_create_job_btn_new = '''<button style={{ padding: "10px 24px", border: "1px solid var(--border-light)", borderRadius: 12, background: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onClick={() => setActiveMenu("Create Job")}
           >'''
content = content.replace(recruiter_create_job_btn_old, recruiter_create_job_btn_new)

# Recruiter clicking stat cards to view lists
recruiter_stats_old = '''<div className="recruiter-stats">
               <div className="r-stat-card">
                 <div className="r-stat-icon">📄</div>
                 <div className="r-stat-info"><h2>{jobs.length}</h2><p>Job Posted</p></div>
               </div>
               <div className="r-stat-card">
                 <div className="r-stat-icon" style={{background: '#fef3c7', color: '#f59e0b'}}>📥</div>
                 <div className="r-stat-info"><h2>{candidates.length}</h2><p>Total Applications</p></div>
               </div>
               <div className="r-stat-card">
                 <div className="r-stat-icon" style={{background: '#e0e7ff', color: '#6366f1'}}>⭐</div>
                 <div className="r-stat-info"><h2>{candidates.filter(c => c.status === "Shortlisted").length}</h2><p>Shortlisted</p></div>
               </div>
            </div>'''
recruiter_stats_new = '''<div className="recruiter-stats">
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
            </div>'''
content = content.replace(recruiter_stats_old, recruiter_stats_new)

# Enhance UI for tracking charts
recruiter_charts_old = '''<div className="chart-box">
                 <div className="chart-header">
                   <div className="chart-title">Jobs & Applications Tracking</div>
                   <div style={{ fontSize: 13, color: "var(--text-secondary)", background: "var(--bg-secondary)", padding: "4px 12px", borderRadius: 20 }}>Live Data</div>
                 </div>
                 <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border-light)", position: "relative" }}>
                    <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}>
                      <polyline fill="none" stroke="var(--theme-accent)" strokeWidth="3" points="0,50 50,20 100,80 150,40 200,90 250,30 300,70 350,10 400,60" />
                      <polyline fill="none" stroke="#f43f5e" strokeWidth="2" points="0,30 50,70 100,10 150,60 200,20 250,80 300,40 350,90 400,20" />
                    </svg>
                 </div>
               </div>
               
               <div className="chart-box">
                 <div className="chart-title" style={{ marginBottom: 24 }}>Gender Demographics</div>
                 <div className="pie-chart"></div>
                 <div className="chart-legend">
                   <div><span style={{ color: "var(--theme-accent)" }}>●</span> Male</div>
                   <div><span style={{ color: "var(--text-muted)" }}>●</span> Female</div>
                 </div>
               </div>'''

recruiter_charts_new = '''<div className="chart-box" style={{boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: 'none'}}>
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
               </div>'''
content = content.replace(recruiter_charts_old, recruiter_charts_new)

# Recruiter extra tabs
recruiter_tabs_old = '''{/* Mock other tabs */}
        {activeMenu === "Messages" && <MessagesPage />}
        {activeMenu === "Profile" && <ProfilePage user={user} role="recruiter" />}'''

recruiter_tabs_new = '''{/* Mock other tabs */}
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
        )}'''
content = content.replace(recruiter_tabs_old, recruiter_tabs_new)

# 5. Home Page
# Remove employer links
content = content.replace('<span className="home-employer-link" onClick={onLoginClick}>Employer sign up <span>&gt;</span></span>', '')
content = content.replace('<div className="home-hero-employer" onClick={onLoginClick}>\n            Employer sign up <span>&gt;</span>\n          </div>', '')

# Update 'Internshala for employers' -> 'headsin for employers'
content = content.replace('<h3>Internshala for employers</h3>', '<h3>headsin for employers</h3>')
content = content.replace('<button className="emp-action-btn">Post a Job / Internship</button>', '<button className="emp-action-btn" onClick={onLoginClick}>Post a Job / Internship</button>')

# Update Nav with dropdowns
nav_old = '''<div className="home-nav-links">
            <div className="nav-item">Jobs <small>▼</small></div>
            <div className="nav-item">Internships <small>▼</small></div>
            <div className="nav-item">Courses <span className="offer-tag">OFFER</span> <small>▼</small></div>
          </div>'''
nav_new = '''<div className="home-nav-links">
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
          </div>'''
content = content.replace(nav_old, nav_new)

# Connect google properly (mocks google login flow)
google_btn_old = '''<button className="signup-google">
                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
                Continue with Google
              </button>'''
google_btn_new = '''<button className="signup-google" onClick={() => onLoginClick({ email: 'user@google.com', isLogin: false })}>
                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
                Continue with Google
              </button>'''
content = content.replace(google_btn_old, google_btn_new)

google_btn_pre_old = '''<button className="signup-google prefooter-btn" style={{width: 'auto'}}>
            <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
            Continue with Google
          </button>'''
google_btn_pre_new = '''<button className="signup-google prefooter-btn" style={{width: 'auto'}} onClick={() => onLoginClick({ email: 'user@google.com', isLogin: false })}>
            <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
            Continue with Google
          </button>'''
content = content.replace(google_btn_pre_old, google_btn_pre_new)

# Modify the App Component root to manage registered users and pass auth props
app_root_old = '''// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  if (!user) {
    if (showAuth) {
      return (
        <>
           <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
             <button className="btn-ghost" onClick={() => setShowAuth(false)}>← Back to Home</button>
           </div>
           <AuthPage login={(u) => setUser(u)} />
        </>
      );
    }
    return <HomePage onLoginClick={() => setShowAuth(true)} />;
  }
  
  return user.role === "seeker" ? (
    <SeekerDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  ) : (
    <RecruiterDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  );
}'''

app_root_new = '''// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
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
           />
        </>
      );
    }
    return <HomePage onLoginClick={(props) => { setAuthProps(props || {}); setShowAuth(true); }} />;
  }
  
  return user.role === "seeker" ? (
    <SeekerDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  ) : (
    <RecruiterDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  );
}'''
content = content.replace(app_root_old, app_root_new)

with open('frontend/src/App.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Changes applied successfully!")
