import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    "0xaDce93409F782e3Afa51Be75F77ACa89Ab3b6e15" // Your marketplace contract address here
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>International Swimming League Presents</h1>
        <p className={styles.explain}>
        The unique{" "}
          <b>
            {" "}
            <a
              href="https://thirdweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.purple}
            >
              
            </a>
          </b>{" "}
         NFT!
        </p>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create">
            <a className={styles.mainButton} style={{ textDecoration: "none" }}>
              Create A Listing
            </a>
          </Link>
        </div>

        <div className="main">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={styles.name}>{listing.asset.name}</a>
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
