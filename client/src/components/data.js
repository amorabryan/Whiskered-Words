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

export async function readCurrentCat(catId, token) {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`/api/cats/${catId}`, req);
  if (!response.ok) throw new Error(`fetch Error ${response.status}`);
  const result = await response.json();
  return result;
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

export async function updateCat(event, catId, token) {
  const formData = new FormData(event.target);
  const newCatData = Object.fromEntries(formData.entries());
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newCatData),
  };
  const response = await fetch(`/api/cats/${catId}`, req);
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
