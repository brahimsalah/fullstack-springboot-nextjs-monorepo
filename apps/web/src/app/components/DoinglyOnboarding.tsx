"use client";

// Un écran de lancement sobre inspiré par les "Branded Launch Screens" de Material Design.
// Affiche le logo et le nom de la marque au centre d'une page blanche.

type Props = {
  brand?: string;
};

export default function DoinglyOnboarding({ brand = "Doingly" }: Props) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <LogoMark />
        <span className="text-xl font-semibold tracking-tight text-primary">
          {brand}
        </span>
      </div>
    </div>
  );
}

function LogoMark() {
  // Le logo est dimensionné pour avoir un impact visuel clair.
  return (
    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 12l3 3 9-9"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
