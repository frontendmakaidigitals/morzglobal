import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
const onshoreServices = [
  "Detail Engineering (EPC Stage)",
  "Brownfield Modifications",
  "Process & Process Safety Engineering",
  "Mechanical (Static & Rotary) Engineering",
  "Piping and Pipeline Engineering",
  "Electrical Engineering",
  "Instrumentation Engineering",
  "Civil/Structural Engineering",
  "Substation Design",
  "Project Management & Project Planning",
  "Cost Estimation & Budgeting",
  "3D Modelling",
  "As-built Drawings",
];
const offshoreServices = [
  "Detail Engineering (EPC Stage)",
  "Brownfield Modifications",
  "Structural Studies",
  "Topside and Jacket Design",
  "Lifting and Load Out Plan",
  "Sea Fastening Designs",
  "Process & Process Safety Engineering",
  "Mechanical (Static & Rotary) Engineering",
  "Piping Engineering",
  "Electrical Engineering",
  "Instrumentation Engineering",
  "Civil/Structural Engineering",
  "Project Management & Project Planning",
  "Cost Estimation & Budgeting",
  "3D Modelling",
  "As-built Drawings",
];
const TextMarquee = () => {
  const onshoreText = onshoreServices.join(" • ");
  const offshoreText = offshoreServices.join(" • ");

  return (
    <section className="">
      <ScrollVelocityContainer className="text-3xl font-poppins text-gray-50 bg-secondary leading-[7rem] font-bold md:text-4xl overflow-hidden">
        <ScrollVelocityRow baseVelocity={0.7} direction={1}>
          {onshoreText}
        </ScrollVelocityRow>

        <ScrollVelocityRow
          className="bg-primary "
          baseVelocity={-0.7}
          direction={1}
        >
          {offshoreText}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
};

export default TextMarquee;
