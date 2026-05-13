export function json(data, status = 200) {
  return Response.json(data, { status });
}

export async function body(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function parsePhotos(input = []) {
  return Array.isArray(input)
    ? input.filter(Boolean).map((url, index) => ({ url, order: index }))
    : [];
}
