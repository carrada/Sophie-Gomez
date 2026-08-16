import { sectionLabel, pageTitle } from "@/lib/constants";

type PageHeaderProps = {
  title: string;
  label?: string;
};

export function PageHeader({ title, label }: PageHeaderProps) {
  return (
    <header className="mb-8 md:mb-10">
      {label && <p className={`mb-4 ${sectionLabel}`}>{label}</p>}
      <h1 className={pageTitle}>{title}</h1>
    </header>
  );
}
