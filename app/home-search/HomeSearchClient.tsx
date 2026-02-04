"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import townData from "../data/acs/fairfield-county-towns.json";
import mockListings from "../data/listings/mock-listings.json";
import {
  DEFAULT_FILTERS,
  Listing,
  ListingBounds,
  ListingFilters,
  ListingSort,
  ListingStatus,
  PropertyType,
  PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
} from "../lib/data/providers/listings.types";
import {
  formatFullPrice,
  searchListings,
} from "../lib/data/providers/listings.provider";

const HomeSearchMap = dynamic(() => import("./HomeSearchMap"), { ssr: false });

const defaultCenter: [number, number] = [41.1307, -73.4975];

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function HomeSearchClient() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<ListingFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<ListingSort>({
    field: "listedAt",
    order: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [townSlugs, setTownSlugs] = useState<string[]>([]);
  const [neighborhoodSlugs, setNeighborhoodSlugs] = useState<string[]>([]);
  const [bounds, setBounds] = useState<ListingBounds | undefined>(undefined);
  const [pendingBounds, setPendingBounds] = useState<ListingBounds | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const hasInitializedSearch = useRef(false);

  const towns = useMemo(
    () =>
      Object.entries(townData.towns).map(([slug, town]) => ({
        slug,
        name: town.name,
      })),
    []
  );

  const townSlugByCity = useMemo(() => {
    return Object.entries(townData.towns).reduce<Record<string, string>>(
      (acc, [slug, town]) => {
        acc[town.name.toLowerCase()] = slug;
        return acc;
      },
      {}
    );
  }, []);

  const neighborhoodsByTown = useMemo(() => {
    const map: Record<string, { slug: string; name: string }[]> = {};
    for (const listing of mockListings.listings) {
      if (!listing.address.neighborhood) continue;
      const slug = townSlugByCity[listing.address.city.toLowerCase()];
      if (!slug) continue;
      if (!map[slug]) {
        map[slug] = [];
      }
      if (!map[slug].some((item) => item.slug === listing.address.neighborhood)) {
        map[slug].push({
          slug: listing.address.neighborhood,
          name: titleCase(listing.address.neighborhood),
        });
      }
    }
    Object.values(map).forEach((items) =>
      items.sort((a, b) => a.name.localeCompare(b.name))
    );
    return map;
  }, [townSlugByCity]);

  const activeTown = townSlugs[0] || "";
  const neighborhoodOptions = activeTown ? neighborhoodsByTown[activeTown] || [] : [];

  const executeSearch = useCallback(
    async (nextPage: number, nextBounds?: ListingBounds) => {
      setLoading(true);
      try {
        const result = await searchListings({
          scope: "global",
          townSlugs: townSlugs.length ? townSlugs : undefined,
          neighborhoodSlugs: neighborhoodSlugs.length ? neighborhoodSlugs : undefined,
          bounds: nextBounds,
          q: searchQuery.trim() ? searchQuery.trim() : undefined,
          filters,
          sort,
          page: nextPage,
          pageSize: 12,
        });
        setListings(result.listings);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters, neighborhoodSlugs, searchQuery, sort, townSlugs]
  );

  useEffect(() => {
    if (hasInitializedSearch.current) return;
    hasInitializedSearch.current = true;
    setHasSearched(true);
    executeSearch(1);
  }, [executeSearch]);

  const handleSearch = () => {
    setHasSearched(true);
    setPage(1);
    executeSearch(1, bounds);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    executeSearch(nextPage, bounds);
  };

  const handleSearchArea = () => {
    if (!pendingBounds) return;
    setBounds(pendingBounds);
    setPendingBounds(null);
    setHasSearched(true);
    setPage(1);
    executeSearch(1, pendingBounds);
  };

  const openListing = (listing: Listing) => {
    setSelectedListing(listing);
    setSelectedPhotoIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:h-screen lg:overflow-hidden">
      <div className="relative z-50 bg-stone-50 border-b border-stone-200 shadow-md">
        <div className="max-w-[92rem] mx-auto px-3 sm:px-5 lg:px-6 py-1.5">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col lg:flex-row lg:items-end gap-2">
              <div className="flex-1">
                <label className="sr-only">Address search</label>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by address..."
                  className="w-full rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusTabs
                  value={filters.status || ["active"]}
                  onChange={(status) => setFilters((prev) => ({ ...prev, status }))}
                />
                <SortDropdown value={sort} onChange={setSort} />
                <PropertyTypeDropdown
                  value={filters.propertyTypes || []}
                  onChange={(propertyTypes) =>
                    setFilters((prev) => ({ ...prev, propertyTypes }))
                  }
                />
                <button
                  className="px-5 py-1.5 text-sm rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="px-4 py-1.5 text-xs border border-stone-300 rounded-full text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-colors"
                  type="button"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                >
                  {showAdvanced ? "Hide advanced" : "Advanced"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <FilterSelect
                label="Town"
                value={activeTown}
                onChange={(value) => {
                  setTownSlugs(value ? [value] : []);
                  setNeighborhoodSlugs([]);
                }}
                options={towns.map((town) => ({ value: town.slug, label: town.name }))}
              />
              <FilterSelect
                label="Neighborhood"
                value={neighborhoodSlugs[0] || ""}
                onChange={(value) => setNeighborhoodSlugs(value ? [value] : [])}
                options={neighborhoodOptions.map((option) => ({
                  value: option.slug,
                  label: option.name,
                }))}
                disabled={!activeTown}
              />
              <label className="flex flex-col text-xs text-stone-500">
                Price min
                <input
                  type="number"
                  inputMode="numeric"
                  value={filters.priceMin && filters.priceMin > 0 ? filters.priceMin : ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      priceMin: value ? Number(value) : 0,
                    }));
                  }}
                  placeholder="No min"
                  className="mt-0.5 w-28 sm:w-32 px-3 py-1.5 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </label>
              <label className="flex flex-col text-xs text-stone-500">
                Price max
                <input
                  type="number"
                  inputMode="numeric"
                  value={
                    filters.priceMax && filters.priceMax < DEFAULT_FILTERS.priceMax
                      ? filters.priceMax
                      : ""
                  }
                  onChange={(event) => {
                    const value = event.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      priceMax: value ? Number(value) : DEFAULT_FILTERS.priceMax,
                    }));
                  }}
                  placeholder="No max"
                  className="mt-0.5 w-28 sm:w-32 px-3 py-1.5 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </label>
              <FilterSelect
                label="Beds"
                value={filters.bedsMin?.toString() || "0"}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, bedsMin: Number(value) }))
                }
                options={[
                  { value: "0", label: "Any" },
                  { value: "2", label: "2+" },
                  { value: "3", label: "3+" },
                  { value: "4", label: "4+" },
                  { value: "5", label: "5+" },
                ]}
              />
              <FilterSelect
                label="Baths"
                value={filters.bathsMin?.toString() || "0"}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, bathsMin: Number(value) }))
                }
                options={[
                  { value: "0", label: "Any" },
                  { value: "2", label: "2+" },
                  { value: "3", label: "3+" },
                  { value: "4", label: "4+" },
                ]}
              />
              <div className="flex items-center gap-2 lg:ml-auto">
                <button
                  className="px-4 py-1.5 text-xs border border-stone-300 rounded-full text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-colors"
                  type="button"
                >
                  Save search
                </button>
                <button
                  className="px-4 py-1.5 text-xs border border-stone-300 rounded-full text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-colors"
                  type="button"
                >
                  View saved
                </button>
              </div>
            </div>

            {showAdvanced && (
              <div className="flex flex-wrap items-end gap-3 border-t border-stone-200 pt-3">
                <label className="flex flex-col text-xs text-stone-500">
                  Sqft min
                  <input
                    type="number"
                    inputMode="numeric"
                    value={filters.sqftMin && filters.sqftMin > 0 ? filters.sqftMin : ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        sqftMin: value ? Number(value) : 0,
                      }));
                    }}
                    placeholder="No min"
                    className="mt-1 w-28 sm:w-32 px-3 py-2 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </label>
                <label className="flex flex-col text-xs text-stone-500">
                  Sqft max
                  <input
                    type="number"
                    inputMode="numeric"
                    value={
                      filters.sqftMax && filters.sqftMax < DEFAULT_FILTERS.sqftMax
                        ? filters.sqftMax
                        : ""
                    }
                    onChange={(event) => {
                      const value = event.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        sqftMax: value ? Number(value) : DEFAULT_FILTERS.sqftMax,
                      }));
                    }}
                    placeholder="No max"
                    className="mt-1 w-28 sm:w-32 px-3 py-2 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </label>
                <label className="flex flex-col text-xs text-stone-500">
                  Acres min
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={
                      filters.lotAcresMin && filters.lotAcresMin > 0
                        ? filters.lotAcresMin
                        : ""
                    }
                    onChange={(event) => {
                      const value = event.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        lotAcresMin: value ? Number(value) : 0,
                      }));
                    }}
                    placeholder="No min"
                    className="mt-1 w-24 sm:w-28 px-3 py-2 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </label>
                <label className="flex flex-col text-xs text-stone-500">
                  Acres max
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={
                      filters.lotAcresMax && filters.lotAcresMax < DEFAULT_FILTERS.lotAcresMax
                        ? filters.lotAcresMax
                        : ""
                    }
                    onChange={(event) => {
                      const value = event.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        lotAcresMax: value ? Number(value) : DEFAULT_FILTERS.lotAcresMax,
                      }));
                    }}
                    placeholder="No max"
                    className="mt-1 w-24 sm:w-28 px-3 py-2 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </label>
              </div>
            )}

            <div className="flex lg:hidden items-center gap-3">
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm border ${viewMode === "map"
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 text-stone-600"
                  }`}
                onClick={() => setViewMode("map")}
              >
                Map
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm border ${viewMode === "list"
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 text-stone-600"
                  }`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-320px)] lg:h-[calc(100vh-200px)] lg:overflow-hidden">
        {(viewMode === "map" || typeof window === "undefined") && (
          <div className="relative flex-1 min-h-[420px] lg:min-h-0 bg-stone-200 z-0">
            <HomeSearchMap
              listings={hasSearched ? listings : []}
              center={defaultCenter}
              onBoundsChange={(nextBounds) => setPendingBounds(nextBounds)}
              onSelectListing={openListing}
            />
            {pendingBounds && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={handleSearchArea}
                  className="px-4 py-2 rounded-full bg-white text-stone-800 text-sm shadow-md border border-stone-200 hover:border-stone-300"
                >
                  Search this area
                </button>
              </div>
            )}
          </div>
        )}

        {(hasSearched || viewMode === "list") && (
          <aside className="w-full lg:w-[520px] border-l border-stone-200 bg-white lg:h-full lg:overflow-y-auto">
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Results</p>
                  <p className="text-lg font-semibold text-stone-900">
                    {total} {total === 1 ? "listing" : "listings"}
                  </p>
                </div>
                <span className="text-xs text-stone-400">
                  Sorted by {sort.field}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {loading ? (
                <LoadingState />
              ) : listings.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listings.map((listing) => (
                      <ListingCard
                        key={listing.id}
                        listing={listing}
                        onSelect={openListing}
                      />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
          </aside>
        )}
      </div>

      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          photoIndex={selectedPhotoIndex}
          onPhotoChange={setSelectedPhotoIndex}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}

function StatusTabs({
  value,
  onChange,
}: {
  value: ListingStatus[];
  onChange: (status: ListingStatus[]) => void;
}) {
  const statuses: ListingStatus[] = ["active", "pending", "sold"];
  return (
    <div className="flex rounded-full overflow-hidden border border-stone-200 bg-white">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange([status])}
          className={`px-3 py-1 text-xs transition-colors ${value.includes(status)
            ? "bg-stone-900 text-white"
            : "text-stone-500 hover:text-stone-800"
            }`}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: ListingSort;
  onChange: (sort: ListingSort) => void;
}) {
  const options = [
    { label: "Newest", field: "listedAt" as const, order: "desc" as const },
    { label: "Price: Low to High", field: "price" as const, order: "asc" as const },
    { label: "Price: High to Low", field: "price" as const, order: "desc" as const },
    { label: "Beds", field: "beds" as const, order: "desc" as const },
    { label: "Sq Ft", field: "sqft" as const, order: "desc" as const },
  ];

  return (
    <select
      value={`${value.field}-${value.order}`}
      onChange={(event) => {
        const [field, order] = event.target.value.split("-") as [
          ListingSort["field"],
          ListingSort["order"]
        ];
        onChange({ field, order });
      }}
      className="px-3 py-1.5 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
    >
      {options.map((opt) => (
        <option key={`${opt.field}-${opt.order}`} value={`${opt.field}-${opt.order}`}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function PropertyTypeDropdown({
  value,
  onChange,
}: {
  value: PropertyType[];
  onChange: (types: PropertyType[]) => void;
}) {
  const allTypes = Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[];
  const isAll = value.length === 0 || value.length === allTypes.length;
  const label = isAll
    ? "Property Type: All"
    : `Property Type: ${value.length}`;

  const toggleType = (type: PropertyType) => {
    const current = isAll ? allTypes : value;
    const next = current.includes(type)
      ? current.filter((item) => item !== type)
      : [...current, type];
    onChange(next.length === 0 ? allTypes : next);
  };

  return (
    <details className="relative">
      <summary className="list-none px-4 py-1.5 text-xs rounded-full border border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400 cursor-pointer bg-white">
        {label}
      </summary>
      <div className="absolute right-0 mt-2 w-56 rounded-xl border border-stone-200 bg-white shadow-lg p-3 z-30">
        <label className="flex items-center gap-2 text-xs text-stone-600">
          <input
            type="checkbox"
            checked={isAll}
            onChange={() => onChange(allTypes)}
          />
          All property types
        </label>
        <div className="mt-2 border-t border-stone-100 pt-2 space-y-2">
          {allTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-xs text-stone-600">
              <input
                type="checkbox"
                checked={isAll || value.includes(type)}
                onChange={() => toggleType(type)}
              />
              {PROPERTY_TYPE_LABELS[type]}
            </label>
          ))}
        </div>
      </div>
    </details>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col text-xs text-stone-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="mt-0.5 px-3 py-1.5 bg-white text-stone-700 rounded-full text-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:bg-stone-100 disabled:text-stone-400"
      >
        <option key={`${label}-all`} value="">
          All
        </option>
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ListingCard({
  listing,
  onSelect,
}: {
  listing: Listing;
  onSelect?: (listing: Listing) => void;
}) {
  const statusStyles: Record<ListingStatus, string> = {
    active: "bg-emerald-100 text-emerald-800",
    pending: "bg-amber-100 text-amber-800",
    sold: "bg-rose-100 text-rose-800",
  };

  return (
    <button
      type="button"
      onClick={() => onSelect?.(listing)}
      className="text-left rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-36">
        <Image
          src={listing.photos[0]}
          alt={listing.address.street}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full ${statusStyles[listing.status]}`}
        >
          {STATUS_LABELS[listing.status]}
        </span>
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold text-stone-900">
          {formatFullPrice(listing.price)}
        </div>
        <div className="text-sm text-stone-600">{listing.address.street}</div>
        <div className="text-xs text-stone-500">
          {listing.address.city}, {listing.address.state}
        </div>
        <div className="mt-3 flex gap-3 text-xs text-stone-500">
          <span>{listing.beds} bd</span>
          <span>{listing.baths} ba</span>
          <span>{listing.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </button>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border border-stone-200 bg-white p-4 animate-pulse">
          <div className="h-32 bg-stone-100 rounded-xl" />
          <div className="mt-4 h-4 bg-stone-100 rounded w-2/3" />
          <div className="mt-2 h-3 bg-stone-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-500">
      No listings match your current filters. Adjust your selections and search again.
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-stone-500">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded-full border border-stone-200 disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded-full border border-stone-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

function ListingModal({
  listing,
  photoIndex,
  onPhotoChange,
  onClose,
}: {
  listing: Listing;
  photoIndex: number;
  onPhotoChange: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
              Listing details
            </p>
            <p className="text-lg font-semibold text-stone-900">
              {listing.address.street}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6 p-6">
          <div>
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-100">
              <Image
                src={listing.photos[photoIndex] || listing.photos[0]}
                alt={listing.address.street}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {listing.photos.slice(0, 8).map((photo, index) => (
                <button
                  key={`${listing.id}-photo-${photo}`}
                  type="button"
                  onClick={() => onPhotoChange(index)}
                  className={`relative h-16 rounded-lg overflow-hidden border ${index === photoIndex
                    ? "border-stone-900"
                    : "border-stone-200"
                    }`}
                >
                  <Image src={photo} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-2xl font-semibold text-stone-900">
                {formatFullPrice(listing.price)}
              </p>
              <p className="text-sm text-stone-500">
                {listing.address.city}, {listing.address.state} {listing.address.zip}
              </p>
              <div className="mt-4 flex gap-4 text-sm text-stone-600">
                <span>{listing.beds} beds</span>
                <span>{listing.baths} baths</span>
                <span>{listing.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 p-4">
              <p className="text-sm text-stone-600">
                Listing details and inquiry flow are coming next. For now, this
                preview confirms map and list selection behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
