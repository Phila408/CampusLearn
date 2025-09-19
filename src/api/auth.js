
const USERS = [
  { id: "stu_1", email: "student@campus.ac.za", password: "student123", fullName: "Muhle Ashley Ntuli", role: "student" },
  { id: "tut_1", email: "tutor@campus.ac.za", password: "tutor123", fullName: "Phila Hanong", role: "tutor" },
];

const wait = (ms) => new Promise(res => setTimeout(res, ms));

export async function login({ email, password, role = "auto" }) {
  await wait(600); // simulate network

  const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("No account found with that email.");

  // if role selected, enforce
  if (role !== "auto" && user.role !== role) {
    throw new Error(`This email is a ${user.role} account. Please switch role to "${user.role}".`);
  }
  if (user.password !== password) throw new Error("Incorrect password.");

  const accessToken = `demo.${btoa(user.id)}.${Date.now()}`;
  return {
    accessToken,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
  };
}

export async function register({ fullName, email, password, role }) {
  await wait(700);
  const exists = USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("Email already registered.");
  const id = (role === "tutor" ? "tut_" : "stu_") + (USERS.length + 1);
  USERS.push({ id, email, password, fullName, role });
  const accessToken = `demo.${btoa(id)}.${Date.now()}`;
  return { accessToken, user: { id, email, fullName, role } };
}


export async function forgotPassword(email) {
  await wait(600);
  const exists = USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (!exists) throw new Error("We couldn't find an account with that email.");
  // In real life: send email with token link
  return { ok: true, message: "Password reset email sent." };
}

export async function googleOAuthLogin() {
  // DEMO: sign in a "student" via Google button
  await wait(500);
  const user = { id: "stu_google", email: "google.student@campus.ac.za", fullName: "Google Student", role: "student" };
  const accessToken = `demo.${btoa(user.id)}.${Date.now()}`;
  return { accessToken, user };
}
