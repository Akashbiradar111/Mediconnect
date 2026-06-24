export default function SuccessSealIcon() {
  const bumps = 12;
  const cx = 40;
  const cy = 40;
  const outerR = 34;
  const innerR = 28;
  const points = [];

  for (let i = 0; i < bumps * 2; i += 1) {
    const angle = (i * Math.PI) / bumps - Math.PI / 2;
    const radius = i % 2 === 0 ? outerR : innerR;
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }

  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={`M${points.join('L')}Z`} fill="#0E6655" />
      <path
        d="M27 40.5L35.5 49L53 31.5"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
