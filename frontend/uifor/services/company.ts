const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function uploadCompanyInfo(formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/core/company-info/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload company info');
  return res.json();
}
