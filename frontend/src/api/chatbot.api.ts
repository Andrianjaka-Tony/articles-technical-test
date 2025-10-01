import { api } from "@/src/api/base.api";
import { CHATBOT_API } from "@/src/utils/api.utils";

type AskBotRequest = { message: string };
type AskBotResponse = { answer: string; sources: string[] };
async function askBot(body: AskBotRequest) {
  const response = await api<AskBotResponse>(`${CHATBOT_API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.data;
}

export const chatbotApi = { ask: askBot };
