import React, { useState, useContext, useEffect } from 'react';
import { Product } from '../../interfaces/productInterface';
import styles from './Product.module.scss';
import Filters from '../Filters/Filters';
import ReactPaginate from 'react-paginate';
import ListProduct from '../ListProduct/ListProduct';
import { price} from '../../utils/price.json';
import { product } from '../../utils/product';
import { category } from '../../utils/category.json';
import { AppContext } from '../../reactcontext/App';

enum SORTORDER {
    ASC = 'up',
    DESC = 'down'
}

enum SORTOPTION {
    PRICE = 'price',
    ALPHABET = 'alphabet'
}

const FILTER_LIST_TITLE={
    PRICE:'Price Range',
    CAREGORY:'Category'
}
const Products = () => {
    const [currentProducts, setCurrentProduct] = useState<Product[]>(product);
    const [pageNum, setPageNum] = useState<number>(0);
    const [hidePrev, setHidePrev] = useState<string>("hidden");
    const [hideNext, setHideNext] = useState<string>("");
    const productsPerPage = 6;
    const pageCounter = Math.ceil(currentProducts.length / productsPerPage);
    const pagesVisited = pageNum * productsPerPage;

    const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
    const [priceFilter, setPriceFilter] = useState<number[]>([]);

    const [sortOrder, setSortOrder] = useState<SORTORDER>(SORTORDER.ASC);
    const [sortOption, setSortOption] = useState<SORTOPTION>(SORTOPTION.PRICE); //alphabet,price

    const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

    useEffect(() => {       
        sortByPrice();
    }, []);


    useEffect(() => {
            applyAllFilters();
            changePage({selected:0});
    }, [priceFilter, categoryFilter]);

    useEffect(() => {
        handleSorting();
    }, [sortOrder]);

    const changePage = ({ selected: page }: any) => {
        setPageNum(page)
        if (page > 0) setHidePrev("")
        if (page === 0) setHidePrev("hidden")
        if (page >= pageCounter - 1) setHideNext("hidden")
        if (page < pageCounter - 1) setHideNext("")
    }

    const resetFilter = () => {
        setCategoryFilter([]);
        setPriceFilter([]);
        setCurrentProduct(product);
    }
    const updatePriceFilter = (value: []) => {
        setPriceFilter(value);
    }

    const updateCategoryFilter = (value: string) => {
        let catFilters = [...categoryFilter];
        let index = catFilters.findIndex(filter => filter == value);
        if (index !== -1) {
            catFilters.splice(index, 1);
            setCategoryFilter(catFilters);
        } else {
            setCategoryFilter((categoryFilter:string[]) => ([...categoryFilter, value]));
        }

    }

    const applyAllFilters = () => {
        let catFilterResult = applyCategoryFilter(categoryFilter, product);
        let priceFilerResult = applyPriceFilter(priceFilter, catFilterResult);

        setCurrentProduct(priceFilerResult);
        resetSorter();
    }

    const applyCategoryFilter = (filter: Array<string>, products: Product[]) => {
        if (filter.length > 0) {
            let result: any = [];
            filter.forEach((filter:string) => {
                const filteredProd = products.filter((product: Product) => product.category === filter)
                filteredProd.forEach((product: any) => {
                    result = [...result, product]
                })
            })
            return result
        }
        return products;
    }

    const applyPriceFilter = (filter: Array<number>, products: Product[]) => {
        if (filter.length > 0) {
            let lowerRange = filter[0];
            let upperRange = filter[1];

            let result = products.filter((product: any) => product.price >= lowerRange && product.price <= upperRange)
            if (upperRange === 0) result = products.filter((product: any) => product.price >= lowerRange)
            return result
        } else {
            return products
        }
    }

    const sortByPrice = () => {
        let products: Product[] = [...currentProducts];
        if (sortOrder === SORTORDER.ASC) {
            products.sort((a: any, b: any) => a.price - b.price);
        }
        if (sortOrder === SORTORDER.DESC) {
            products.sort((a: any, b: any) => b.price - a.price)
        }
        setCurrentProduct(products);
        setSortOption(SORTOPTION.PRICE);
    }

    const sortAlphabetically = () => {
        let products: Product[] = [...currentProducts];
        if (sortOrder === SORTORDER.ASC) {
            products.sort((a: any, b: any) => a.name.localeCompare(b.name));
        }

        if (sortOrder === SORTORDER.DESC) {
            products.sort((a: any, b: any) => b.name.localeCompare(a.name));
        }
        setCurrentProduct(products);
        setSortOption(SORTOPTION.ALPHABET);
    }


    const handleSorting = () => {
        if (sortOption === SORTOPTION.PRICE) {
            sortByPrice();
        }
        if (sortOption === SORTOPTION.ALPHABET) {
            sortAlphabetically();
        }
    }

    const resetSorter = () => {
        setSortOrder(SORTORDER.ASC);
        setSortOption(SORTOPTION.PRICE);
    }


    const { updateCartItems }: any = useContext(AppContext);


    return (
        <div className={styles.product}>
            <div className={styles.product__top}>
                <ProductSectionHeader
                    sortByPrice={sortByPrice}
                    sortAlphabetically={sortAlphabetically}
                    updateCategoryFilter={updateCategoryFilter}
                    updatePriceFilter={updatePriceFilter}
                    sortOption={sortOption}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    showMobileFilter={showMobileFilter}
                    setShowMobileFilter={setShowMobileFilter}
                    priceFilter={priceFilter}
                    categoryFilter={categoryFilter}
                    resetFilter={resetFilter}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="hidden md:block">
                    <div className="py-5">
                        <Filters filterName={'category'} filterListTitle={'Category'} multi={true} cb={updateCategoryFilter} filters={category} values={categoryFilter} />
                    </div>
                    <hr className="mr-4" />
                    <div className="py-5">
                        <Filters filterName={'price'} filterListTitle={FILTER_LIST_TITLE.PRICE} multi={false} cb={updatePriceFilter} filters={price} values={[priceFilter]} />
                    </div>
                    <button className={styles.clearBtn} onClick={() => { resetFilter() }}>
                        Clear
                     </button>
                </div>
                <div className="col-span-1 lg:col-span-3 md:col-span-1 justify-self-center md:justify-self-end">
                    <ListProduct products={currentProducts.slice(pagesVisited, (pagesVisited + productsPerPage))} updateCartItems={updateCartItems} />
                    {currentProducts?.length > 0 &&
                        <ReactPaginate
                            previousLabel={""}
                            nextLabel={""}
                            pageCount={pageCounter}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={4}
                            onPageChange={changePage}
                            containerClassName={styles['pagination-container']}
                            previousLinkClassName={styles["prev-btn"]}
                            previousClassName={`${styles[`prev-container`]} ${hidePrev}`}
                            nextLinkClassName={styles["next-btn"]}
                            nextClassName={`${styles["next-container"]} ${hideNext}`}
                            disabledClassName={styles["pagination--disabled"]}
                            activeClassName={styles["pagination--active"]}
                        />}
                </div>
            </div>
        </div>

    )
};

const ProductSectionHeader = ({ sortByPrice, sortAlphabetically, sortOption, sortOrder, setSortOrder, updateCategoryFilter, updatePriceFilter, showMobileFilter, setShowMobileFilter, categoryFilter, priceFilter, resetFilter }: any) => {
    const handleSortSelect = (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        if (value === SORTOPTION.PRICE) {
            sortByPrice();
        }
        if (value === SORTOPTION.ALPHABET) {
            sortAlphabetically();
        }
        return;
    }
    return (
        <div className={styles['product__header']}>
            <div className={`${styles['product__header-title']} flex flex-wrap`}>
                <span className={styles['product__header-title--left']}>Photography / </span><span className={`${styles['product__header-title--right']} pl-2`}>Premium Photos</span>
            </div>
            <div className="md:flex hidden">
                <div className={`${styles.sorticon} flex sort-icon pr-2`}>
                    <span className={`${styles.up} ${sortOrder == SORTORDER.ASC && styles.active}`} onClick={() => { setSortOrder(SORTORDER.ASC) }}>&#8593;</span>
                    <span className={`${styles.down} ${sortOrder == SORTORDER.DESC && styles.active}`} onClick={() => { setSortOrder(SORTORDER.DESC) }}>&#8595;</span>
                </div>
                <div className="flex">
                    <div className={`${styles.sortby} pr-2`}>Sort By</div>
                    <select onChange={handleSortSelect} className={styles['product__header-select']} value={sortOption}>
                        <option value={SORTOPTION.PRICE}>Price</option>
                        <option value={SORTOPTION.ALPHABET}>Alphabetically</option>
                    </select>
                </div>
            </div>
            <div className={`${styles.mobile__filterContainer} flex md:hidden`}>
                <div className="product-list-mobile-sort" onClick={() => { setShowMobileFilter((showMobileFilter: boolean) => (!showMobileFilter)) }}>
                    <img src='./filter.svg' alt="filter" />
                </div>
            </div>
            {showMobileFilter && <div className={`${styles.mobile__filter} block md:hidden`}>
                <div className="flex justify-between align-center">
                    <div className={styles['mobile__filter-title']}>
                        Filter
                        </div>
                    <img src="./close.svg" width={18} height={18} onClick={() => { setShowMobileFilter(false) }}/>
                </div>
                <div className={styles['mobile__filter-body']}>
                    <div className="py-5">
                        <Filters filterName={'category_mobile'} filterListTitle={FILTER_LIST_TITLE.CAREGORY} multi={true} cb={updateCategoryFilter} filters={category} values={categoryFilter} />
                    </div>
                    <hr className="mr-4" />
                    <div className="py-5">
                    <Filters filterName={'price_mobile'} filterListTitle={FILTER_LIST_TITLE.PRICE} multi={false} cb={updatePriceFilter} filters={price} values={[priceFilter]} />
                    </div>
                </div>
                <div className={styles['mobile__filter-bottom']}>
                    <button className={styles.clearBtn} onClick={() => { resetFilter() }}>
                        Clear
                     </button>
                    <button className={styles.saveBtn} onClick={() => { setShowMobileFilter(false) }}>
                        Save
                    </button>
                </div>
            </div>
            }
        </div>
    )
}

export default Products;


