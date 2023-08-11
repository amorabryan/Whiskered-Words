export async function readCats(token) {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch('/api/cats', req);
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  return await response.json();
}

export async function addCat(event, token) {
  const formData = new FormData(event.target);
  const catData = Object.fromEntries(formData.entries());
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catData),
  };
  const response = await fetch('/api/cats', req);
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  return await response.json();
}

export async function updateCat(cat, token) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cat),
  };
  const response = await fetch(`/api/cats/${cat.catId}`, req);
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  return await response.json();
}

export async function removeCat(catId, token) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`/api/cats/${catId}`, req);
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
}
