import { linkPrimary } from "@/lib/constants";

type PressDownloadProps = {
  href: string;
  label: string;
};

export function PressDownload({ href, label }: PressDownloadProps) {
  return (
    <a href={href} download className={linkPrimary}>
      {label}
    </a>
  );
}
