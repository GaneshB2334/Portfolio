import ChimeChat from "@/icons/Images/ChimeChat.png";
import CineMatch from "@/icons/Images/CineMatch.png";
import EmailCampaign from "@/icons/Images/EmailCampaign.png";
import ShareDoc from "@/icons/Images/ShareDoc.png";

const projects = [
  {
    title: "clipd — Linux Clipboard Manager",
    description:
      "Win+V style clipboard history for Linux. Opens in ~10ms, 5MB idle.",
    // Desktop app, so the primary action is a download rather than a live site.
    ctaLabel: "Download .deb",
    gitHub: "https://github.com/GaneshB2334/linux-clipboard",
    Link: "https://github.com/GaneshB2334/linux-clipboard/releases/latest/download/clipd_amd64.deb",
  },
  {
    title: "Namaha PDF",
    description: "PDF editor for editing documents online",
    gitHub: null,
    Link: "https://pdf.namahatech.com/",
  },
  {
    title: "Email Campaign Hub",
    description: "A platform to send bulk emails",
    ProjectImage: EmailCampaign,
    gitHub: "https://github.com/GaneshB2334/email-campaign-hub",
    Link: "https://email-campaign-hub.vercel.app/",
  },
  {
    title: "ChimeChat",
    description: "Real time chat application",
    ProjectImage: ChimeChat,
    gitHub: "https://github.com/GaneshB2334/Chat-App",
    Link: "https://chimechat-app.vercel.app/",
  },
  {
    title: "Share The Doc",
    description: "Document Sharing Platform",
    ProjectImage: ShareDoc,
    gitHub: "https://github.com/GaneshB2334/share-the-doc",
    Link: "https://share-the-doc.vercel.app/",
  },
  {
    title: "Cine Match",
    description: "Movie Recommendation App",
    ProjectImage: CineMatch,
    gitHub: "https://github.com/GaneshB2334/movie-suggesto-ui",
    Link: "https://cine-matched.netlify.app/",
  },
];

export default projects;
