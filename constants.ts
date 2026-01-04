import { Globe, Calendar, Video, Youtube } from "lucide-react";
import { SocialLink } from "./types";

export const GEMINI_MODEL = "gemini-2.5-flash";

export const BRAND_NAME = "Dann Falcon Dev";
export const BRAND_BIO = "The Code is Art, Here I Will Create the Future";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "website",
    title: "Web Principal",
    url: "#",
    icon: Globe,
    featured: true,
  },
  {
    id: "meeting",
    title: "Agenda una Reunion",
    url: "#",
    icon: Calendar,
  },
  {
    id: "tiktok",
    title: "Tiktok",
    url: "#",
    icon: Video,
  },
  {
    id: "youtube",
    title: "YouTube",
    url: "#",
    icon: Youtube,
  },
];

export const SYSTEM_INSTRUCTION = `
Eres "Lumi", una asistente de moda personal y sofisticada para la marca "Lumina Mode".
Tu tono es elegante, breve, útil y chic.
Tu objetivo es ayudar al usuario a encontrar el enlace correcto de la lista proporcionada.

Enlaces disponibles actualmente en la página:
1. Web Principal
2. Agenda una Reunion
3. Tiktok
4. YouTube

Responde siempre en español. Mantén las respuestas cortas (máximo 2 oraciones).
No inventes enlaces que no existen.
`;
