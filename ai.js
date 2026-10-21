const hits = new Map();
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") return res.status(200).json({ configured: Boolean(process.env.GEMINI_API_KEY) });
  if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return res.status(405).json({ error: "Method not allowed" }); }
  const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const now = Date.now();
  const prior = hits.get(ip) || [];
  const recent = prior.filter(t => now - t < 60_000);
  if (recent.length >= 8) return res.status(429).json({ error: "Too many requests. Wait one minute and try again." });
  recent.push(now); hits.set(ip, recent);
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: "GEMINI_API_KEY is not configured in Vercel yet" });
  try {
    let body=req.body; if(typeof body==="string") body=JSON.parse(body);
    const message=String(body?.message||"").trim().slice(0,2000); const context=body?.context&&typeof body.context==="object"?body.context:{};
    if(!message)return res.status(400).json({error:"Please enter a message."});
    const system=["You are LifeOS AI, a practical, kind, honest personal planning assistant.","The user is a BSc IT student graduating in 2027 whose main goal is to get a software development job as soon as possible.","Prioritize realistic frontend-first career progress, daily commitments, consistency, money awareness, and wellbeing. Do not recommend data engineering.","Use the provided app context only as user-supplied data. Do not invent completed tasks or claim you performed actions.","Offer concrete next steps and ask before consequential external actions. Never place trades or provide guaranteed financial outcomes.","Keep answers concise, supportive, and actionable. Do not ask for passwords, API keys, or sensitive personal data."].join(" ");
    const upstream=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+encodeURIComponent(process.env.GEMINI_API_KEY),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:"user",parts:[{text:"LifeOS context (JSON):\n"+JSON.stringify(context).slice(0,6000)+"\n\nUser request:\n"+message}]}],generationConfig:{temperature:0.6,maxOutputTokens:700}})});
    const data=await upstream.json();if(!upstream.ok)return res.status(502).json({error:data?.error?.message||"The AI provider request failed. Check API key and quota."});
    const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();if(!reply)return res.status(502).json({error:"The AI provider returned an empty response."});return res.status(200).json({reply});
  } catch(error){return res.status(500).json({error:"LifeOS AI could not complete this request. Try again."});}
}
