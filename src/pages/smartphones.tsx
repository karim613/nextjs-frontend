// pages/smartphones.tsx

import { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Lowerfooter from '../components/Lowerfooter';
import styles from '../styles/Pages/Smartphones.module.css';

// Import SimpleBar and handle SSR
import dynamic from 'next/dynamic';
const SimpleBar = dynamic(() => import('simplebar-react'), { ssr: false });
import 'simplebar-react/dist/simplebar.min.css';

interface Phone {
  id: number;
  name: string;
  price: string;
  imgSrc: string;
  stores: string;
  brand: string;
  os: string;
  storage: string;
  ram: string;
}

interface SmartphonesProps {
  phones: Phone[];
  initialFilters: {
    minPrice: number;
    maxPrice: number;
    selectedBrand: string[];
    os: string[];
    storage: string[];
    ram: string[];
    sort: string;
    filterSearchQuery: string;
  };
  filterCounts: {
    brandCounts: { [key: string]: number };
    osCounts: { [key: string]: number };
    storageCounts: { [key: string]: number };
    ramCounts: { [key: string]: number };
  };
  filterOptions: {
    brands: string[];
    oss: string[];
    storages: string[];
    rams: string[];
  };
}

const Smartphones = ({
  phones,
  initialFilters,
  filterCounts,
  filterOptions,
}: SmartphonesProps) => {
  const router = useRouter();

  // Initialize state with initialFilters from server
  const [minPrice, setMinPrice] = useState<number>(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters.maxPrice);

  // Intermediate state for slider inputs
  const [minPriceInput, setMinPriceInput] = useState<number>(
    initialFilters.minPrice
  );
  const [maxPriceInput, setMaxPriceInput] = useState<number>(
    initialFilters.maxPrice
  );

  const [selectedBrand, setSelectedBrand] = useState<string[]>(
    initialFilters.selectedBrand
  );
  const [os, setOs] = useState<string[]>(initialFilters.os);
  const [storage, setStorage] = useState<string[]>(initialFilters.storage);
  const [ram, setRam] = useState<string[]>(initialFilters.ram);

  const [filterSearchQuery, setFilterSearchQuery] = useState<string>(
    initialFilters.filterSearchQuery
  );

  const [isSortOptionsOpen, setIsSortOptionsOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>(initialFilters.sort);

  const [comparedItems, setComparedItems] = useState<number[]>([]);
  const [isCompareListOpen, setIsCompareListOpen] = useState<boolean>(true);

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'priceLowToHigh', label: 'Lowest price' },
    { value: 'priceHighToLow', label: 'Highest price' },
    { value: 'nameAZ', label: 'Name: A to Z' },
    { value: 'nameZA', label: 'Name: Z to A' },
  ];

  // Ref for sort dropdown to detect outside click
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelection = (
    setFunction: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setFunction((prev: string[]) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const comparedPhones = phones.filter((phone) =>
    comparedItems.includes(phone.id)
  );

  // Compute the label of the selected sort option
  const selectedOptionLabel =
    sortOptions.find((option) => option.value === sortOption)?.label ||
    'Default';

  // Synchronize state with initialFilters whenever initialFilters change
  useEffect(() => {
    setMinPrice(initialFilters.minPrice);
    setMaxPrice(initialFilters.maxPrice);
    setMinPriceInput(initialFilters.minPrice);
    setMaxPriceInput(initialFilters.maxPrice);
    setSelectedBrand(initialFilters.selectedBrand);
    setOs(initialFilters.os);
    setStorage(initialFilters.storage);
    setRam(initialFilters.ram);
    setSortOption(initialFilters.sort);
    setFilterSearchQuery(initialFilters.filterSearchQuery);
  }, [initialFilters]);

  // Update URL query parameters whenever filters or sort options change
  useEffect(() => {
    // Function to normalize arrays for comparison
    const normalize = (value: any) => {
      if (Array.isArray(value)) {
        return value.sort().join(',');
      } else if (value) {
        return [value].sort().join(',');
      } else {
        return '';
      }
    };

    const query: any = {};

    if (minPrice !== 0) query.minPrice = minPrice.toString();
    if (maxPrice !== 3000) query.maxPrice = maxPrice.toString();
    if (selectedBrand.length > 0) query.brand = selectedBrand;
    if (os.length > 0) query.os = os;
    if (storage.length > 0) query.storage = storage;
    if (ram.length > 0) query.ram = ram;
    if (sortOption !== 'default') query.sort = sortOption;
    if (filterSearchQuery.trim() !== '')
      query.filterSearchQuery = filterSearchQuery;

    const currentQuery = router.query;

    // Function to get single value from query parameter
    const getSingleValue = (
      value: string | string[] | undefined,
      defaultValue: string
    ): string => {
      if (Array.isArray(value)) {
        return value[0] || defaultValue;
      } else {
        return value || defaultValue;
      }
    };

    const currentMinPrice = Number(getSingleValue(currentQuery.minPrice, '0'));
    const currentMaxPrice = Number(
      getSingleValue(currentQuery.maxPrice, '3000')
    );
    const currentSortOption = getSingleValue(currentQuery.sort, 'default');
    const currentFilterSearchQuery = getSingleValue(
      currentQuery.filterSearchQuery,
      ''
    );

    const isDifferent =
      minPrice !== currentMinPrice ||
      maxPrice !== currentMaxPrice ||
      normalize(selectedBrand) !== normalize(currentQuery.brand) ||
      normalize(os) !== normalize(currentQuery.os) ||
      normalize(storage) !== normalize(currentQuery.storage) ||
      normalize(ram) !== normalize(currentQuery.ram) ||
      sortOption !== currentSortOption ||
      filterSearchQuery !== currentFilterSearchQuery;

    if (isDifferent) {
      router.push(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        { shallow: false } // Ensure getServerSideProps is called
      );
    }
  }, [
    minPrice,
    maxPrice,
    selectedBrand,
    os,
    storage,
    ram,
    sortOption,
    filterSearchQuery,
    router,
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOptionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle changes from the dual-handle slider
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPriceInput(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPriceInput(value);
  };

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPriceInput - 1);
    setMinPriceInput(value);
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPriceInput + 1);
    setMaxPriceInput(value);
  };

  // Update minPrice and maxPrice when user releases the mouse
  const handleMinSliderMouseUp = () => {
    setMinPrice(minPriceInput);
  };

  const handleMaxSliderMouseUp = () => {
    setMaxPrice(maxPriceInput);
  };

  // Update on input blur
  const handleMinInputBlur = () => {
    setMinPrice(minPriceInput);
  };

  const handleMaxInputBlur = () => {
    setMaxPrice(maxPriceInput);
  };

  // Update on input Enter key press
  const handleMinInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setMinPrice(minPriceInput);
    }
  };

  const handleMaxInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setMaxPrice(maxPriceInput);
    }
  };

  // Function to remove a selected filter
  const removeFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case 'minPrice':
        setMinPrice(0);
        setMinPriceInput(0);
        break;
      case 'maxPrice':
        setMaxPrice(3000);
        setMaxPriceInput(3000);
        break;
      case 'brand':
        if (value) {
          setSelectedBrand(selectedBrand.filter((item) => item !== value));
        }
        break;
      case 'os':
        if (value) {
          setOs(os.filter((item) => item !== value));
        }
        break;
      case 'storage':
        if (value) {
          setStorage(storage.filter((item) => item !== value));
        }
        break;
      case 'ram':
        if (value) {
          setRam(ram.filter((item) => item !== value));
        }
        break;
      default:
        break;
    }
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setMinPrice(0);
    setMaxPrice(3000);
    setMinPriceInput(0);
    setMaxPriceInput(3000);
    setSelectedBrand([]);
    setOs([]);
    setStorage([]);
    setRam([]);
  };

  // Check if any filters are selected
  const anyFiltersSelected =
    minPrice > 0 ||
    maxPrice < 3000 ||
    selectedBrand.length > 0 ||
    os.length > 0 ||
    storage.length > 0 ||
    ram.length > 0;

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {/* Filter Section */}
        <div className={styles.stickyWrapper}>
          <aside className={styles.filterSection}>
            <h2 className={styles.filterTitle}>Filter</h2>
            <SimpleBar style={{ maxHeight: 'calc(100vh - 0px)' }}>
              {/* Search Bar */}
              <div className={styles.searchBar}>
                <input
                  type="text"
                  value={filterSearchQuery}
                  onChange={(e) => setFilterSearchQuery(e.target.value)}
                  placeholder="Find filters"
                  className={styles.searchInput}
                />
                <div className={styles.searchIcon}>
                  {/* SVG for search icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                  </svg>
                </div>
              </div>

              {/* Price Slider */}
              <div className={styles.filterCategory}>
                <h3 className={styles.filterCategoryTitle}>Price</h3>
                {/* Dual-Handle Slider */}
                <div
                  className={styles.sliderContainer}
                  style={
                    {
                      '--min': minPriceInput,
                      '--max': maxPriceInput,
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.sliderTrack}></div>
                  {/* Min Price Handle */}
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={minPriceInput}
                    onChange={handleMinSliderChange}
                    onMouseUp={handleMinSliderMouseUp}
                    className={`${styles.sliderThumb} ${styles.sliderThumbLeft}`}
                  />
                  {/* Max Price Handle */}
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={maxPriceInput}
                    onChange={handleMaxSliderChange}
                    onMouseUp={handleMaxSliderMouseUp}
                    className={`${styles.sliderThumb} ${styles.sliderThumbRight}`}
                  />
                </div>
                <div className={styles.priceLabels}>
                  <span>Min: {minPriceInput}€</span>
                  <span>Max: {maxPriceInput}€</span>
                </div>
                {/* Price Inputs */}
                <div className={styles.priceInputs}>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    value={minPriceInput}
                    onChange={handleMinInputChange}
                    onBlur={handleMinInputBlur}
                    onKeyPress={handleMinInputKeyPress}
                    className={styles.priceInput}
                    placeholder="Min Price"
                  />
                  <span> - </span>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    value={maxPriceInput}
                    onChange={handleMaxInputChange}
                    onBlur={handleMaxInputBlur}
                    onKeyPress={handleMaxInputKeyPress}
                    className={styles.priceInput}
                    placeholder="Max Price"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className={styles.filterCategory}>
                <h3 className={styles.filterCategoryTitle}>Brand</h3>
                {filterOptions.brands.map((brand) => (
                  <label key={brand} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={selectedBrand.includes(brand)}
                      onChange={() => toggleSelection(setSelectedBrand, brand)}
                    />
                    <span>{brand}</span>
                    <span className={styles.filterCount}>
                      ({filterCounts.brandCounts[brand] || 0})
                    </span>
                  </label>
                ))}
              </div>

              {/* Operating System Filter */}
              <div className={styles.filterCategory}>
                <h3 className={styles.filterCategoryTitle}>
                  Operating System
                </h3>
                {filterOptions.oss.map((system) => (
                  <label key={system} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={os.includes(system)}
                      onChange={() => toggleSelection(setOs, system)}
                    />
                    <span>{system}</span>
                    <span className={styles.filterCount}>
                      ({filterCounts.osCounts[system] || 0})
                    </span>
                  </label>
                ))}
              </div>

              {/* Storage Capacity Filter */}
              <div className={styles.filterCategory}>
                <h3 className={styles.filterCategoryTitle}>
                  Storage Capacity
                </h3>
                {filterOptions.storages.map((storageOption) => (
                  <label
                    key={storageOption}
                    className={styles.filterOption}
                  >
                    <input
                      type="checkbox"
                      checked={storage.includes(storageOption)}
                      onChange={() =>
                        toggleSelection(setStorage, storageOption)
                      }
                    />
                    <span>{storageOption}</span>
                    <span className={styles.filterCount}>
                      ({filterCounts.storageCounts[storageOption] || 0})
                    </span>
                  </label>
                ))}
              </div>

              {/* RAM Filter */}
              <div className={styles.filterCategory}>
                <h3 className={styles.filterCategoryTitle}>RAM</h3>
                {filterOptions.rams.map((ramOption) => (
                  <label key={ramOption} className={styles.filterOption}>
                    <input
                      type="checkbox"
                      checked={ram.includes(ramOption)}
                      onChange={() => toggleSelection(setRam, ramOption)}
                    />
                    <span>{ramOption}</span>
                    <span className={styles.filterCount}>
                      ({filterCounts.ramCounts[ramOption] || 0})
                    </span>
                  </label>
                ))}
              </div>
            </SimpleBar>
          </aside>
        </div>

        {/* Product Section */}
        <section className={styles.productSection}>
          {/* Sort By Button */}
          <div className={styles.sortByContainer} ref={dropdownRef}>
            <button
              className={styles.sortByButton}
              onClick={() => setIsSortOptionsOpen(!isSortOptionsOpen)}
            >
              Sort by {selectedOptionLabel}
              <span
                className={`${styles.arrowDown} ${
                  isSortOptionsOpen ? styles.open : ''
                }`}
              ></span>
            </button>
            {isSortOptionsOpen && (
              <ul className={styles.sortOptions}>
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <label className={styles.sortOptionLabel}>
                      <input
                        type="radio"
                        name="sortOption"
                        checked={sortOption === option.value}
                        onChange={() => {
                          setSortOption(option.value);
                          setIsSortOptionsOpen(false);
                        }}
                      />
                      <span className={styles.customCheckbox}></span>
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filters Header */}
          <div className={styles.filtersHeader}>
            <div className={styles.productCount}>
              {phones.length}+ products
            </div>
            <div className={styles.filtersAndClear}>
              <div
                className={`${styles.selectedFilters} ${
                  anyFiltersSelected ? styles.filtersActive : ''
                }`}
              >
                {/* Filter Chips */}
                {/* Price Filter */}
                {(minPrice > 0 || maxPrice < 3000) && (
                  <div
                    className={styles.filterChip}
                    onClick={() => {
                      setMinPrice(0);
                      setMaxPrice(3000);
                      setMinPriceInput(0);
                      setMaxPriceInput(3000);
                    }}
                  >
                    <span>
                      Price: {minPrice}€ - {maxPrice}€
                    </span>
                    <span className={styles.removeIcon}>×</span>
                  </div>
                )}
                {/* Brand Filters */}
                {selectedBrand.map((brand) => (
                  <div
                    key={`brand-${brand}`}
                    className={styles.filterChip}
                    onClick={() => removeFilter('brand', brand)}
                  >
                    <span>{brand}</span>
                    <span className={styles.removeIcon}>×</span>
                  </div>
                ))}
                {/* OS Filters */}
                {os.map((system) => (
                  <div
                    key={`os-${system}`}
                    className={styles.filterChip}
                    onClick={() => removeFilter('os', system)}
                  >
                    <span>{system}</span>
                    <span className={styles.removeIcon}>×</span>
                  </div>
                ))}
                {/* Storage Filters */}
                {storage.map((storageOption) => (
                  <div
                    key={`storage-${storageOption}`}
                    className={styles.filterChip}
                    onClick={() => removeFilter('storage', storageOption)}
                  >
                    <span>{storageOption}</span>
                    <span className={styles.removeIcon}>×</span>
                  </div>
                ))}
                {/* RAM Filters */}
                {ram.map((ramOption) => (
                  <div
                    key={`ram-${ramOption}`}
                    className={styles.filterChip}
                    onClick={() => removeFilter('ram', ramOption)}
                  >
                    <span>{ramOption}</span>
                    <span className={styles.removeIcon}>×</span>
                  </div>
                ))}
                {/* Clear All Filters Button */}
                {anyFiltersSelected && (
                  <button
                    className={styles.clearAllFiltersButton}
                    onClick={clearAllFilters}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>

{/* Product Grid */}
<div className={styles.productGrid}>
  {phones.length > 0 ? (
    phones.map((phone) => (
      <Link key={phone.id} href={`/product/${phone.id}`}>
        <div
          className={`${styles.productCard} ${
            comparedItems.length > 0 ? styles.expandedCard : ''
          }`}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.compareBox}>
              <input
                type="checkbox"
                id={`compare-${phone.id}`}
                checked={comparedItems.includes(phone.id)}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from bubbling up
                }}
                onChange={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling up
                  if (comparedItems.includes(phone.id)) {
                    setComparedItems(
                      comparedItems.filter((id) => id !== phone.id)
                    );
                  } else {
                    if (comparedItems.length < 3) {
                      setComparedItems([...comparedItems, phone.id]);
                    } else {
                      alert('You can only compare up to 3 items.');
                    }
                  }
                }}
              />
              <label
                htmlFor={`compare-${phone.id}`}
                className={styles.compareLabel}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from bubbling up
                }}
              >
                Compare
              </label>
            </div>
            <img src={phone.imgSrc} alt={phone.name} />
          </div>
          <h3 className={styles.productName}>{phone.name}</h3>
          <p className={styles.productPrice}>{phone.price}</p>
          <p className={styles.productStores}>{phone.stores}</p>
          <button
            className={styles.quickShopBtn}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              e.stopPropagation(); // Prevent click event from bubbling up
              // Handle quick view logic
            }}
          >
            Quick view
          </button>
        </div>
      </Link>
    ))
  ) : (
    <p>No products match your filters.</p>
  )}
</div>
</section>
</div>

{/* Compare List */}
{comparedItems.length > 0 && (
  <div className={`${styles.compareList} ${styles.open}`}>
    <div
      className={styles.compareHeader}
      aria-label={
        isCompareListOpen ? 'Collapse Compare List' : 'Expand Compare List'
      }
      onClick={() => setIsCompareListOpen(!isCompareListOpen)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsCompareListOpen(!isCompareListOpen);
        }
      }}
    >
      <div className={styles.headerInfo}>
        <h3>Compare Products</h3>
        <span className={styles.notification}>
          {comparedItems.length} of 3 items selected
        </span>
      </div>

      {/* Header Actions */}
      <div className={styles.headerActions}>
        <span
          className={`${styles.arrow} ${
            isCompareListOpen ? styles.up : styles.down
          }`}
        ></span>
      </div>
    </div>

    {/* Compare Content */}
    <div
      className={`${styles.compareContent} ${
        isCompareListOpen ? styles.open : styles.closed
      }`}
    >
      {comparedPhones.length > 0 ? (
        <>
          <div className={styles.compareItemsWrapper}>
            {comparedPhones.map((phone) => (
              <div key={phone.id} className={styles.compareItem}>
                <img src={phone.imgSrc} alt={phone.name} />
                <div className={styles.compareDetails}>
                  <p className="productName">{phone.name}</p>
                  <p className="productPrice">{phone.price}</p>
                  {/* Add more details as needed */}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from bubbling up
                    setComparedItems(
                      comparedItems.filter((id) => id !== phone.id)
                    );
                  }}
                  className={styles.removeCompareItem}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Compare Button */}
            <button
              className={styles.compareButton}
              disabled={comparedItems.length < 2}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                if (comparedItems.length >= 2) {
                  // Add your compare logic here
                  console.log('Comparing products:', comparedItems);
                }
              }}
            >
              Compare now ({comparedItems.length})
            </button>

            {/* Clear All Button */}
            <button
              className={styles.clearAllButton}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                setComparedItems([]);
              }}
            >
              Clear all
            </button>
          </div>

          {/* Empty Static Containers */}
          {comparedPhones.length < 3 &&
            [...Array(3 - comparedPhones.length)].map((_, index) => {
              const itemNumber = comparedPhones.length + index + 1;
              const ordinal =
                itemNumber === 2
                  ? 'second'
                  : itemNumber === 3
                  ? 'third'
                  : '';
              return (
                <div key={index} className={styles.emptyCompareItem}>
                  {`Select ${ordinal} item to compare`}
                </div>
              );
            })}
        </>
      ) : (
        <p>No products selected for comparison.</p>
      )}
    </div>
  </div>
)}

<Footer />
<Lowerfooter />
</div>
); // Closing parenthesis for the return statement
}; // Closing brace for the component function

export default Smartphones;







export const getServerSideProps: GetServerSideProps = async (context) => {
  const getSingleValue = (
    value: string | string[] | undefined,
    defaultValue: string
  ): string => {
    if (Array.isArray(value)) {
      return value[0] || defaultValue;
    } else {
      return value || defaultValue;
    }
  };

  const minPriceStr = getSingleValue(context.query.minPrice, '0');
  const maxPriceStr = getSingleValue(context.query.maxPrice, '3000');
  const sortStr = getSingleValue(context.query.sort, 'default');
  const filterSearchQuery = getSingleValue(
    context.query.filterSearchQuery,
    ''
  );

  const brand = context.query.brand;
  const os = context.query.os;
  const storage = context.query.storage;
  const ram = context.query.ram;

  // Ensure that brand, os, storage, and ram are arrays
  const brands = Array.isArray(brand) ? brand : brand ? [brand] : [];
  const oss = Array.isArray(os) ? os : os ? [os] : [];
  const storages = Array.isArray(storage)
    ? storage
    : storage
    ? [storage]
    : [];
  const rams = Array.isArray(ram) ? ram : ram ? [ram] : [];

  const minPrice = Number(minPriceStr);
  const maxPrice = Number(maxPriceStr);
  const sort = sortStr;

  // Fetch smartphones data from the backend API
  const res = await fetch('http://localhost:8080/smartphones');
  const allPhones: Phone[] = await res.json();

  
  
  
  // Function to parse price
  const parsePrice = (priceStr: string): number => {
    let cleanedPrice = priceStr.replace('€', '').trim();
    cleanedPrice = cleanedPrice.replace(/,/g, '');
    return parseFloat(cleanedPrice);
  };

  // Apply filters
  let filteredPhones = allPhones.filter((phone) => {
    const phonePrice = parsePrice(phone.price);
    const matchesPrice = phonePrice >= minPrice && phonePrice <= maxPrice;
    const matchesBrand = brands.length === 0 || brands.includes(phone.brand);
    const matchesOs = oss.length === 0 || oss.includes(phone.os);
    const matchesStorage =
      storages.length === 0 || storages.includes(phone.storage);
    const matchesRam = rams.length === 0 || rams.includes(phone.ram);
    return (
      matchesPrice && matchesBrand && matchesOs && matchesStorage && matchesRam
    );
  });

  // Apply sorting
  if (sort === 'priceLowToHigh') {
    filteredPhones.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sort === 'priceHighToLow') {
    filteredPhones.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (sort === 'nameAZ') {
    filteredPhones.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'nameZA') {
    filteredPhones.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Calculate counts for each filter option based on the currently filtered phones
  const brandCounts: { [key: string]: number } = {};
  const osCounts: { [key: string]: number } = {};
  const storageCounts: { [key: string]: number } = {};
  const ramCounts: { [key: string]: number } = {};

  // Filter phones for counting, including current filters
  const phonesForCounting = allPhones.filter((phone) => {
    const phonePrice = parsePrice(phone.price);
    const matchesPrice = phonePrice >= minPrice && phonePrice <= maxPrice;
    return matchesPrice;
  });

  phonesForCounting.forEach((phone) => {
    // Brand Counts
    brandCounts[phone.brand] = (brandCounts[phone.brand] || 0) + 1;

    // OS Counts
    osCounts[phone.os] = (osCounts[phone.os] || 0) + 1;

    // Storage Counts
    storageCounts[phone.storage] = (storageCounts[phone.storage] || 0) + 1;

    // RAM Counts
    ramCounts[phone.ram] = (ramCounts[phone.ram] || 0) + 1;
  });

  const filterSearchQueryLower = filterSearchQuery.toLowerCase();

  // Filter counts based on filterSearchQuery
  const filteredBrandCounts = Object.fromEntries(
    Object.entries(brandCounts).filter(([brand]) =>
      brand.toLowerCase().includes(filterSearchQueryLower)
    )
  );
  const filteredOsCounts = Object.fromEntries(
    Object.entries(osCounts).filter(([os]) =>
      os.toLowerCase().includes(filterSearchQueryLower)
    )
  );
  const filteredStorageCounts = Object.fromEntries(
    Object.entries(storageCounts).filter(([storage]) =>
      storage.toLowerCase().includes(filterSearchQueryLower)
    )
  );
  const filteredRamCounts = Object.fromEntries(
    Object.entries(ramCounts).filter(([ram]) =>
      ram.toLowerCase().includes(filterSearchQueryLower)
    )
  );

  const filterOptions = {
    brands: Object.keys(filteredBrandCounts),
    oss: Object.keys(filteredOsCounts),
    storages: Object.keys(filteredStorageCounts),
    rams: Object.keys(filteredRamCounts),
  };

  return {
    props: {
      phones: filteredPhones,
      initialFilters: {
        minPrice,
        maxPrice,
        selectedBrand: brands,
        os: oss,
        storage: storages,
        ram: rams,
        sort,
        filterSearchQuery,
      },
      filterCounts: {
        brandCounts: filteredBrandCounts,
        osCounts: filteredOsCounts,
        storageCounts: filteredStorageCounts,
        ramCounts: filteredRamCounts,
      },
      filterOptions,
    },
  };
};
