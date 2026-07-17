import LogoLoop from './LogoLoopp';
import { SiReact, SiMysql, SiLaravel, SiTailwindcss, SiHtml5,SiJavascript, SiLaragon, SiPhp, SiVite, SiGithub, SiGit} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiLaragon />, title: "Laragon", href: "https://laragon.org" },
  { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
];



export default function Loop() {
  return (
    <div style={{width: '100%', height: '100px', position: 'relative', overflow: 'hidden',}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={50}
        direction="left"
        logoHeight={50}
        gap={60}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#050505"
        ariaLabel="Technology partners"
      />
  
    </div>
  );
}
 