const spanishVoicePrefixes = ["es-", "es_"];

function getSpanishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(voice => spanishVoicePrefixes.some(prefix => voice.lang.toLowerCase().startsWith(prefix)));
}

export function speakSpanish(text: string, enabled = true) {
  const phrase = text.trim();
  if (!enabled || !phrase || !("speechSynthesis" in window)) return false;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(phrase);
  const voice = getSpanishVoice();
  utterance.lang = voice?.lang ?? "es-ES";
  utterance.voice = voice ?? null;
  utterance.rate = 0.85;

  window.speechSynthesis.speak(utterance);
  return true;
}

export function getQuestionAudioText(question: { prompt: string; instruction?: string; audioText?: string }) {
  if (question.audioText?.trim()) return question.audioText.trim();

  const source = `${question.prompt} ${question.instruction ?? ""}`;
  const quoted = source.match(/[“"]([^”"]+)[”"]/);
  if (quoted?.[1]) return quoted[1];

  const sayInstruction = source.match(/\bsay:\s*([^.?]+)/i);
  if (sayInstruction?.[1]) return sayInstruction[1];

  return question.prompt;
}
