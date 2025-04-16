import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterLink {
  title: string;
  links: Array<{
    name: string;
    url: string;
  }>;
}

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      name: "Github",
      url: "https://github.com",
      icon: <Github size={20} />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: <Twitter size={20} />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Linkedin size={20} />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: <Instagram size={20} />,
    },
  ];

  // Footer navigation links
  const footerLinks: FooterLink[] = [
    {
      title: "Product",
      links: [
        { name: "About", url: "/about" },
        { name: "Services", url: "/services" },
        { name: "Team", url: "/team" },
        { name: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Quick Link",
      links: [
        { name: "Blog", url: "/blog" },
        { name: "Portfolio", url: "/portfolio" },
        { name: "Testimonials", url: "/testimonials" },
        { name: "FAQ", url: "/faq" },
      ],
    },
  ];

  return (
    <footer
      className={`mt-auto transition-colors duration-300 border-t border-gray-500 ${
        isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h2
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Graphic Designer
            </h2>
            <p className="mb-6">
              Creating memorable visual experiences through innovative design
              solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a
                  href="mailto:contact@example.com"
                  className="hover:underline"
                >
                  contact@example.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className={`transition-colors duration-200 hover:underline ${
                        isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar with Copyright and Social */}
      <div className={`py-6 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0 text-sm">
            © {currentYear} Graphic Designer. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.name}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDark
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                    : "hover:bg-gray-300 text-gray-600 hover:text-gray-900"
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
