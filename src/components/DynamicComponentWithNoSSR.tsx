import dynamic from 'next/dynamic';

// This line dynamically imports DynamicComponent with SSR disabled
const DynamicComponentWithNoSSR = dynamic(
  () => import('./DynamicInterfaceComponent'),
  { ssr: false }
);

export default DynamicComponentWithNoSSR;
