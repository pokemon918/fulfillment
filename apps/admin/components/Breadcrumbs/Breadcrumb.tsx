import { Button, AddIcon } from "common";

interface BreadcrumbProps {
  pageName: string;
  href: string;
  update: string;
}

const Breadcrumb = ({ pageName, href, update="" }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <Button
        style={{ padding: '8px 12px', backgroundColor: 'var(--color-primary)', color: 'black' }}
        href={href}
        startIcon={<AddIcon />}
      >
        {update === "" ? "Create" : update}
      </Button>
    </div>
  );
};

export default Breadcrumb;
