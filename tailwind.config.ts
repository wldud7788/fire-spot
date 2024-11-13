import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"]
      },
      boxShadow: {
        custom:
          "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        buttonShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
      },
      lineHeight: {
        "40": "40px"
      },
      screens: {
        "max-n": { max: "1460px" },
        "max-t": { max: "1260px" },
        "max-m": { max: "600px" },
        "max-sm": { max: "400px" }
      },
      backgroundImage: {
        search: "url('/assets/images/search.png')",
        profile: "url('/assets/images/profile.png')",
        map: "url('/assets/images/map.png')",
        sos: "url('/assets/images/sos.png')",
        chat: "url('/assets/images/chat.png')",
        date: "url('/assets/images/ico-date.svg')",
        dateStroke: "url('/assets/images/ico-date-stroke.svg')",
        group: "url('/assets/images/ico-group.svg')",
        heart: "url('/assets/images/ico-heart.svg')",
        location: "url('/assets/images/ico-location.svg')",
        avatar: "url('/assets/images/ico-avatar.svg')",
        scrap: "url('/assets/images/ico-scrap.svg')",
        info: "url('/assets/images/ico-info.svg')",
        infoRound: "url('/assets/images/ico-info-round.svg')",
        plus: "url('/assets/images/ico-plus.svg')",
        minus: "url('/assets/images/ico-minus.svg')",
        prev: "url('/assets/images/ico-prev.svg')",
        next: "url('/assets/images/ico-next.svg')",
        // 공통
        logo: "url('/assets/images/logo.svg')",
        polygon: "url('/assets/images/common/ico-polygon.svg')",
        import: "url('/assets/images/common/ico-import.svg')",
        plusColor: "url('/assets/images/common/ico-plus-c.svg')",
        pin: "url('/assets/images/common/ico-pin.svg')",
        // 체크박스
        chk: "url('/assets/images/common/ico-checkbox.svg')",
        chkOn: "url('/assets/images/common/ico-checkbox-on.svg')",
        // 캠핑 상세
        reviewArrow: "url('/assets/images/camp/ico-review-arrow.svg')",
        direction: "url('/assets/images/camp/ico-direction.svg')",
        campChk: "url('/assets/images/camp/ico-camp-chk.svg')",
        campTit01: "url('/assets/images/camp/ico-camp-tit01.svg')",
        campTit02: "url('/assets/images/camp/ico-camp-tit02.svg')",
        campTit03: "url('/assets/images/camp/ico-camp-tit03.svg')",
        campTit04: "url('/assets/images/camp/ico-camp-tit04.svg')",
        campTit05: "url('/assets/images/camp/ico-camp-tit05.svg')",
        campTit06: "url('/assets/images/camp/ico-camp-tit06.svg')",
        campTit07: "url('/assets/images/camp/ico-camp-tit07.svg')",
        // 모임
        meetAvatar: "url('/assets/images/meet/ico-meet-avatar.svg')",
        meetCalendar: "url('/assets/images/meet/ico-meet-calendar.svg')",
        meetLocation: "url('/assets/images/meet/ico-meet-location.svg')",
        meetCategory: "url('/assets/images/meet/ico-meet-category.svg')",
        meetImport: "url('/assets/images/meet/ico-import.svg')",
        // 가이드
        guideBulb: "url('/assets/images/guide/ico-guide-bulb.svg')",
        guideTip: "url('/assets/images/guide/bg-guide-tip.png')"
      },
      backgroundPosition: {
        "left-center": "left 10px center",
        "left-center-0": "left center",
        "right-center-0": "right center"
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};
export default config;
