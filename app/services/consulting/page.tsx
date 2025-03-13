import ServiceContent from "@/app/components/ServiceContent"

export default function ConsultingService() {
  return (
    <ServiceContent
      title="Smart Strategies for Digital Growth"
      description="Running a business in today's digital world can be overwhelming. I help small businesses cut through the noise with practical strategies to grow their online presence, streamline operations, and make smarter tech choices—without the corporate jargon."
      features={[
        "Digital strategy that works - Build a clear, actionable plan to attract and retain customers online.",
        "Tech stack recommendations - Choose the right tools and platforms to keep your business running smoothly (without overcomplicating things).",
        "Workflow & process optimization - Automate tasks, improve efficiency, and get more done with less effort.",
        "Growth hacking & marketing - Find creative ways to boost traffic, increase conversions, and grow your audience.",
        "Project management & execution - Whether it's launching a new website, migrating to the cloud, or refining internal processes, I keep projects moving forward, on time, and within budget.",
      ]}
      postFeatures={[
        "No fluff. No generic advice. Just real, actionable insights—and the hands-on support you need to get things done."
      ]}
    />
  )
}

