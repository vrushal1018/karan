/** Cute SVG illustration of an orange cat and a panda cuddling. */
export default function DuoIllustration() {
  return (
    <svg
      className="mx-auto mb-1.5 block w-[210px] max-w-[60%]"
      viewBox="0 0 220 130"
      role="img"
      aria-label="A cat and a panda cuddling"
    >
      <g>
        <polygon points="48,56 54,12 88,40" fill="#e8934a" />
        <polygon points="132,56 126,12 92,40" fill="#e8934a" />
        <polygon points="57,42 59,24 76,37" fill="#ffb3c7" />
        <polygon points="123,42 121,24 104,37" fill="#ffb3c7" />
        <ellipse cx="90" cy="82" rx="52" ry="44" fill="#f5a85c" />
        <path
          d="M90 40v12M78 42l3 10M102 42l-3 10"
          stroke="#d97e34"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="88" r="9" fill="#ff9fc0" opacity=".75" />
        <circle cx="120" cy="88" r="9" fill="#ff9fc0" opacity=".75" />
        <ellipse cx="72" cy="76" rx="5" ry="7" fill="#3a2a2e" />
        <ellipse cx="108" cy="76" rx="5" ry="7" fill="#3a2a2e" />
        <circle cx="73.5" cy="73" r="2" fill="#fff" />
        <circle cx="109.5" cy="73" r="2" fill="#fff" />
        <polygon points="85,86 95,86 90,92" fill="#ff7fa8" />
        <path
          d="M90 92v3M90 95q-5 5-10 1M90 95q5 5 10 1"
          stroke="#3a2a2e"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M52 90l-18-4M52 96l-18 4M128 90l18-4M128 96l18 4"
          stroke="#3a2a2e"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity=".7"
        />
      </g>
      <g>
        <circle cx="140" cy="30" r="15" fill="#3a2a2e" />
        <circle cx="196" cy="30" r="15" fill="#3a2a2e" />
        <ellipse cx="168" cy="76" rx="48" ry="42" fill="#fff" />
        <circle cx="144" cy="82" r="9" fill="#ff9fc0" opacity=".8" />
        <circle cx="192" cy="82" r="9" fill="#ff9fc0" opacity=".8" />
        <ellipse
          cx="152"
          cy="68"
          rx="9"
          ry="11"
          fill="#3a2a2e"
          transform="rotate(20 152 68)"
        />
        <ellipse
          cx="184"
          cy="68"
          rx="9"
          ry="11"
          fill="#3a2a2e"
          transform="rotate(-20 184 68)"
        />
        <circle cx="153" cy="66" r="2.5" fill="#fff" />
        <circle cx="183" cy="66" r="2.5" fill="#fff" />
        <ellipse cx="168" cy="82" rx="5" ry="3.5" fill="#3a2a2e" />
        <path
          d="M162 90q6 6 12 0"
          stroke="#3a2a2e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <text x="104" y="24" fontSize="18" textAnchor="middle">
        💗
      </text>
    </svg>
  );
}
