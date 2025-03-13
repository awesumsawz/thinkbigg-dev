import ServiceContent from "@/app/components/ServiceContent"

export default function CloudServices() {
  return (
    <ServiceContent
      title="Cloud Solutions That Scale as You Grow"
      description="Whether you need to migrate to the cloud, streamline your deployments, or optimize your infrastructure costs, I help businesses harness the power of AWS, GitHub, and modern cloud technologies to keep things running smoothly—without the headaches."
      features={[
        "AWS architecture & deployment - From EC2 and S3 to Lambda and RDS, I design and implement scalable, cost-effective cloud solutions.",
        "CI/CD & DevOps workflows - Automate deployments, speed up development, and keep things running smoothly with GitHub Actions, Docker, and Kubernetes.",
        "Cloud cost optimization - Avoid unnecessary expenses with smart infrastructure management and scaling strategies.",
        "Security-first approach - Best practices for cloud security, including IAM, encryption, and compliance.",
        "Serverless & containerized apps - Build and deploy highly efficient applications with serverless functions and container orchestration.",
      ]}
      postFeatures={[
        "No overcomplicated setups. No mystery pricing. Just practical cloud solutions that help your business grow."
      ]}
    />
  )
}

