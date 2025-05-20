import { AnimatedTestimonials } from "./ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Worthy AI transformed my career trajectory. The salary insights helped me negotiate a 35% raise, and the market data gave me the confidence to make informed decisions.",
      name: "Sarah Chen",
      designation: "Senior Software Engineer at TechFlow",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "As a hiring manager, Worthy AI has revolutionized our compensation strategy. The real-time market data helps us stay competitive and attract top talent.",
      name: "Michael Rodriguez",
      designation: "VP of Engineering at InnovateSphere",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The platform's AI-driven insights helped me understand my true market value. I was able to secure a position that perfectly matched my skills and experience.",
      name: "Emily Watson",
      designation: "Product Director at CloudScale",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Worthy AI's data-driven approach to salary negotiations is game-changing. I was able to confidently discuss compensation with concrete market insights.",
      name: "James Kim",
      designation: "Tech Lead at DataPro",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The platform's comprehensive market analysis helped us build a competitive compensation structure. It's become an essential tool for our talent acquisition strategy.",
      name: "Lisa Thompson",
      designation: "Chief People Officer at FutureNet",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
} 