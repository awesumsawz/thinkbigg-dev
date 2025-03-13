import ServiceContent from "@/app/components/ServiceContent"

export default function WebServices() {
  return (
    <>
      <ServiceContent
        title="Custom Websites Built for Your Business"
        description="Need a website that actually works for you? I build modern, fast, and easy-to-manage websites using Laravel, Next.js, and WordPress—tailored to fit your business, not the other way around. Whether you need a sleek marketing site, a powerful e-commerce platform, or a fully custom web app, I've got you covered."
        features={[
          "Custom-built sites using Laravel’s MVC architecture for robust, scalable web applications",
          "Fast & SEO-friendly websites with Next.js, leveraging server-side rendering and static generation",
          "WordPress expertise for easy-to-manage sites, including custom themes and plugins",
          "E-commerce solutions that don’t just look good, but convert visitors into customers",
          "Performance & security optimizations to keep your site running smoothly",
        ]}
        postFeatures={[
          "No cookie-cutter templates. No bloated code. Just clean, efficient, and effective web development to help your business grow."
        ]}
      />
    </>
  )
}