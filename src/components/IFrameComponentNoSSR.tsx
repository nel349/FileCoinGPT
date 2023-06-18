import dynamic from 'next/dynamic';

// This line dynamically imports DynamicComponent with SSR disabled
const IFrameComponentNoSSR = dynamic(
  () => import('./IFrameComponent'),
  { ssr: false }
);

export default IFrameComponentNoSSR;
