const STEAM_ENDPOINT = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=4285690';
const ALLOWED_ORIGINS = new Set([
  'https://metater.net',
  'https://www.metater.net',
  'https://metater.github.io',
  'http://localhost:4321',
  'http://127.0.0.1:4321'
]);

function corsHeaders(origin) {
  const headers = { Vary: 'Origin' };
  if (origin && ALLOWED_ORIGINS.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

export async function onRequestGet({ request }) {
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response('Origin not allowed', { status: 403, headers: corsHeaders(origin) });
  }

  try {
    const upstream = await fetch(STEAM_ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!upstream.ok) throw new Error(`Steam returned ${upstream.status}`);

    const data = await upstream.json();
    const playerCount = data?.response?.player_count;
    if (data?.response?.result !== 1 || !Number.isInteger(playerCount) || playerCount < 0) {
      throw new Error('Steam returned an invalid player count');
    }

    return Response.json(data, {
      headers: {
        ...corsHeaders(origin),
        'Cache-Control': 'public, max-age=60, s-maxage=300',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch {
    return Response.json(
      { response: { result: 0 } },
      { status: 502, headers: { ...corsHeaders(origin), 'Cache-Control': 'no-store' } }
    );
  }
}

export function onRequestOptions({ request }) {
  const origin = request.headers.get('Origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(null, { status: 403, headers: corsHeaders(origin) });
  }

  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept',
      'Access-Control-Max-Age': '86400'
    }
  });
}
