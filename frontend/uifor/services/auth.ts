const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Django SimpleJWT returns { detail: "..." } on bad credentials
    const message = data?.detail || data?.non_field_errors?.[0] || 'Invalid username or password.';
    throw new Error(message);
  }

  return data; // { access, refresh }
}

export async function signup(username: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Pull the first readable error out of the nested error object
    // e.g. { error: { username: ["already exists"] } }
    if (data?.error && typeof data.error === 'object') {
      const firstField = Object.keys(data.error)[0];
      const firstMessage = data.error[firstField]?.[0] || data.error[firstField];
      throw new Error(`${firstField}: ${firstMessage}`);
    }
    throw new Error(data?.error || data?.detail || 'Signup failed. Please try again.');
  }

  return data;
}