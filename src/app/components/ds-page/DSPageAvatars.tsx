/**
 * Section 08 — Team Avatars.
 * Showcase del sistema avatar Funko-pop: registry, crop, token shape, team tagging.
 * Verifica visuale di tutti i 27 avatar registrati + metadata.
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 */

import { DS } from "../design-system";
import { SectionHeader, Panel, SubLabel } from "./helpers";
import { TEAM_AVATAR_REGISTRY, getAvatarEntry } from "../nigiri/avatars";
import { DEFAULT_TEAM_MEMBERS, TEAM_GROUPS } from "../nigiri/constants";
import type { TeamMember } from "../nigiri/types";

/* ── Avatar card (reusable within this page) ─────────────────────── */
function AvatarCard({ member, dark, size = 64 }: { member: TeamMember; dark: boolean; size?: number }) {
  const entry = getAvatarEntry(member.id);
  const avatarImg = entry?.img || member.avatar;
  const avatarGradient = entry?.gradient || member.gradient;
  const crop = entry?.crop;

  const txtP = dark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY;
  const txtS = dark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY;
  const txtT = dark ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY;
  const border = dark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300;
  const bg = dark ? DS.BG_SURFACE : DS.ON_LIGHT_GRAY_100;

  const teamLabel = member.team ? TEAM_GROUPS[member.team] : "Direzione";

  return (
    <div
      className="flex flex-col items-center gap-2 p-3"
      style={{
        backgroundColor: bg,
        border: `${DS.BORDER_WIDTH_THIN} solid ${border}`,
        minWidth: 96,
      }}
    >
      {/* Avatar container — uses RADIUS_AVATAR (square + slight rounding) */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: DS.RADIUS_AVATAR,
          backgroundColor: member.color,
          backgroundImage: avatarGradient || undefined,
        }}
      >
        {avatarImg ? (
          <img
            src={avatarImg}
            alt={member.name}
            className="max-w-none"
            style={{
              position: "absolute",
              left: crop?.left ?? "0%",
              top: crop?.top ?? "0%",
              width: crop?.width ?? "100%",
              height: crop?.height ?? "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        ) : (
          <div
            className="flex items-center justify-center font-mono font-black w-full h-full"
            style={{
              fontSize: size * 0.35,
              color: dark ? DS.BG_DEEP : DS.ON_LIGHT_BG,
            }}
          >
            {member.initials}
          </div>
        )}
      </div>

      {/* Name + metadata */}
      <div className="text-center">
        <p
          className="font-mono font-black uppercase"
          style={{ fontSize: DS.FONT_SMALL, color: txtP, letterSpacing: DS.LS_TIGHT }}
        >
          {member.name}
        </p>
        <p
          className="font-mono"
          style={{ fontSize: DS.FONT_MICRO, color: txtT }}
        >
          {member.id}
        </p>
        {member.isLead && (
          <span
            className="inline-block px-1.5 py-0.5 font-mono font-black uppercase mt-1"
            style={{
              fontSize: DS.FONT_NANO,
              backgroundColor: DS.ACCENT,
              color: DS.TEXT_INVERSE,
              letterSpacing: DS.LS_WIDE,
            }}
          >
            R
          </span>
        )}
        {member.role && (
          <p
            className="font-mono"
            style={{ fontSize: DS.FONT_NANO, color: txtS, letterSpacing: DS.LS_NORMAL }}
          >
            {member.role}
          </p>
        )}
      </div>

      {/* Color swatch */}
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-3 h-3 flex-shrink-0"
          style={{ backgroundColor: member.color, borderRadius: DS.RADIUS_AVATAR }}
        />
        <span className="font-mono" style={{ fontSize: DS.FONT_NANO, color: txtT }}>
          {member.color}
        </span>
      </div>

      {/* Team tag */}
      <span
        className="font-mono font-bold uppercase"
        style={{ fontSize: DS.FONT_NANO, color: txtT, letterSpacing: DS.LS_WIDE }}
      >
        {teamLabel}
      </span>
    </div>
  );
}

/* ── Size comparison row ──────────────────────────────────────────── */
function AvatarSizeRow({ member, dark }: { member: TeamMember; dark: boolean }) {
  const sizes = [20, 24, 28, 32, 48, 64];
  const entry = getAvatarEntry(member.id);
  const avatarImg = entry?.img || member.avatar;
  const avatarGradient = entry?.gradient || member.gradient;
  const crop = entry?.crop;
  const txtT = dark ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY;

  return (
    <div className="flex items-end gap-4 flex-wrap">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <div
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              width: s,
              height: s,
              borderRadius: DS.RADIUS_AVATAR,
              backgroundColor: member.color,
              backgroundImage: avatarGradient || undefined,
            }}
          >
            {avatarImg ? (
              <img
                src={avatarImg}
                alt={member.name}
                className="max-w-none"
                style={{
                  position: "absolute",
                  left: crop?.left ?? "0%",
                  top: crop?.top ?? "0%",
                  width: crop?.width ?? "100%",
                  height: crop?.height ?? "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
            ) : (
              <div
                className="flex items-center justify-center font-mono font-black w-full h-full"
                style={{ fontSize: s * 0.35, color: dark ? DS.BG_DEEP : DS.ON_LIGHT_BG }}
              >
                {member.initials}
              </div>
            )}
          </div>
          <span className="font-mono" style={{ fontSize: DS.FONT_NANO, color: txtT }}>
            {s}px
          </span>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* DSPageAvatars                                                       */
/* ================================================================== */

export function DSPageAvatars({ dark }: { dark: boolean }) {
  const registryCount = Object.keys(TEAM_AVATAR_REGISTRY).length;
  const teamCount = DEFAULT_TEAM_MEMBERS.length;
  const groups = Object.entries(TEAM_GROUPS);

  const txtT = dark ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY;

  return (
    <section>
      <SectionHeader
        num="09.2"
        category="Assets & Branding"
        title="Team Avatars"
        desc={`${registryCount} avatar Funko-pop registrati, ${teamCount} membri attivi in ${groups.length} team. Raggruppati per sotto-team Digital Media.`}
        narrative="Ogni membro del team ha un avatar illustrato con gradient, crop e colore primario. La shape usa RADIUS_AVATAR (square con rounding minimo). La disambiguazione omonimi avviene per team: owner da Progettazione e Grafica, referenti da Gestione Editoriale."
        dark={dark}
      />

      {/* ── By Team (feat-127: unica vista — rimosso Registry Completo duplicato) ── */}
      <Panel dark={dark}>
        <SubLabel dark={dark}>Per Team — {teamCount} membri in {groups.length + 1} gruppi</SubLabel>
        <div className="space-y-6">
          {/* Direzione */}
          <div>
            <p
              className="font-mono font-black uppercase mb-2"
              style={{ fontSize: DS.FONT_SMALL, color: DS.ACCENT, letterSpacing: DS.LS_WIDE }}
            >
              Direzione
            </p>
            <div className="flex gap-3 flex-wrap">
              {DEFAULT_TEAM_MEMBERS.filter((m) => !m.team && m.isLead).map((m) => (
                <AvatarCard key={m.id} member={m} dark={dark} size={48} />
              ))}
            </div>
          </div>

          {groups.map(([key, label]) => {
            const members = DEFAULT_TEAM_MEMBERS.filter((m) => m.team === key);
            const lead = members.find((m) => m.isLead);
            const others = members.filter((m) => !m.isLead);
            return (
              <div key={key}>
                <p
                  className="font-mono font-black uppercase mb-2"
                  style={{ fontSize: DS.FONT_SMALL, color: DS.ACCENT, letterSpacing: DS.LS_WIDE }}
                >
                  {label} ({members.length})
                </p>
                <div className="flex gap-3 flex-wrap">
                  {lead && <AvatarCard member={lead} dark={dark} size={48} />}
                  {others.map((m) => (
                    <AvatarCard key={m.id} member={m} dark={dark} size={48} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ── Size specimen ─────────────────────────────────────── */}
      <div className="mt-6">
        <Panel dark={dark}>
          <SubLabel dark={dark}>Scale — RADIUS_AVATAR ({DS.RADIUS_AVATAR})</SubLabel>
          <div className="space-y-4">
            {/* Show 3 representative members across different teams */}
            {[DEFAULT_TEAM_MEMBERS[0], DEFAULT_TEAM_MEMBERS[1], DEFAULT_TEAM_MEMBERS[11]].filter(Boolean).map((m) => (
              <div key={m.id}>
                <p className="font-mono font-bold mb-2" style={{ fontSize: DS.FONT_SMALL, color: txtT }}>
                  {m.name} ({m.id})
                </p>
                <AvatarSizeRow member={m} dark={dark} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Token reference ───────────────────────────────────── */}
      <div className="mt-6">
        <Panel dark={dark}>
          <SubLabel dark={dark}>Token Reference</SubLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["RADIUS_AVATAR", DS.RADIUS_AVATAR, "Shape container avatar (square + rounding)"],
              ["RADIUS_CIRCLE", DS.RADIUS_CIRCLE, "Legacy circular shape (deprecated per avatar)"],
              ["AVATAR_PALETTE", `[${DS.AVATAR_PALETTE.length} colori]`, "Fallback palette per membri senza avatar custom"],
              ["TEAM_GROUPS", `${groups.length} gruppi`, "Sotto-team Digital Media (domain data, nigiri/constants)"],
            ].map(([token, value, desc]) => (
              <div
                key={token}
                className="flex items-start gap-3 p-3"
                style={{
                  backgroundColor: dark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${dark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                }}
              >
                <span className="font-mono font-black" style={{ fontSize: DS.FONT_SMALL, color: dark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY }}>
                  {token}
                </span>
                <div className="flex flex-col">
                  <span className="font-mono font-bold" style={{ fontSize: DS.FONT_SMALL, color: dark ? DS.INTERACTIVE : DS.ON_LIGHT_INTERACTIVE }}>
                    {value}
                  </span>
                  <span className="font-mono" style={{ fontSize: DS.FONT_MICRO, color: txtT }}>
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}