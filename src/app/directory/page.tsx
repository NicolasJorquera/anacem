'use client';
import { directory } from '../data';

export default function DirectoryPage() {
  return (
    <main className="w-full flex flex-col items-center px-4 md:px-20 py-12">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Directorio <span className="text-lg font-normal block">2024 - 2025</span>
      </h1>

      {/* Grid de miembros */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {directory.map((member, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-background)] border border-[var(--color-foreground)]/10 rounded-4xl shadow-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl"
          >
            {/* Foto placeholder circular */}
            <div className="w-28 h-28 rounded-full bg-[var(--color-foreground)]/10 flex items-center justify-center text-xl font-bold mb-4">
              {member.name
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>

            {/* Nombre */}
            <h2 className="text-xl font-semibold">{member.name}</h2>
            {/* Cargo */}
            <p className="text-[var(--color-foreground)]/70 font-medium uppercase text-sm mt-1">
              {member.role}
            </p>
            {/* Universidad */}
            <p className="text-sm text-[var(--color-foreground)]/60 mt-2">
              {member.university}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
