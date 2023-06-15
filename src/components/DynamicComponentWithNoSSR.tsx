// ParentComponent.js (or any other file where DynamicComponent is used)

import dynamic from 'next/dynamic';

// This line dynamically imports DynamicComponent with SSR disabled
const DynamicComponentWithNoSSR = dynamic(
  () => import('./DynamicInterfaceComponent'),
  { ssr: false }
);

// function ParentComponent() {
//   return (
//     <div>
//       {/* Use DynamicComponentWithNoSSR instead of DynamicComponent */}
//       <DynamicComponentWithNoSSR url={someUrl} data={someData} />
//     </div>
//   );
// }

export default DynamicComponentWithNoSSR;
