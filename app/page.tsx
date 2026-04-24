"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import LoadingScreen from "./components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#42b883",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#ffac45",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  "C#": "#178600",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

const fallbackRepos: Repo[] = [
  { name: "Portfolio Website", description: "A cinematic portfolio with noir aesthetics.", language: "JavaScript", stargazers_count: 5, html_url: "https://github.com/Raghdkun" },
  { name: "Mobile App", description: "Cross-platform mobile application built with Flutter.", language: "Dart", stargazers_count: 3, html_url: "https://github.com/Raghdkun" },
  { name: "Full Stack API", description: "RESTful API with Node.js, Express and MongoDB.", language: "JavaScript", stargazers_count: 8, html_url: "https://github.com/Raghdkun" },
  { name: "React Dashboard", description: "Admin dashboard with real-time data visualization.", language: "TypeScript", stargazers_count: 12, html_url: "https://github.com/Raghdkun" },
  { name: "E-Commerce Platform", description: "Complete online store with payment integration.", language: "JavaScript", stargazers_count: 7, html_url: "https://github.com/Raghdkun" },
];

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const skills = [
  { name: "REACT / NEXT.JS", pct: 90, delay: 0.1 },
  { name: "NODE.JS / EXPRESS", pct: 85, delay: 0.2 },
  { name: "FLUTTER / DART", pct: 80, delay: 0.3 },
  { name: "JAVASCRIPT / TYPESCRIPT", pct: 92, delay: 0.4 },
  { name: "DATABASES (SQL / NoSQL)", pct: 78, delay: 0.5 },
  { name: "UI/UX & DESIGN SYSTEMS", pct: 75, delay: 0.6 },
];

const techTags = ["PYTHON", "DOCKER", "AWS", "GIT", "FIREBASE", "REST API", "GRAPHQL", "TAILWIND"];

const marqueeItems = [
  "WEB DEVELOPMENT", "·", "MOBILE APPS", "·", "FULL STACK", "·",
  "REACT", "·", "NODE.JS", "·", "FLUTTER", "·",
  "UI/UX DESIGN", "·", "GITHUB PROJECTS", "·", "API DEVELOPMENT", "·", "CLOUD SERVICES", "·",
];

const heroTitleLetters = "RAGHDKUN".split("");

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactBarsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  // Fetch GitHub repos
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/Raghdkun/repos?sort=updated&per_page=5&type=public", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: Repo[]) => {
        setRepos(data.slice(0, 5));
        setLoaded(true);
      })
      .catch(() => {
        setRepos(fallbackRepos);
        setLoaded(true);
      });
    return () => controller.abort();
  }, []);

  // Custom cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    let raf: number;
    const animate = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.08;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.08;
      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [handleMouseMove]);

  // Cursor hover effects
  useEffect(() => {
    const handleEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "20px";
        cursorRef.current.style.height = "20px";
      }
      if (followerRef.current) {
        followerRef.current.style.width = "60px";
        followerRef.current.style.height = "60px";
      }
    };
    const handleLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "12px";
        cursorRef.current.style.height = "12px";
      }
      if (followerRef.current) {
        followerRef.current.style.width = "40px";
        followerRef.current.style.height = "40px";
      }
    };
    const els = document.querySelectorAll("a, button, .proj-card");
    els.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [loaded]);

  // Fade in main content after loading completes
  useEffect(() => {
    if (!isLoading && mainRef.current) {
      gsap.to(mainRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          if (mainRef.current) {
            mainRef.current.style.pointerEvents = "auto";
          }
        },
      });
    }
  }, [isLoading]);

  // GSAP Scroll Animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Skip all animations if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth < 768;

      // Nav: backdrop blur + bg opacity via ScrollTrigger
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          {
            backdropFilter: "blur(10px)",
            background: "rgba(10,10,10,0.85)",
          },
          {
            backdropFilter: "blur(30px)",
            background: "rgba(8,8,8,0.97)",
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "200px top",
              scrub: true,
            },
          }
        );
      }

      // Hero: Multi-layer parallax on bg image (skip on mobile)
      if (heroImgRef.current && !isMobile) {
        gsap.to(heroImgRef.current, {
          y: 300,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Hero content parallax (slower rate than image, skip on mobile)
      if (heroContentRef.current && !isMobile) {
        gsap.to(heroContentRef.current, {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Hero split-text staggered letter reveal
      const heroLetters = document.querySelectorAll(".hero-letter");
      if (heroLetters.length > 0) {
        gsap.fromTo(
          heroLetters,
          { y: 120, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.06,
            delay: 0.2,
          }
        );
      }

      // Hero scale-down on scroll
      if (heroSectionRef.current) {
        gsap.to(heroSectionRef.current, {
          scale: 0.9,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "80% center",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Section reveals — scrub based
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-scale").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // Section titles — cinematic scale breathing
      gsap.utils.toArray<HTMLElement>(".hero-title").forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });

      // Marquee: smooth autonomous animation (no scroll dependency)

      // Magnetic effect on buttons
      const magneticEls = document.querySelectorAll<HTMLElement>('.btn-cine');
      magneticEls.forEach((btn) => {
        const handleMagneticMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.4,
            ease: 'power2.out',
          });
        };
        const handleMagneticLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        };
        btn.addEventListener('mousemove', handleMagneticMove);
        btn.addEventListener('mouseleave', handleMagneticLeave);
      });

      // Skill bars: scrub-based fill
      const skillsContainer = document.querySelector("#skillsContainer");
      if (skillsContainer) {
        skillBarsRef.current.forEach((bar, i) => {
          if (!bar) return;
          const width = bar.getAttribute("data-width") || "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width,
              ease: "none",
              scrollTrigger: {
                trigger: skillsContainer,
                start: `top+=${i * 40} 80%`,
                end: `top+=${200 + i * 40} 40%`,
                scrub: true,
              },
            }
          );
        });
      }

      // Project cards: staggered entrance with parallax
      const projectCards = gsap.utils.toArray<HTMLElement>(".proj-card");
      if (projectCards.length > 0) {
        projectCards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 60%",
                scrub: true,
              },
            }
          );

          gsap.to(card, {
            y: -20 - i * 8,
            ease: "none",
            scrollTrigger: {
              trigger: "#projectsGrid",
              start: "top 60%",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      // 3D tilt on project cards
      projectCardsRef.current.forEach((card) => {
        if (!card) return;
        const handleTiltMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 12,
            rotateX: -y * 12,
            transformPerspective: 800,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const handleTiltLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        };
        card.addEventListener("mousemove", handleTiltMove);
        card.addEventListener("mouseleave", handleTiltLeave);
      });

      // Cinematic interlude: pin + quote fade + bg zoom
      const interlude = document.querySelector("#interlude") as HTMLElement;
      if (interlude) {
        const interludeBg = interlude.querySelector(".interlude-bg") as HTMLElement;
        const interludeQuote = interlude.querySelector("blockquote");
        const interludeAttribution = interlude.querySelector(".interlude-attribution");

        const interludeTl = gsap.timeline({
          scrollTrigger: {
            trigger: interlude,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
          },
        });

        if (interludeQuote) {
          interludeTl.fromTo(
            interludeQuote,
            { opacity: 0, y: 60, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6 },
            0
          );
        }

        if (interludeAttribution) {
          interludeTl.fromTo(
            interludeAttribution,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            0.4
          );
        }

        if (interludeBg) {
          interludeTl.fromTo(
            interludeBg,
            { scale: 1 },
            { scale: 1.15, duration: 1 },
            0
          );
        }
      }

      // Contact: dramatic title entrance
      const contactTitle = document.querySelector("#contact .hero-title");
      if (contactTitle) {
        gsap.fromTo(
          contactTitle,
          { scale: 2.5, opacity: 0, filter: "blur(10px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: "#contact",
              start: "top 90%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      // Counter animation for stats
      if (counterRef.current) {
        const statEls = counterRef.current.querySelectorAll<HTMLElement>('.stat-number');
        statEls.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counterRef.current,
              start: 'top 80%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = Math.round(counter.val) + suffix;
            },
          });
        });
      }

      // Contact film strip bars animate in sequence
      if (contactBarsRef.current) {        const bars = contactBarsRef.current.querySelectorAll(".contact-bar");
        gsap.fromTo(
          bars,
          { scaleY: 0, transformOrigin: "bottom" },
          {
            scaleY: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: contactBarsRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, [loaded, isLoading]);

  const displayRepos = repos.length > 0 ? repos : fallbackRepos;

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />

      {/* Film scratch lines */}
      <div
        className="scratch-line"
        style={{ left: "20%", height: "60vh", top: 0, animationDelay: "0s", animationDuration: "8s" }}
      />
      <div
        className="scratch-line"
        style={{ left: "75%", height: "40vh", top: 0, animationDelay: "3s", animationDuration: "11s" }}
      />

      <div
        ref={mainRef}
        style={{
          opacity: isLoading ? 0 : undefined,
          pointerEvents: isLoading ? "none" : undefined,
        }}
      >
        {/* ═══════════════ NAVIGATION ═══════════════ */}
        <nav
          ref={navRef}
          className="fixed top-0 left-0 w-full z-50"
          style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(10px)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-8 h-8 border border-white/30 flex items-center justify-center group-hover:border-white/80 transition-colors duration-300">
                <span className="text-xs font-bold tracking-widest hero-title">RK</span>
              </div>
              <span className="text-xs tracking-[0.3em] text-white/50 group-hover:text-white/80 transition-colors duration-300 hidden sm:block">
                RAGHDKUN
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              <li><a href="#about" className="text-xs tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300">ABOUT</a></li>
              <li><a href="#skills" className="text-xs tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300">SKILLS</a></li>
              <li><a href="#projects" className="text-xs tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300">PROJECTS</a></li>
              <li><a href="#contact" className="text-xs tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300">CONTACT</a></li>
            </ul>

            <div className="flex items-center gap-4">
              {/* Desktop CTA */}
              <a
                href="https://wa.me/qr/+963958743823"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cine border border-white/30 px-5 py-2.5 text-xs tracking-[0.2em] hidden md:block"
              >
                <span>HIRE ME</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className={`hamburger md:hidden ${mobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {/* Frame corners */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/20 pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/20 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/20 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/20 pointer-events-none" />

          <a href="#about" onClick={() => setMobileMenuOpen(false)}>ABOUT</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>SKILLS</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>PROJECTS</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</a>

          <a
            href="https://wa.me/qr/+963958743823"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cine border border-white/40 px-8 py-4 text-sm tracking-[0.2em] mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>HIRE ME</span>
          </a>
        </div>
        <section
          id="hero"
          ref={heroSectionRef}
          className="relative min-h-screen flex flex-col justify-center overflow-hidden vignette"
          style={{ background: "#0a0a0a", transformOrigin: "center center" }}
        >
          {/* BG image — parallax layer */}
          <div
            ref={heroImgRef}
            className="absolute inset-0 opacity-20 will-change-transform"
            style={{ filter: "grayscale(100%) contrast(1.4)" }}
          >
            <Image
              src="/images/hero-bg.png"
              alt="Film noir developer"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>

          {/* Scan lines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            }}
          />

          {/* Frame corners */}
          <div className="absolute top-24 left-8 w-12 h-12 border-l border-t border-white/20" />
          <div className="absolute top-24 right-8 w-12 h-12 border-r border-t border-white/20" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/20" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/20" />

          {/* Film frame numbers */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-20">
            <span className="text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>
              2024
            </span>
            <div className="w-px h-20 bg-white/40 mx-auto" />
            <span className="text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>
              REEL 01
            </span>
          </div>

          <div ref={heroContentRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 will-change-transform">
            {/* Tag line */}
            <div className="reveal mb-8 flex items-center gap-4">
              <div className="w-8 h-px bg-white/50" />
              <span className="text-xs tracking-[0.4em] text-white/50">FULL STACK DEVELOPER</span>
            </div>

            {/* Main title — split text letter reveal */}
            <div className="overflow-hidden mb-4" style={{ perspective: "600px" }}>
              <h1
                className="hero-title glitch text-white flex"
                data-text="RAGHDKUN"
                style={{
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.85,
                }}
              >
                {heroTitleLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="hero-letter inline-block will-change-transform"
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>

            {/* Subtitle row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-4">
              <div className="reveal delay-2">
                <p className="playfair text-xl lg:text-2xl italic text-white/60 max-w-md">
                  Crafting digital experiences that transcend the ordinary —
                  <br />
                  <span className="text-white/90">Web · Mobile · Full Stack</span>
                </p>
              </div>
              <div className="reveal delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="https://github.com/Raghdkun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cine border border-white/40 px-8 py-4 text-sm tracking-[0.2em] flex items-center gap-3"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW GITHUB</span>
                </a>
                <a href="#contact" className="btn-cine border border-white/20 px-8 py-4 text-sm tracking-[0.2em]">
                  <span>GET IN TOUCH</span>
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="reveal delay-4 mt-16 flex items-center gap-3">
              <div className="scroll-indicator flex flex-col items-center gap-2 opacity-40">
                <div className="w-px h-8 bg-white/60" />
                <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="text-xs tracking-[0.3em] text-white/40">SCROLL</span>
            </div>
          </div>
        </section>

        {/* ═══════════════ MARQUEE REEL ═══════════════ */}
        <div className="marquee-wrapper py-4 border-y border-white/10 overflow-hidden" style={{ background: "#111" }}>
          <div ref={marqueeRef} className="marquee-track text-white/40 text-xs tracking-[0.3em]">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        {/* ═══════════════ ABOUT SECTION ═══════════════ */}
        <section id="about" className="py-32 lg:py-40 relative overflow-hidden" style={{ background: "#0d0d0d" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="film-divider mb-16 reveal">
              <span className="text-xs tracking-[0.4em] text-white/30 px-4">ACT I — ABOUT</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Image side */}
              <div className="reveal-left relative">
                <div className="relative overflow-hidden" style={{ borderRadius: "0 60px 0 60px" }}>
                  <Image
                    src="/images/about-workspace.webp"
                    width={1152}
                    height={768}
                    alt="Developer workspace"
                    className="w-full h-auto object-cover opacity-70"
                    style={{ filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "luminosity" }}
                  />
                  <div
                    className="absolute inset-0 border border-white/10"
                    style={{ borderRadius: "0 60px 0 60px" }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white text-black px-6 py-4 reveal">
                  <div className="text-3xl font-bold hero-title">3+</div>
                  <div className="text-xs tracking-[0.2em]">YEARS EXP</div>
                </div>
              </div>

              {/* Text side */}
              <div className="space-y-8">
                <div className="reveal delay-1">
                  <h2 className="playfair text-5xl lg:text-6xl font-bold italic text-white leading-tight">
                    The Story
                    <br />
                    <span className="not-italic text-white/40">Behind the Code</span>
                  </h2>
                </div>

                <div className="reveal delay-2 space-y-4 text-white/60 text-sm leading-loose">
                  <p>
                    I&apos;m <strong className="text-white">Raghdkun</strong> — a passionate full stack developer
                    who architects digital worlds from concept to deployment. Every line of code is a deliberate
                    scene in a larger narrative.
                  </p>
                  <p>
                    Specializing in web, mobile, and full stack development, I bring ideas to life with precision,
                    creativity, and relentless attention to detail. From sleek frontends to robust backend systems —
                    I handle it all.
                  </p>
                </div>

                <div ref={counterRef} className="reveal grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="stat-number text-2xl font-bold text-white hero-title" data-target="15" data-suffix="+">0+</div>
                    <div className="text-xs text-white/30 tracking-wider mt-1">PROJECTS</div>
                  </div>
                  <div>
                    <div className="stat-number text-2xl font-bold text-white hero-title" data-target="3" data-suffix="+">0+</div>
                    <div className="text-xs text-white/30 tracking-wider mt-1">PLATFORMS</div>
                  </div>
                  <div>
                    <div className="stat-number text-2xl font-bold text-white hero-title" data-target="100" data-suffix="%">0%</div>
                    <div className="text-xs text-white/30 tracking-wider mt-1">COMMITTED</div>
                  </div>
                </div>

                <div className="reveal delay-4">
                  <a
                    href="https://github.com/Raghdkun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 group"
                  >
                    <span>EXPLORE MY GITHUB</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SKILLS SECTION ═══════════════ */}
        <section id="skills" className="py-32 lg:py-40 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
          <div
            className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="film-divider mb-16 reveal">
              <span className="text-xs tracking-[0.4em] text-white/30 px-4">ACT II — SKILLS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <div className="reveal">
                  <h2
                    className="hero-title text-white"
                    style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 0.9 }}
                  >
                    CRAFT
                    <br />
                    <span
                      style={{
                        color: "rgba(240,237,232,0.2)",
                        WebkitTextStroke: "1px rgba(240,237,232,0.4)",
                      }}
                    >
                      &amp;
                    </span>
                    <br />
                    SKILL
                  </h2>
                </div>
                <div
                  className="reveal delay-2 mt-8 relative overflow-hidden"
                  style={{ borderRadius: "40px 0 40px 0" }}
                >
                  <Image
                    src="/images/skills-neural.webp"
                    width={1408}
                    height={704}
                    alt="Neural network skills visualization"
                    className="w-full h-auto opacity-60 object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.4)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)",
                      borderRadius: "40px 0 40px 0",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="reveal">
                  <p className="playfair italic text-white/50 text-lg mb-8">
                    &ldquo;A developer&apos;s toolkit is their <em className="text-white">director&apos;s lens</em>{" "}
                    — each technology a different perspective.&rdquo;
                  </p>
                </div>

                <div className="space-y-5" id="skillsContainer">
                  {skills.map((skill, i) => (
                    <div key={skill.name} className="reveal skill-item" style={{ transitionDelay: `${skill.delay}s` }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs tracking-[0.2em] text-white/70">{skill.name}</span>
                        <span className="text-xs text-white/30">{skill.pct}%</span>
                      </div>
                      <div className="h-px bg-white/10 relative overflow-hidden">
                        <div
                          ref={(el) => { skillBarsRef.current[i] = el; }}
                          className="h-full bg-white absolute top-0 left-0"
                          data-width={`${skill.pct}%`}
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="reveal delay-4 flex flex-wrap gap-2 pt-6 border-t border-white/10">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-white/20 text-xs text-white/50 tracking-wider hover:border-white/60 hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ PROJECTS SECTION ═══════════════ */}
        <section id="projects" className="py-32 lg:py-40" style={{ background: "#0d0d0d" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="film-divider mb-6 reveal">
              <span className="text-xs tracking-[0.4em] text-white/30 px-4">ACT III — PROJECTS</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
              <h2
                className="hero-title text-white reveal"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9 }}
              >
                SELECTED
                <br />
                <span style={{ WebkitTextStroke: "1px rgba(240,237,232,0.3)", color: "transparent" }}>WORKS</span>
              </h2>
              <a
                href="https://github.com/Raghdkun"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal delay-2 btn-cine border border-white/30 px-6 py-3 text-xs tracking-[0.2em] self-start lg:self-end flex items-center gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>ALL REPOSITORIES</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projectsGrid">
              {displayRepos.map((repo, i) => (
                <div
                  key={i}
                  ref={(el) => { projectCardsRef.current[i] = el; }}
                  className="proj-card border border-white/10 p-6 flex flex-col justify-between min-h-64"
                  style={{ background: "#111", transformStyle: "preserve-3d" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <GithubIcon className="w-4 h-4 text-white/40" />
                        <span className="text-xs text-white/40 tracking-wider">REPOSITORY</span>
                      </div>
                      <span className="text-xs text-white/20">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="playfair text-xl text-white mb-3 italic">{repo.name}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {repo.description || "A curated repository pushing the boundaries of code."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-white/30">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{
                            background: repo.language
                              ? langColors[repo.language] || "#888"
                              : "#888",
                          }}
                        />
                        <span>{repo.language || "—"}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/30">
                        <StarIcon />
                        <span>{repo.stargazers_count}</span>
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-wider text-white/30 hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                      VIEW
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}

              {/* GitHub CTA Card */}
              <a
                href="https://github.com/Raghdkun"
                target="_blank"
                rel="noopener noreferrer"
                className="proj-card border border-white/20 p-6 flex flex-col items-center justify-center min-h-64 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-4 group-hover:border-white/60 transition-colors duration-500">
                  <GithubIcon className="w-7 h-7 text-white/40 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="playfair italic text-white/40 group-hover:text-white/70 transition-colors duration-300 text-sm">
                  See all repositories
                </p>
                <p className="text-xs tracking-[0.3em] text-white/20 mt-2">github.com/Raghdkun</p>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════ CINEMATIC INTERLUDE ═══════════════ */}
        <section
          id="interlude"
          className="relative overflow-hidden"
          style={{ background: "#080808", minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <div
            className="interlude-bg absolute inset-0 opacity-15 will-change-transform"
            style={{ filter: "grayscale(100%)" }}
          >
            <Image
              src="/images/interlude-bg.webp"
              alt="Developer workspace"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #080808 0%, rgba(8,8,8,0.3) 50%, #080808 100%)" }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full py-20">
            <blockquote className="playfair text-3xl lg:text-5xl text-white/90 italic leading-tight font-light" style={{ opacity: 0 }}>
              &ldquo;Code is the poetry of
              <br />
              <span className="not-italic font-bold text-white">the modern era.&rdquo;</span>
            </blockquote>
            <div className="interlude-attribution mt-6 flex items-center justify-center gap-4" style={{ opacity: 0 }}>
              <div className="w-12 h-px bg-white/30" />
              <span className="text-xs tracking-[0.4em] text-white/30">RAGHDKUN</span>
              <div className="w-12 h-px bg-white/30" />
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTACT SECTION ═══════════════ */}
        <section id="contact" className="py-32 lg:py-40 relative overflow-hidden" style={{ background: "#0d0d0d" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="film-divider mb-16 reveal">
              <span className="text-xs tracking-[0.4em] text-white/30 px-4">FINAL ACT — CONTACT</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div>
                  <h2
                    className="hero-title text-white"
                    style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 0.85 }}
                  >
                    LET&apos;S
                    <br />
                    MAKE
                    <br />
                    <span style={{ WebkitTextStroke: "1px rgba(240,237,232,0.4)", color: "transparent" }}>MAGIC</span>
                  </h2>
                </div>
                <div className="reveal delay-2 mt-8">
                  <p className="playfair italic text-white/50 text-lg max-w-sm leading-relaxed">
                    Ready to bring your vision to life? Let&apos;s write the next chapter together.
                  </p>
                </div>

                <div ref={contactBarsRef} className="reveal delay-3 mt-12 flex gap-1">
                  {[5, 10, 5, 15, 5, 10, 5, 20, 5, 10].map((opacity, i) => (
                    <div
                      key={i}
                      className="contact-bar w-1 h-24 border border-white/10"
                      style={{ background: `rgba(255,255,255,${opacity / 100})` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <a
                  href="https://wa.me/message/+963958743823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal delay-1 group block border border-white/20 p-8 hover:border-white/60 transition-all duration-500 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1a1a1a, #0d0d0d)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), transparent)" }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span className="text-xs tracking-[0.3em] text-white/50">WHATSAPP</span>
                      </div>
                      <h3 className="playfair text-2xl italic text-white mb-1">Message Me</h3>
                      <p className="text-xs text-white/30">Available for new projects</p>
                    </div>
                    <ArrowIcon className="w-6 h-6 text-white/30 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </a>

                <a
                  href="https://github.com/Raghdkun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal delay-2 group block border border-white/10 p-8 hover:border-white/40 transition-all duration-500"
                  style={{ background: "#111" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <GithubIcon className="w-6 h-6 text-white/50" />
                        <span className="text-xs tracking-[0.3em] text-white/30">GITHUB</span>
                      </div>
                      <h3 className="playfair text-2xl italic text-white/80 mb-1">Explore My Work</h3>
                      <p className="text-xs text-white/30">github.com/Raghdkun</p>
                    </div>
                    <ArrowIcon className="w-6 h-6 text-white/20 group-hover:text-white/60 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </a>

                <a
                  href="mailto:raghdkun@gmail.com"
                  className="reveal delay-2 group block border border-white/10 p-6 hover:border-white/40 transition-all duration-500"
                  style={{ background: "#111" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs tracking-[0.3em] text-white/30">EMAIL</span>
                      </div>
                      <h3 className="playfair text-xl italic text-white/70 mb-1">Send a Message</h3>
                      <p className="text-xs text-white/20">raghdkun@gmail.com</p>
                    </div>
                    <ArrowIcon className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </a>

                <div className="reveal delay-3 flex items-center gap-3 px-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs tracking-[0.2em] text-white/40">
                    AVAILABLE FOR FREELANCE &amp; FULL-TIME
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="border-t border-white/10 py-10" style={{ background: "#080808" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 border border-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold hero-title">RK</span>
                </div>
                <span className="text-xs tracking-[0.3em] text-white/30">RAGHDKUN</span>
              </div>
              <p className="text-xs text-white/20 text-center">
                &copy; 2026 — Crafted with cinematic precision
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/Raghdkun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider text-white/20 hover:text-white/60 transition-colors duration-300"
                >
                  GITHUB
                </a>
                <a
                  href="https://wa.me/message/+963958743823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wider text-white/20 hover:text-white/60 transition-colors duration-300"
                >
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
