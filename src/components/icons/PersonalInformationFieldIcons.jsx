function createFieldIcon(children) {
  return function FieldIcon({ sx = {} }) {
    const size = sx.fontSize ?? 22;
    const color = sx.color ?? 'currentColor';

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        {children}
      </svg>
    );
  };
}

export const FullNameIcon = createFieldIcon(
  <>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>,
);

export const DateOfBirthIcon = createFieldIcon(
  <>
    <path d="M11 14h1v4" />
    <path d="M16 2v4" />
    <path d="M3 10h18" />
    <path d="M8 2v4" />
    <rect x="3" y="4" width="18" height="18" rx="2" />
  </>,
);

export const PhoneNumberIcon = createFieldIcon(
  <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
);

export const EmailAddressIcon = createFieldIcon(
  <>
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </>,
);

export const GenderIcon = createFieldIcon(
  <>
    <path d="M10 20h4" />
    <path d="M12 16v6" />
    <path d="M17 2h4v4" />
    <path d="m21 2-5.46 5.46" />
    <circle cx="12" cy="11" r="5" />
  </>,
);

export const BloodGroupIcon = createFieldIcon(
  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />,
);

export const LocationIcon = createFieldIcon(
  <>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </>,
);
