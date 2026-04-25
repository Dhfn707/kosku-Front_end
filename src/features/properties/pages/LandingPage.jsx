import { Hero } from '@/shared/components/Hero';
import { FeatureSection } from '@/features/properties/components/FeatureSection';
import { HighlightSlider } from '@/features/properties/components/HighlightSlider';
import { FeaturedKos } from '@/features/properties/components/FeaturedKos';

export const LandingPage = () => (
  <>
    <Hero />
    <FeatureSection />
    <HighlightSlider />
    <FeaturedKos />
  </>
);
