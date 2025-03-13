import { notFound } from "next/navigation"
import ServiceContent from "@/app/components/ServiceContent"

const services = {
  nextjs: {
    title: "Next.js Development",
    description: "We build modern, fast, and SEO-friendly web applications using Next.js, a powerful React framework.",
    features: ["Server-side rendering", "Static site generation", "API routes", "Optimized performance"],
  },
  laravel: {
    title: "Laravel Development",
    description:
      "Our Laravel development services provide robust and scalable web applications for your business needs.",
    features: ["MVC architecture", "Eloquent ORM", "Artisan CLI", "Built-in security features"],
  },
  wordpress: {
    title: "WordPress Solutions",
    description: "We create custom WordPress themes and plugins to power your content-driven websites.",
    features: ["Custom theme development", "Plugin development", "E-commerce integration", "Performance optimization"],
  },
  consulting: {
    title: "Business Consulting",
    description:
      "Our business consulting services help you navigate the digital landscape and grow your online presence.",
    features: ["Digital strategy", "Technology stack recommendations", "Process optimization", "Growth hacking"],
  },
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = services[params.id as keyof typeof services]

  if (!service) {
    notFound()
  }

  return <ServiceContent {...service} />
}

