import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IMAGES } from "../data";

const MEMBER_COLORS = {
  RANDEL: "#e8612d",
  GRAZIELLE: "#2de89a",
  "RENZ MARTIN": "#e82d3b",
  "ELIJAH BOON": "#2d6ae8",
  TRISHIA: "#a32de8",
};

const MEMBER_ANIMATIONS = {
  RANDEL: "animate-aura-randel",
  GRAZIELLE: "animate-aura-grazielle",
  "RENZ MARTIN": "animate-aura-renz",
  "ELIJAH BOON": "animate-aura-elijah",
  TRISHIA: "animate-aura-trishia",
};

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateVH = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateVH();
    window.addEventListener("resize", updateVH, { passive: true });
    return () => window.removeEventListener("resize", updateVH);
  }, []);

  const navigate = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % 5;
      } else {
        return (prev + 4) % 5;
      }
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAnimating) {
        navigate("next");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex, isAnimating]);

  const getRole = (index) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 4) % 5) return "left";
    if (index === (activeIndex + 1) % 5) return "right";
    return "back";
  };

  const getRoleStyles = (role) => {
    const transitionScaleFactor = isAnimating ? 0.92 : 1;

    switch (role) {
      case "center":
        return {
          transform: `translateX(-50%) scale(${(isMobile ? 0.95 : 1.25) * transitionScaleFactor})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "46%" : "72%",
          bottom: isMobile ? "26%" : "3%",
        };
      case "left":
        return {
          transform: `translateX(-50%) scale(${0.8 * transitionScaleFactor})`,
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "18%" : "30%",
          height: isMobile ? "11%" : "20%",
          bottom: isMobile ? "34%" : "14%",
        };
      case "right":
        return {
          transform: `translateX(-50%) scale(${0.8 * transitionScaleFactor})`,
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "82%" : "70%",
          height: isMobile ? "11%" : "20%",
          bottom: isMobile ? "34%" : "14%",
        };
      case "back":
        return {
          transform: `translateX(-50%) scale(${0.8 * transitionScaleFactor})`,
          filter: "blur(4px)",
          opacity: 0.5,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "8%" : "15%",
          bottom: isMobile ? "34%" : "14%",
        };
    }
  };

  const currentNickName = IMAGES[activeIndex].nickName;
  const currentFullName =
    IMAGES[activeIndex].fullName || IMAGES[activeIndex].nickName; ;
  const currentRole = IMAGES[activeIndex].role;
  const currentStatement = IMAGES[activeIndex].statement;
  const activeColor = MEMBER_COLORS[currentNickName] || "#e8a120";

  return (
    <section
      id="team"
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "#0a0a0a",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full [overflow-x:clip] select-none py-12 lg:py-24"
    >
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.4; }
        }
        @keyframes float-mid {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-50px) translateX(-20px); opacity: 0.5; }
        }
        .animate-scanline { animation: scanline 8s linear infinite; }
        .animate-float-1 { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-2 { animation: float-mid 8s ease-in-out infinite 2s; }
        .animate-float-3 { animation: float-slow 16s ease-in-out infinite 4s; }

        @keyframes context-glitch {
          0% { opacity: 0.3; filter: hue-rotate(0deg) contrast(1.2); }
          15% { opacity: 0.7; filter: hue-rotate(45deg) saturate(1.5); }
          30% { opacity: 0.4; filter: hue-rotate(-30deg); }
          45% { opacity: 0.8; }
          100% { opacity: 0.6; filter: hue-rotate(0deg) contrast(1); }
        }
        .animate-switch-glitch {
          animation: context-glitch 550ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes aura-randel {
          0%, 100% { transform: translate(-50%, -40%) scale(1); opacity: 0.5; filter: blur(90px); }
          50% { transform: translate(-50%, -43%) scale(1.25); opacity: 0.75; filter: blur(75px); }
        }
        .animate-aura-randel { animation: aura-randel 3.5s ease-in-out infinite; }

        @keyframes aura-grazielle {
          0%, 100% { transform: translate(-50%, -40%) scale(1); opacity: 0.4; }
          33% { transform: translate(-52%, -39%) scale(1.1); opacity: 0.6; }
          66% { transform: translate(-48%, -41%) scale(1.05); opacity: 0.5; }
        }
        .animate-aura-grazielle { animation: aura-grazielle 5s ease-in-out infinite; }

        @keyframes aura-renz {
          0%, 100%, 70% { transform: translate(-50%, -40%) scale(1); opacity: 0.4; }
          75% { transform: translate(-50%, -40%) scale(1.2); opacity: 0.8; }
          80% { transform: translate(-50%, -40%) scale(1.05); opacity: 0.5; }
          85% { transform: translate(-50%, -40%) scale(1.25); opacity: 0.85; }
        }
        .animate-aura-renz { animation: aura-renz 2.5s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

        @keyframes aura-elijah {
          0%, 100% { transform: translate(-65%, -40%) scale(1.1) skewX(-5deg); opacity: 0.45; }
          50% { transform: translate(-35%, -40%) scale(1) skewX(5deg); opacity: 0.65; }
        }
        .animate-aura-elijah { animation: aura-elijah 6s ease-in-out infinite; }

        @keyframes aura-trishia {
          0% { transform: translate(-50%, -40%) scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: translate(-50%, -40%) scale(1.2) rotate(180deg); opacity: 0.7; }
          100% { transform: translate(-50%, -40%) scale(1) rotate(360deg); opacity: 0.5; }
        }
        .animate-aura-trishia { animation: aura-trishia 8s linear infinite; }
      `}</style>

      <div className="absolute top-8 left-4 sm:top-16 sm:left-16 z-50 pointer-events-none">
        <p className="font-mono-code text-[#e8a120] text-xs sm:text-sm tracking-widest uppercase mb-2">
          THE TEAM
        </p>
        <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide uppercase">
          Meet The Collective
        </h2>
      </div>

      <div
        className="relative w-full [overflow:clip]"
        style={{
          height: isMobile ? "80svh" : "100vh",
          minHeight: isMobile ? "480px" : "600px",
          maxHeight: isMobile ? "680px" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
            pointerEvents: "none",
            transform: isAnimating
              ? "scale(1.05) rotate(0.5deg)"
              : "scale(1) rotate(0deg)",
            transition: isAnimating
              ? "none"
              : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <div
          className="animate-scanline"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "30%",
            zIndex: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.015), transparent)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.05,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            zIndex: 50,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div
          key={`backlight-${activeIndex}`}
          className={isAnimating ? "animate-switch-glitch" : ""}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: `radial-gradient(circle at 50% 50%, ${activeColor}22 0%, transparent 65%)`,
            transition: isAnimating ? "none" : "background 650ms ease-out",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2 }}
        >
          {IMAGES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <h1
                key={idx}
                style={{
                  fontFamily: "'Anton', sans-serif",
                  transform: isMobile
                    ? `translateY(-15px) scale(${isAnimating && isActive ? 1.1 : 1})`
                    : `translateY(-80px) scale(${isAnimating && isActive ? 1.08 : 1})`,
                  opacity: isActive ? (isAnimating ? 0.08 : 0.04) : 0,
                  transition: isAnimating
                    ? "opacity 150ms ease-out, transform 150ms ease-out"
                    : "opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), transform 650ms cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "absolute",
                  fontSize: "24vw",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "-0.04em",
                  whiteSpace: "nowrap",
                  color: "#ffffff",
                }}
              >
                {item.nickName}
              </h1>
            );
          })}
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);
            const roleStyles = getRoleStyles(role);
            const memberColor = MEMBER_COLORS[item.nickName] || "#e8a120";
            const auraGlowRadius = role === "center" ? "100px" : "40px";

            const explicitAnimationClass =
              MEMBER_ANIMATIONS[item.nickName] || "animate-aura-randel";

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  aspectRatio: "0.6 / 1",
                  marginBottom: "50px",
                  transition: isAnimating
                    ? "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), filter 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, left 650ms cubic-bezier(0.16, 1, 0.3, 1), bottom 650ms cubic-bezier(0.16, 1, 0.3, 1), height 650ms cubic-bezier(0.16, 1, 0.3, 1)"
                    : "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "transform, filter, opacity, left",
                  ...roleStyles,
                }}
              >
                <div
                  className={role === "center" ? explicitAnimationClass : ""}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "70%",
                    height: "70%",
                    transform: "translate(-50%, -40%)",
                    background: `radial-gradient(circle, ${memberColor}60 0%, ${memberColor}20 40%, transparent 70%)`,
                    filter: `blur(${auraGlowRadius})`,
                    zIndex: -1,
                    pointerEvents: "none",
                    opacity: role === "back" ? 0.2 : 0.8,
                    transition: "all 650ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                <img
                  src={item.src}
                  alt={`Frey team member ${item.nickName}`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none relative z-10"
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            zIndex: 50,
            borderLeft: `3px solid ${activeColor}`,
            transition: "border-color 400ms ease",
          }}
          className="absolute left-4 right-4 sm:left-16 sm:right-auto sm:max-w-[480px] pl-4 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] sm:bottom-16"
        >
          <h2
            className="text-white font-bold tracking-wider uppercase mb-1 sm:whitespace-nowrap"
            style={{
              fontSize: isMobile ? "16px" : "22px",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            {currentFullName}
          </h2>

          <span
            style={{
              color: "rgba(232,161,32,0.8)",
              fontSize: "11px",
              marginBottom: isMobile ? "12px" : "20px",
              letterSpacing: "0.25em",
            }}
            className="uppercase font-semibold block font-mono-code"
          >
            {currentRole}
          </span>

          <p
            className="hidden sm:block text-[15px] leading-relaxed mb-8 text-left"
            style={{ color: "#9CA3AF" }}
          >
            "{currentStatement}"
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("prev")}
              disabled={isAnimating}
              aria-label="Previous team member"
              style={{
                width: isMobile ? "40px" : "52px",
                height: isMobile ? "40px" : "52px",
                border: "1px solid rgba(232,161,32,0.4)",
                color: "#e8b84b",
                borderRadius: "50%",
                transition: "all 150ms ease",
              }}
              className="flex items-center justify-center cursor-pointer select-none active:scale-95 hover:bg-[#e8a120] hover:text-[#0a0a0a] hover:border-[#e8a120] disabled:opacity-40 flex-shrink-0"
            >
              <ArrowLeft size={isMobile ? 15 : 20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => navigate("next")}
              disabled={isAnimating}
              aria-label="Next team member"
              style={{
                width: isMobile ? "40px" : "52px",
                height: isMobile ? "40px" : "52px",
                border: "1px solid rgba(232,161,32,0.4)",
                color: "#e8b84b",
                borderRadius: "50%",
                transition: "all 150ms ease",
              }}
              className="flex items-center justify-center cursor-pointer select-none active:scale-95 hover:bg-[#e8a120] hover:text-[#0a0a0a] hover:border-[#e8a120] disabled:opacity-40 flex-shrink-0"
            >
              <ArrowRight size={isMobile ? 15 : 20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
