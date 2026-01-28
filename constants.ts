import { Globe, Calendar, Video, Youtube } from "lucide-react";
import { SocialLink } from "./types";

export const BRAND_NAME = "Dann Falcon Dev";
export const BRAND_BIO = "The Code is Art, Here I Will Create the Future";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "website",
    title: "Web Principal",
    url: "https://portfolio-ceo-dann.yoshuasoto54.workers.dev/",
    icon: Globe,
    featured: true,
  },
  {
    id: "meeting",
    title: "Agenda una Reunion",
    url: "https://api.whatsapp.com/send/?phone=584220331995&text=Hola+Dann%2C+vi+tu+portafolio+y+me+gustar%C3%ADa+contactarte.&type=phone_number&app_absent=0",
    icon: Calendar,
  },
  {
    id: "tiktok",
    title: "Tiktok",
    url: "https://www.tiktok.com/@masterhorus33",
    icon: Video,
  },
  {
    id: "youtube",
    title: "YouTube",
    url: "https://www.youtube.com/@falconstudiodev",
    icon: Youtube,
  },
];
