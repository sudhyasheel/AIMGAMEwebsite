import { Facebook, ArrowUpRight } from "lucide-react";
import { getAlbumButtons } from "@/data/albums";

const trackAlbumClick = (page, block, city) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "album_click", page, block, city: city || "shared" });
};

const AlbumButtons = ({ page, block, align = "center" }) => {
  const buttons = getAlbumButtons(page, block);
  if (!buttons.length) return null;
  return (
    <div
      data-testid={`album-buttons-${block}`}
      className={`mt-6 flex flex-wrap gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      {buttons.map((b) => (
        <a
          key={`${b.city || "shared"}-${b.label}`}
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAlbumClick(page, block, b.city)}
          data-testid={`album-btn-${block}-${(b.city || "shared").toLowerCase()}`}
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-flame/40 px-6 py-3 font-bold text-sm text-flame transition-all duration-300 hover:bg-flame hover:text-white hover:border-flame"
        >
          <Facebook className="h-4 w-4" />
          {b.label}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
};

export default AlbumButtons;
