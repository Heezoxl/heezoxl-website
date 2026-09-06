alert("JavaScript is connected, Mr Heezo!");
// Show / Hide forms
function showLogin(){
  document.getElementById('signupForm').style.display='none';
  document.getElementById('portfolio').style.display='none';
  document.getElementById('loginForm').style.display='block';
  document.getElementById('formTitle').textContent='Login to your portfolio';
  document.getElementById('forgottenpassword').style.display='none';
}
function showSignup(){
  document.getElementById('loginForm').style.display='none';
  document.getElementById('portfolio').style.display='none';
  document.getElementById('signupForm').style.display='block';
  document.getElementById('formTitle').textContent='Create your account';
  document.getElementById('forgotbox').style.display='none';
}
function showforgottenpassword(){
  document.getElementById('loginForm').style.display='none';
  document.getElementById('portfolio').style.display='none';
  document.getElementById('ForgottenpasswordForm').style.display='block';
  document.getElementById('formTitle').textContent='Create your account';
}
// SIGN UP - Saves and checks password
function handleSignup(){
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirm = document.getElementById('confirmPassword').value.trim();
  const err = document.getElementById('signupError');

  //FORGOTTEN PASSWORD - Save and check new password
function handleForgottenpassword(){
  const email = document.getElementById('email').value.trim();
  const newpassword = document.getElementById('newpassword').value.trim();
  const confirmpassword = document.getElementById('confirmpassword').value.trim();

}

  // 1. Check if all fields are filled
  if(!username || !email || !phone || !password || !confirm){
    err.textContent='Please fill all fields, properly';
    err.style.display='block'; return;
  }

  // 2. Check if password and confirm password match - THIS IS THE KEY
  if(password !== confirm){
    err.textContent='Passwords do not match! Sign up will not work.';
    err.style.display='block'; return;
  }

  // 3. Password must be at least 6 characters
  if(password.length < 6){
    err.textContent='Password must be at least 6 characters';
    err.style.display='block'; return;
  }

  // Save to browser memory (localStorage)
  const user = { username, email, phone, password };
  localStorage.setItem('heezoxl_user', JSON.stringify(user));
  localStorage.setItem('loggedIn', 'true');

  // Success - show portfolio
  err.style.display='none';
  showPortfolio(user);
}

// LOGIN - Checks saved password
function handleLogin(){
  const loginEmail = document.getElementById('loginEmail').value.trim();
  const loginPass = document.getElementById('loginPass').value.trim();
  const err = document.getElementById('loginError');
  const saved = JSON.parse(localStorage.getItem('heezoxl_user'));

  if(!saved){
    err.textContent='No account found. Please Sign Up first.';
    err.style.display='block'; return;
  }

  // Check if email/username and password is correct
  if((loginEmail === saved.email || loginEmail === saved.username) && loginPass === saved.password){
    localStorage.setItem('loggedIn','true');
    showPortfolio(saved);
  } else {
    err.textContent='Incorrect Email or Password! Login failed.';
    err.style.display='block';
  }
}

function showPortfolio(user){
  document.getElementById('signupForm').style.display='none';
  document.getElementById('loginForm').style.display='none';
  document.getElementById('portfolio').style.display='block';
  document.getElementById('formTitle').textContent='Your Portfolio';
  document.getElementById('userDisplay').textContent=user.username;
  document.getElementById('userInfo').textContent=`${user.email} | ${user.phone}`;
}

function logout(){
  localStorage.setItem('loggedIn','false');
  showLogin();
}

// GMAIL & WHATSAPP BUTTONS
function signupWithGmail(){ window.open('https://mail.google.com', '_blank'); }
function loginWithGmail(){ window.open('https://accounts.google.com', '_blank'); }
function signupWithWhatsapp(){ window.open('https://wa.me/2340000000000?text=Hello%20Heezoxl%20I%20want%20to%20sign%20up', '_blank'); }
function loginWithWhatsapp(){ window.open('https://web.whatsapp.com', '_blank'); }

// Auto-login if already logged in
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('heezoxl_user'));
  if(localStorage.getItem('loggedIn') === 'true' && saved){
    showPortfolio(saved);
  }
}
