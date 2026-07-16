import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  schema?: Record<string, any> | Record<string, any>[];
  image?: string;
}

const defaultTitle = "Medcytech | Health Tech Infrastructure";
const defaultDescription = "Empowering healthcare with intelligent Digital Front Office, state-of-the-art DLabs-LIMS, and comprehensive HIMS.";
const defaultUrl = "https://medcytech.com"; // Replace with actual URL later
const defaultImage = "/core_digital_network.png";

const defaultOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Medcytech",
  "url": "https://medcytech.com",
  "logo": "https://medcytech.com/lotus_icon_transparent.png",
  "description": "Health Tech Infrastructure providing Digital Front Office, DLabs-LIMS, and HIMS.",
  "founders": [
    {
      "@type": "Person",
      "name": "Dr. B. Sireesha Rani"
    },
    {
      "@type": "Person",
      "name": "Bhanu Prasad"
    }
  ]
};

export default function SEO({ title, description, url, schema, image }: SEOProps) {
  const seoTitle = title ? `${title} | Medcytech` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoUrl = url || defaultUrl;
  const seoImage = image || defaultImage;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seoImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      <link rel="canonical" href={seoUrl} />

      <script type="application/ld+json">
        {JSON.stringify(defaultOrganizationSchema)}
      </script>

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
