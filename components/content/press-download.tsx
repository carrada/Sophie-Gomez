import { contactHeadline } from "@/lib/constants";

type PressDownloadProps = {
  href: string;
  label: string;
  filename?: string;
};

export function PressDownload({
  href,
  label,
  filename = "Sophie-Gaelle-Gomez-Press-Kit.pdf",
}: PressDownloadProps) {
  if (!href.trim()) return null;

  return (
    <a
      href={href}
      download={filename}
      className={`inline-block ${contactHeadline} transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-soft`}
    >
      {label} →
    </a>
  );
}
