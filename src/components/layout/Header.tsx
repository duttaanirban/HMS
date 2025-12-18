import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/", hash: "" },
  { name: "Features", href: "/", hash: "features" },
  { name: "Doctors", href: "/", hash: "doctors" },
  { name: "Contact Us", href: "/", hash: "contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string, hash: string) => {
    if (location.pathname !== href) {
      navigate(href);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (hash) {
      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              MediCare<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.hash)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href && location.hash === (link.hash ? `#${link.hash}` : "")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop Login Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default">
                  Login
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/login/patient" className="w-full cursor-pointer">
                    Patient Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login/doctor" className="w-full cursor-pointer">
                    Doctor Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login/admin" className="w-full cursor-pointer">
                    Admin Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="hero" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.href, link.hash);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    location.pathname === link.href && location.hash === (link.hash ? `#${link.hash}` : "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-border space-y-2 px-4">
                <p className="text-xs text-muted-foreground font-medium mb-2">Login as:</p>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/login/patient">Patient Login</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/login/doctor">Doctor Login</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/login/admin">Admin Login</Link>
                </Button>
                <Button variant="hero" className="w-full mt-2" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
