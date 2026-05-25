import re

with open('frontend/src/App.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Imports
imports_old = '''import "./index.css";
import React, { useState } from "react";'''
imports_new = '''import "./index.css";
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";'''

content = content.replace(imports_old, imports_new)

# Update the App Root to add the provider wrapper
app_root_old = '''    return <HomePage onLoginClick={(props) => { setAuthProps(props || {}); setShowAuth(true); }} />;
  }
  
  return user.role === "seeker" ? (
    <SeekerDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  ) : (
    <RecruiterDashboard user={user} logout={() => {setUser(null); setShowAuth(false);}} />
  );
}'''

app_root_new = '''    return <HomePage onLoginClick={(props) => { setAuthProps(props || {}); setShowAuth(true); }} />;
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
  return (
    <GoogleOAuthProvider clientId="827870198089-qf749rflq9ps2lmt1n001pqu99uqq7m4.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  );
}'''
content = content.replace(app_root_old, app_root_new)

# Update App to rename the previous default export
content = content.replace('export default function App() {', 'function App() {')

# Rewrite AuthPage Google Login Integration
# Replace signup google button on Homepage
google_btn_old = '''<button className="signup-google" onClick={() => onLoginClick({ email: 'user@google.com', isLogin: false })}>
                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
                Continue with Google
              </button>'''

google_btn_new = '''<div className="google-login-wrapper" style={{ flex: 1, minWidth: 180, display: "flex", justifyContent: "center", background: "white", borderRadius: 8, overflow: 'hidden' }}>
                <GoogleLogin 
                  onSuccess={credentialResponse => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    onLoginClick({ email: decoded.email, name: decoded.name, isLogin: false });
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                  theme="outline"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>'''
content = content.replace(google_btn_old, google_btn_new)


google_btn_pre_old = '''<button className="signup-google prefooter-btn" style={{width: 'auto'}} onClick={() => onLoginClick({ email: 'user@google.com', isLogin: false })}>
            <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" style={{ width: 18 }} />
            Continue with Google
          </button>'''

google_btn_pre_new = '''<div className="google-login-wrapper" style={{ display: 'inline-block', background: "white", borderRadius: 4, overflow: 'hidden' }}>
            <GoogleLogin 
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse.credential);
                onLoginClick({ email: decoded.email, name: decoded.name, isLogin: false });
              }}
              onError={() => console.log('Login Failed')}
              theme="outline"
            />
          </div>'''
content = content.replace(google_btn_pre_old, google_btn_pre_new)


# Update AuthPage to also use decoded variables from Google if passed through
auth_page_old = '''const AuthPage = ({ login, registeredUsers, setRegisteredUsers, initialIsLogin = true, initialEmail = "" }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);'''

auth_page_new = '''const AuthPage = ({ login, registeredUsers, setRegisteredUsers, initialIsLogin = true, initialEmail = "", initialName = "" }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);'''

content = content.replace(auth_page_old, auth_page_new)

# Auth App root initialName pass
app_auth_call_old = '''           <AuthPage 
             login={(u) => setUser(u)} 
             registeredUsers={registeredUsers}
             setRegisteredUsers={setRegisteredUsers}
             initialIsLogin={authProps.isLogin ?? true}
             initialEmail={authProps.email || ''}
           />'''

app_auth_call_new = '''           <AuthPage 
             login={(u) => setUser(u)} 
             registeredUsers={registeredUsers}
             setRegisteredUsers={setRegisteredUsers}
             initialIsLogin={authProps.isLogin ?? true}
             initialEmail={authProps.email || ''}
             initialName={authProps.name || ''}
           />'''
content = content.replace(app_auth_call_old, app_auth_call_new)

# Add a GoogleLogin in AuthPage too for "Login with Google" fallback if they are on that page
auth_box_old = '''        {error && <div style={{color: 'var(--danger)', marginBottom: 12, textAlign: 'center', fontSize: 14}}>{error}</div>}
        {success && <div style={{color: 'var(--success)', marginBottom: 12, textAlign: 'center', fontSize: 14}}>{success}</div>}

        <div className="role-selector">'''

auth_box_new = '''        {error && <div style={{color: 'var(--danger)', marginBottom: 12, textAlign: 'center', fontSize: 14}}>{error}</div>}
        {success && <div style={{color: 'var(--success)', marginBottom: 12, textAlign: 'center', fontSize: 14}}>{success}</div>}
        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
            <GoogleLogin 
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse.credential);
                setEmail(decoded.email);
                setName(decoded.name || '');
                // Try logging in instantly if email exists
                const user = registeredUsers.find(u => u.email === decoded.email);
                if (user) {
                   login(user);
                } else {
                   setIsLogin(false); // force sign up
                   setSuccess("Google verified! Please complete registration.");
                }
              }}
              onError={() => setError('Google Login Failed')}
              theme="outline"
              text={isLogin ? "signin_with" : "signup_with"}
              width="100%"
            />
        </div>
        
        <div style={{textAlign: "center", color: "var(--text-secondary)", fontSize: 12, marginBottom: 16}}>──────── OR ────────</div>

        <div className="role-selector">'''
content = content.replace(auth_box_old, auth_box_new)


with open('frontend/src/App.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Changes applied successfully!")
