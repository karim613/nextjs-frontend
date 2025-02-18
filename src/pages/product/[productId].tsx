// pages/product/[productId].tsx

import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import Head from 'next/head';
import Image from "next/image";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Lowerfooter from '../../components/Lowerfooter';
import styles from '../../styles/Product.module.css';
import { useState } from 'react';

interface Specification {
  title: string;
  details: { label: string; value: string }[];
}

interface ColorOption {
  name: string;
  colorCode: string;
}

interface Rating {
  stars: number; // e.g., 4.1
  reviews: number; // Number of reviews
}

interface Product {
  id: number;
  name: string;
  price: string;
  priceRange: string;
  imgSrc: string; // imgSrc as a string with comma-separated URLs
  stores: string;
  brand: string;
  os: string;
  storage: string;
  ram: string;
  description: string;
  specifications: Specification[];
  storageOptions?: string[];
  colorOptions?: ColorOption[];
  rating?: Rating;
}

interface ProductPageProps {
  product: Product | null;
}

interface Params extends ParsedUrlQuery {
  productId: string;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const maxVisibleImages = 5;

  if (!product) {
    // Handle product not found
    return <div>Product not found</div>;
  }

  const imgSrcArray = product.imgSrc.split(',').map((img) => img.trim());
  const visibleImages = imgSrcArray.slice(startIndex, startIndex + maxVisibleImages);

  const handleScrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleScrollDown = () => {
    if (startIndex + maxVisibleImages < imgSrcArray.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div>
      <Head>
        <title>{product.name} | Swipe</title>
        <meta name="description" content={`Buy ${product.name} at the best price.`} />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link> &gt; <Link href="/smartphones">Smartphones</Link> &gt;{' '}
          <span>{product.name}</span>
        </div>
        <div className={styles.productPage}>
          {/* Product image gallery */}
          <div className={styles.galleryContainer}>
            {/* Scroll Up Arrow */}
            {startIndex > 0 && (
              <div className={styles.upArrow} onClick={handleScrollUp}>
      <Image
        src="https://img.icons8.com/ios/50/collapse-arrow--v2.png"
        alt="collapse-arrow-up"
        width={40}
        height={40}
      />
    </div>
            )}
            {/* Secondary images */}
            <div className={styles.thumbnailList}>
              {visibleImages.map((img, index) => (
                <div
                  key={index + startIndex}
                  className={`${styles.thumbnail} ${
                    selectedImageIndex === index + startIndex ? styles.selectedThumbnail : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index + startIndex)}
                >
            <Image
              src={img}
              alt={`${product.name} thumbnail ${index + startIndex}`}
              width={80}  // adjust as needed
              height={80} // adjust as needed
            />
          </div>
        ))}
      </div>
      {/* Scroll Down Arrow */}
      {startIndex + maxVisibleImages < imgSrcArray.length && (
        <div className={styles.downArrow} onClick={handleScrollDown}>
          <Image
            src="https://img.icons8.com/ios/50/expand-arrow--v2.png"
            alt="expand-arrow-down"
            width={40}
            height={40}
          />
        </div>
      )}
      {/* Main image */}
      <div className={styles.mainImage}>
        <Image
          src={imgSrcArray[selectedImageIndex]}
          alt={product.name}
          width={600}  // adjust as needed
          height={400} // adjust as needed
          // Optionally, you can use layout="responsive" or "fill" if needed
        />
      </div>
    </div>

          {/* Product details */}
          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            {product.rating && (
              <div className={styles.rating}>
                <span className={styles.stars}>{renderStars(product.rating.stars)}</span>
                <span className={styles.ratingValue}>{product.rating.stars.toFixed(1)}</span>
              </div>
            )}

            {/* Add description under rating */}
            <p className={styles.productDescription}>{product.description}</p>

            {/* Use product.priceRange from the product data */}
            <p className={styles.priceRange}>{product.priceRange}</p>
            <p className={styles.brand}>Brand: {product.brand}</p>

            {/* Conditionally render storage options */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className={styles.storageOptions}>
                {product.storageOptions.map((option) => (
                  <button key={option} className={styles.storageButton}>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Conditionally render color options */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className={styles.colorOptions}>
                {product.colorOptions.map((option) => (
                  <div key={option.name} className={styles.colorOption}>
                    <div
                      className={styles.colorCircle}
                      style={{ backgroundColor: option.colorCode }}
                    ></div>
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Specifications Section Title */}
            <h2 className={styles.specTitle}>Specifications</h2>

            {/* Split Specifications Table into Two */}
            <div className={styles.specTablesContainer}>
              <div className={styles.specificationsTable}>
                {product.specifications.slice(0, 5).map((spec, index) => (
                  <div key={index} className={styles.specSection}>
                    <table className={styles.specTable}>
                      <thead>
                        <tr>
                          <th colSpan={2}>{spec.title}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spec.details.map((detail, idx) => (
                          <tr key={idx}>
                            <td className={styles.specLabel}>{detail.label}</td>
                            <td className={styles.specValue}>{detail.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className={styles.specificationsTable}>
                {product.specifications.slice(7).map((spec, index) => (
                  <div key={index} className={styles.specSection}>
                    <table className={styles.specTable}>
                      <thead>
                        <tr>
                          <th colSpan={2}>{spec.title}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spec.details.map((detail, idx) => (
                          <tr key={idx}>
                            <td className={styles.specLabel}>{detail.label}</td>
                            <td className={styles.specValue}>{detail.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Lowerfooter />
    </div>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
  const { params } = context;

  if (!params || !params.productId) {
    return {
      notFound: true,
    };
  }

  const productId = params.productId;

  // Fetch product data from the backend API
  const res = await fetch(`http://localhost:8080/products/${productId}`);
  
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
