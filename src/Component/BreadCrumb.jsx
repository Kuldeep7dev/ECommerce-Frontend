import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items = [] }) => {
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    ...items,
  ];

  if (!breadcrumbItems.length) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={`${item.link || item.title}-${index}`} className="flex items-center gap-1">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-gray-500 text-sm"
                >
                  {item.title}
                </span>
              ) : (
                <>
                  <Link to={item.link} className="text-accent text-sm">
                    {item.title}
                  </Link>
                  <ChevronRight size={16} className="text-gray-400" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;