// utils/filterEngine.js

/**
 * Elomaze Universal Filter Engine
 * Works for: properties, services, marketplace items, etc.
 */

export const filterItems = (items = [], searchTerm = "", filters = {}) => {
  const term = searchTerm.toLowerCase().trim();

  return items.filter((item) => {
    if (!item) return false;

    // ----------------------------
    // 1. GLOBAL SEARCH (title + location + description)
    // ----------------------------
    const matchesSearch =
      term === "" ||
      item.title?.toLowerCase().includes(term) ||
      item.location?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term);

    // ----------------------------
    // 2. CATEGORY FILTER
    // ----------------------------
    const matchesCategory =
      !filters.category ||
      filters.category === "All" ||
      item.category === filters.category;

    // ----------------------------
    // 3. TYPE FILTER (property type, service type, etc.)
    // ----------------------------
    const matchesType =
      !filters.type ||
      filters.type === "Any" ||
      item.type === filters.type;

    // ----------------------------
    // 4. PRICE FILTER (safe numeric handling)
    // ----------------------------
    const price = Number(item.price || 0);
    const minPrice = Number(filters.minPrice || 0);
    const maxPrice =
      filters.maxPrice === "" || filters.maxPrice == null
        ? Infinity
        : Number(filters.maxPrice);

    const matchesPrice = price >= minPrice && price <= maxPrice;

    // ----------------------------
    // 5. VERIFIED FILTER
    // ----------------------------
    const matchesVerified =
      !filters.verified || item.verified === true;

    // ----------------------------
    // 6. BEDROOMS (optional for properties)
    // ----------------------------
    const matchesBedrooms =
      !filters.bedrooms ||
      filters.bedrooms === "Any" ||
      item.bedrooms === Number(filters.bedrooms);

    // ----------------------------
    // 7. BATHROOMS (optional for properties)
    // ----------------------------
    const matchesBathrooms =
      !filters.bathrooms ||
      filters.bathrooms === "Any" ||
      item.bathrooms === Number(filters.bathrooms);

    // ----------------------------
    // 8. AMENITIES (array matching)
    // ----------------------------
    const matchesAmenities =
      !filters.amenities || filters.amenities.length === 0
        ? true
        : filters.amenities.every((a) =>
            item.amenities?.includes(a)
          );

    // ----------------------------
    // 9. ATTRIBUTES (for services / advanced filtering)
    // ----------------------------
    const matchesAttributes =
      !filters.attributes
        ? true
        : Object.entries(filters.attributes).every(
            ([key, value]) => {
              if (!value) return true;
              return item.attributes?.[key] === value;
            }
          );

    // ----------------------------
    // FINAL RESULT
    // ----------------------------
    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesPrice &&
      matchesVerified &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesAmenities &&
      matchesAttributes
    );
  });
};