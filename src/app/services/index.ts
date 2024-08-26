export async function apiFetch(url: string, option?: RequestInit) {
  const res = await fetch(url, option);

  return res.json();
}
