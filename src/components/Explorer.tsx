import { useMemo, useState } from "react";
import { destinations } from "@/lib/destinations";
import { interests, studyLevels } from "@/lib/site";
import { DestinationCard } from "./DestinationCard";

const sel =
  "rounded-full border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function Explorer() {
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [interest, setInterest] = useState("");
  const list = useMemo(
    () =>
      destinations.filter(
        (d) =>
          (!country || d.slug === country) &&
          (!level || level === "Not sure yet" || d.levels.includes(level)) &&
          (!interest || interest === "Not sure yet" || d.interests.includes(interest)),
      ),
    [country, level, interest],
  );
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <select
          aria-label="Country"
          className={sel}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">All countries</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Study level"
          className={sel}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">Any study level</option>
          {studyLevels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select
          aria-label="Area of interest"
          className={sel}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        >
          <option value="">Any area of interest</option>
          {interests.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        {(country || level || interest) && (
          <button
            className="text-sm font-medium text-accent underline"
            onClick={() => {
              setCountry("");
              setLevel("");
              setInterest("");
            }}
          >
            Reset
          </button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Indicative areas only — available programmes vary by institution and intake. Speak with us
        to confirm current options.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((d, i) => (
          <DestinationCard
            key={d.slug}
            d={d}
            className="animate-rise"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-8 text-muted-foreground">
          No matches for this combination yet — contact us and we'll explore options with you.
        </p>
      )}
    </div>
  );
}
