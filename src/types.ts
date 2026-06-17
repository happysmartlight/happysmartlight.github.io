export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  protocols: string[];
  badge?: string;
  glowColor: "pink" | "blue" | "dual" | "yellow";
}


export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: "pink" | "blue";
}

export interface ApplicationItem {
  id: string;
  title: string;
  description: string;
  tagline: string;
  themeColor: "pink" | "blue" | "emerald" | "amber" | "purple";
  gradientClass: string;
  metrics: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  project: string;
  avatarText: string;
  content: string;
}
