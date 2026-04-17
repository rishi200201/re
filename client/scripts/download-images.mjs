/**
 * download-images.mjs — Download all product images from S3 to local storage.
 *
 * WHY: The current product images are served from a third-party S3 bucket
 * (pepupload). If that bucket changes or goes offline, product images break.
 * Self-hosting eliminates this external dependency and improves load speed.
 *
 * OUTPUT: src/assets/images/products/s3/ (imported by products.js after migration)
 *
 * USAGE:
 *   node scripts/download-images.mjs
 *
 * After running:
 *   1. Verify images in src/assets/images/products/s3/
 *   2. Update products.js to import from local paths instead of the S3 URL
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../src/assets/images/products/s3");

fs.mkdirSync(outDir, { recursive: true });

const S3 =
  "https://s3-ap-southeast-1.amazonaws.com/pepupload/MjA5NTU1/mediabank/images/products";

// All S3 filenames used in products.js
const FILES = [
  "IndustrialStorageCrate300x200mmDurablePlasticForWarehouses491805675_209555.jpg",
  "HeavyDutyIndustrialCrate400x300mmPlasticLogisticsContainer300787863_209555.jpg",
  "ReinforcedIndustrialCrate500x325mmPlasticMaterialHandlingBox953371142_209555.jpg",
  "LargeIndustrialCrate600x400mmHeavyDutyPlasticStorage1079515431_209555.jpg",
  "JumboIndustrialCrateExtraLargePlasticContainerForIndustry930506185_209555.jpg",
  "TransparentCrateLidPlasticCoverForIndustrialStorageCrates1187885793_209555.jpg",
  "IndustrialCratesForMaterialHandling1515555040_209555.jpg",
  "BeerBottleStorageCrate24PartitionPlasticForBeverageHandling1485238644_209555.jpg",
  "GoliSodaPlasticCrate24PartitionBeverageIndustryTransport1331420541_209555.jpg",
  "HalfSizeBottleCrate24PartitionCompactPlasticStorageBox418092194_209555.jpg",
  "750MlPlasticBottleCrateBeverageTransportStorageUse20168619_209555.jpg",
  "MilkBottleCrateFor5001000MlDurableDairyPlasticCrate318442911_209555.jpg",
  "DoubleWallFishCrate650x450x315mmPlasticSeafoodTransport1798153015_209555.jpg",
  "RibbonStyleFishCrateDurablePlasticForFishHandling1433598375_209555.jpg",
  "CrabFarmingCrateIndustrialPlasticForAquacultureUse963537070_209555.jpg",
  "ModularJointCratePlasticStorageSolutionForIndustrialUse496495426_209555.jpg",
  "PlasticCratePartitionDividerPanelsForStorageOrganization69350217_209555.jpg",
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    // Skip if already downloaded
    if (fs.existsSync(dest)) {
      console.log(`  skip  ${path.basename(dest)} (already exists)`);
      return resolve();
    }

    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

let ok = 0, fail = 0;

for (const file of FILES) {
  const url = `${S3}/${file}`;
  const dest = path.join(outDir, file);
  try {
    await download(url, dest);
    console.log(`  ✓  ${file}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${file}  —  ${err.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
if (ok > 0) {
  console.log(`\nNext step: update src/data/products.js to import images from:`);
  console.log(`  src/assets/images/products/s3/<filename>`);
  console.log(`instead of the S3 URL string.`);
}
