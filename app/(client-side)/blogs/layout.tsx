// This is the layout for the contact page
export const metadata = {
  title:
    "Insights & Resources | Bizgrowth consultancy Blog on HR, Business & Technology",
  description:
    "Stay updated with Bizgrowth consultancy’s Blog, featuring expert insights, tips, and industry trends on HR, business management, digital transformation, and more.",
};

import { ReactNode } from "react";

interface ContactLayoutProps {
  children: ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}
