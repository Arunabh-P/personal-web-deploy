import BannerTemplate from '@/components/template/home/banner-template';
import DevSkillTemplate from '@/components/template/home/dev-motivation-template';
import FooterTemplate from '@/components/template/home/footer';
import SkillTemplate from '@/components/template/home/skill-template';
import SummaryTemplate from '@/components/template/home/summary-template';
import TestimonialTemplate from '@/components/template/home/testimonial-template';
import { fetchSkills } from '@/service/api/skill';
import { fetchSoftwareSkills } from '@/service/api/software-skill';
import { fetchTestimonials } from '@/service/api/testimonial';

export default async function Home() {
  const { testimonials } = await fetchTestimonials();
  const { skills } = await fetchSkills();
  const { softwareSkills } = await fetchSoftwareSkills();

  return (
    <>
      <BannerTemplate />
      <SkillTemplate data={softwareSkills} />
      <SummaryTemplate />
      <DevSkillTemplate data={skills} />
      <TestimonialTemplate data={testimonials} />
      <FooterTemplate />
    </>
  );
}
