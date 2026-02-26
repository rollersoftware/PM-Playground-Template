import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DesignSystem } from '../prototypeRegistry';
import { prototypes } from '../prototypeRegistry';
import { Card, CardBody } from '../ui/Card';
import { Input } from '../ui/Input';
import { H1, Body, Muted } from '../ui/Typography';
import './PrototypeDirectory.css';

/**
 * Homepage: lists all prototypes with search. Card grid links to /p/:slug.
 */
function searchFilter(
  query: string,
  slug: string,
  title: string,
  description?: string,
  tags?: string[]
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const searchable = [slug, title, description ?? '', ...(tags ?? [])].join(' ').toLowerCase();
  return searchable.includes(q) || searchable.split(/\s+/).some((part) => part.startsWith(q));
}

const designSystemLabel: Record<DesignSystem, string> = {
  'POS': 'POS',
  'VM': 'VM',
  'lo-fi': 'Lo-fi',
};

export function PrototypeDirectory() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return prototypes.filter((p) =>
      searchFilter(search, p.slug, p.title, p.description, p.tags)
    );
  }, [search]);

  return (
    <div className="prototype-directory">
      <header className="prototype-directory__header">
        <div className="prototype-directory__header-inner">
          <p className="prototype-directory__eyebrow">Playground</p>
          <H1 className="prototype-directory__title">Prototype Directory</H1>
          <Muted as="p" className="prototype-directory__subtitle">
            Browse and open local prototypes. Filter by title, description, or tags.
          </Muted>
        </div>
      </header>

      <main className="prototype-directory__main">
        <div className="prototype-directory__search-wrap">
          <label htmlFor="prototype-search" className="sr-only">
            Search prototypes
          </label>
          <span className="prototype-directory__search-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
          <Input
            id="prototype-search"
            type="search"
            placeholder="Search by title, description, or tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search prototypes"
            className="prototype-directory__search-input"
          />
        </div>

        <p className="prototype-directory__result-count" aria-live="polite">
          {filtered.length === 0
            ? 'No prototypes match your search.'
            : `${filtered.length} ${filtered.length === 1 ? 'prototype' : 'prototypes'}`}
        </p>

        <div className="prototype-directory__grid">
          {filtered.length === 0 ? (
            <div className="prototype-directory__empty">
              <span className="prototype-directory__empty-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <p>Try a different search term.</p>
            </div>
          ) : (
            filtered.map((p) => (
              <Link key={p.slug} to={`/p/${p.slug}`} className="prototype-directory__card-link focus:outline-none">
                <Card className="prototype-directory__card">
                  <CardBody className="prototype-directory__card-body">
                    <div className="prototype-directory__card-top">
                      {p.designSystem && (
                        <span className={`prototype-directory__badge prototype-directory__badge--${p.designSystem}`}>
                          {designSystemLabel[p.designSystem]}
                        </span>
                      )}
                      <span className="prototype-directory__card-arrow" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                    <h2 className="prototype-directory__card-title">{p.title}</h2>
                    {p.description && (
                      <Body className="prototype-directory__card-desc">{p.description}</Body>
                    )}
                    {p.tags && p.tags.length > 0 && (
                      <div className="prototype-directory__tags">
                        {p.tags.map((tag) => (
                          <span key={tag} className="prototype-directory__tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
