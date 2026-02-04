'use client';

/**
 * ListingsModule - Property listings with filters, sort, and pagination
 * 
 * Uses the mock listings provider by default.
 * Can be swapped to real IDX provider without UI changes.
 */

import { useState, useEffect, useCallback } from 'react';
import {
    Listing,
    ListingFilters,
    ListingSort,
    ListingStatus,
    PropertyType,
    PROPERTY_TYPE_LABELS,
    STATUS_LABELS,
    DEFAULT_FILTERS,
} from '../../lib/data/providers/listings.types';
import {
    searchListings,
    formatListingPrice,
    formatFullPrice,
} from '../../lib/data/providers/listings.provider';

interface ListingsModuleProps {
    townSlug: string;
    townName: string;
    neighborhoodSlug?: string;
    neighborhoodName?: string;
}

export function ListingsModule({
    townSlug,
    townName,
    neighborhoodSlug,
    neighborhoodName,
}: ListingsModuleProps) {
    const [listings, setListings] = useState<Listing[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<ListingFilters>(DEFAULT_FILTERS);
    const [sort, setSort] = useState<ListingSort>({ field: 'listedAt', order: 'desc' });
    const [showFilters, setShowFilters] = useState(false);

    const scope = neighborhoodSlug ? 'neighborhood' : 'town';
    const locationName = neighborhoodName || townName;

    const fetchListings = useCallback(async () => {
        setLoading(true);
        try {
            const result = await searchListings({
                scope,
                townSlug,
                neighborhoodSlug,
                filters,
                sort,
                page,
                pageSize: 6,
            });
            setListings(result.listings);
            setTotal(result.total);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Failed to fetch listings:', error);
        } finally {
            setLoading(false);
        }
    }, [scope, townSlug, neighborhoodSlug, filters, sort, page]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const handleFilterChange = (newFilters: Partial<ListingFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setPage(1);
    };

    const handleSortChange = (newSort: ListingSort) => {
        setSort(newSort);
        setPage(1);
    };

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS);
        setPage(1);
    };

    return (
        <div className="bg-stone-900 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-stone-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white font-serif">
                        Homes for Sale in {locationName}
                    </h2>
                    <span className="text-stone-400 text-sm">
                        {total} {total === 1 ? 'listing' : 'listings'}
                    </span>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition-colors"
                    >
                        {showFilters ? 'Hide Filters' : 'Filters'}
                    </button>

                    <SortDropdown value={sort} onChange={handleSortChange} />

                    <StatusTabs
                        value={filters.status || ['active']}
                        onChange={(status) => handleFilterChange({ status })}
                    />
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <FiltersPanel
                        filters={filters}
                        onChange={handleFilterChange}
                        onReset={handleResetFilters}
                    />
                )}
            </div>

            {/* Listings Grid */}
            <div className="p-6">
                {loading ? (
                    <LoadingState />
                ) : listings.length === 0 ? (
                    <EmptyState onReset={handleResetFilters} />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {listings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                )}
            </div>

            {/* Disclaimer */}
            <div className="px-6 py-4 bg-stone-800 border-t border-stone-700">
                <p className="text-xs text-stone-500">
                    * Sample listings for demonstration. Real listings coming soon via MLS integration.
                </p>
            </div>
        </div>
    );
}

/**
 * Status tabs (Active / Pending / Sold)
 */
function StatusTabs({
    value,
    onChange,
}: {
    value: ListingStatus[];
    onChange: (status: ListingStatus[]) => void;
}) {
    const statuses: ListingStatus[] = ['active', 'pending', 'sold'];

    return (
        <div className="flex rounded-lg overflow-hidden border border-stone-700">
            {statuses.map((status) => (
                <button
                    key={status}
                    onClick={() => onChange([status])}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                        value.includes(status)
                            ? 'bg-blue-600 text-white'
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                >
                    {STATUS_LABELS[status]}
                </button>
            ))}
        </div>
    );
}

/**
 * Sort dropdown
 */
function SortDropdown({
    value,
    onChange,
}: {
    value: ListingSort;
    onChange: (sort: ListingSort) => void;
}) {
    const options = [
        { label: 'Newest', field: 'listedAt' as const, order: 'desc' as const },
        { label: 'Price: Low to High', field: 'price' as const, order: 'asc' as const },
        { label: 'Price: High to Low', field: 'price' as const, order: 'desc' as const },
        { label: 'Beds', field: 'beds' as const, order: 'desc' as const },
        { label: 'Sq Ft', field: 'sqft' as const, order: 'desc' as const },
    ];

    const currentLabel = options.find(
        (o) => o.field === value.field && o.order === value.order
    )?.label || 'Sort';

    return (
        <select
            value={`${value.field}-${value.order}`}
            onChange={(e) => {
                const [field, order] = e.target.value.split('-') as [typeof value.field, typeof value.order];
                onChange({ field, order });
            }}
            className="px-3 py-2 bg-stone-800 text-white rounded-lg text-sm border border-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((opt) => (
                <option key={`${opt.field}-${opt.order}`} value={`${opt.field}-${opt.order}`}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

/**
 * Filters panel
 */
function FiltersPanel({
    filters,
    onChange,
    onReset,
}: {
    filters: ListingFilters;
    onChange: (filters: Partial<ListingFilters>) => void;
    onReset: () => void;
}) {
    return (
        <div className="mt-4 p-4 bg-stone-800 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Price Range */}
                <div>
                    <label className="block text-xs text-stone-400 mb-1">Min Price</label>
                    <select
                        value={filters.priceMin || 0}
                        onChange={(e) => onChange({ priceMin: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-700 text-white rounded text-sm border border-stone-600"
                    >
                        <option value={0}>No min</option>
                        <option value={500000}>$500K</option>
                        <option value={1000000}>$1M</option>
                        <option value={2000000}>$2M</option>
                        <option value={3000000}>$3M</option>
                        <option value={5000000}>$5M</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-stone-400 mb-1">Max Price</label>
                    <select
                        value={filters.priceMax || 10000000}
                        onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-700 text-white rounded text-sm border border-stone-600"
                    >
                        <option value={10000000}>No max</option>
                        <option value={1000000}>$1M</option>
                        <option value={2000000}>$2M</option>
                        <option value={3000000}>$3M</option>
                        <option value={5000000}>$5M</option>
                        <option value={10000000}>$10M+</option>
                    </select>
                </div>

                {/* Beds / Baths */}
                <div>
                    <label className="block text-xs text-stone-400 mb-1">Min Beds</label>
                    <select
                        value={filters.bedsMin || 0}
                        onChange={(e) => onChange({ bedsMin: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-700 text-white rounded text-sm border border-stone-600"
                    >
                        <option value={0}>Any</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                        <option value={5}>5+</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-stone-400 mb-1">Min Baths</label>
                    <select
                        value={filters.bathsMin || 0}
                        onChange={(e) => onChange({ bathsMin: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-700 text-white rounded text-sm border border-stone-600"
                    >
                        <option value={0}>Any</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                    </select>
                </div>
            </div>

            {/* Property Types */}
            <div className="mt-4">
                <label className="block text-xs text-stone-400 mb-2">Property Type</label>
                <div className="flex flex-wrap gap-2">
                    {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                const current = filters.propertyTypes || [];
                                const updated = current.includes(type)
                                    ? current.filter((t) => t !== type)
                                    : [...current, type];
                                onChange({ propertyTypes: updated });
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition-colors ${
                                (filters.propertyTypes || []).includes(type)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                            }`}
                        >
                            {PROPERTY_TYPE_LABELS[type]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reset */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={onReset}
                    className="text-sm text-blue-400 hover:text-blue-300"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
}

/**
 * Listing card
 */
function ListingCard({ listing }: { listing: Listing }) {
    const statusColors = {
        active: 'bg-green-500',
        pending: 'bg-yellow-500',
        sold: 'bg-red-500',
    };

    return (
        <div className="bg-stone-800 rounded-lg overflow-hidden group hover:ring-2 hover:ring-blue-500 transition-all">
            {/* Image */}
            <div className="relative h-48 bg-stone-700">
                <div className="absolute inset-0 flex items-center justify-center text-stone-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs text-white font-medium ${statusColors[listing.status]}`}>
                    {STATUS_LABELS[listing.status]}
                </span>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="text-xl font-bold text-white mb-1">
                    {formatFullPrice(listing.price)}
                </div>
                <div className="text-sm text-stone-300 mb-2">
                    {listing.address.street}
                </div>
                <div className="text-sm text-stone-400">
                    {listing.address.city}, {listing.address.state}
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-stone-400">
                    <span>{listing.beds} bed</span>
                    <span>{listing.baths} bath</span>
                    <span>{listing.sqft.toLocaleString()} sqft</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Pagination
 */
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
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-2 bg-stone-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-700"
            >
                ← Prev
            </button>
            <span className="text-stone-400 text-sm px-4">
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-2 bg-stone-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-700"
            >
                Next →
            </button>
        </div>
    );
}

/**
 * Loading state
 */
function LoadingState() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-stone-800 rounded-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-stone-700" />
                    <div className="p-4 space-y-3">
                        <div className="h-6 bg-stone-700 rounded w-1/2" />
                        <div className="h-4 bg-stone-700 rounded w-3/4" />
                        <div className="h-4 bg-stone-700 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

/**
 * Empty state
 */
function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <div className="text-center py-12">
            <div className="text-stone-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <p className="text-lg text-white mb-2">No listings match your filters</p>
            <p className="text-stone-400 mb-4">Try adjusting your search criteria</p>
            <button
                onClick={onReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
}

export default ListingsModule;
