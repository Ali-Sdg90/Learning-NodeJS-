import { exiftool } from "exiftool-vendored";
import fs from "node:fs/promises";
import path from "node:path";

const folderPath = process.argv[2];

const shouldApply = process.argv.includes("--apply");
const recursive = process.argv.includes("--recursive");
const useModifiedOnly = process.argv.includes("--modified-only");

const SUPPORTED_EXTENSIONS = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".heic",
    ".heif",
    ".webp",
    ".tif",
    ".tiff",
]);

if (!folderPath) {
    console.log(`
Usage:
  node image-sorter.mjs "D:\\Photos"
  node image-sorter.mjs "D:\\Photos" --apply
  node image-sorter.mjs "D:\\Photos" --recursive --apply
  node image-sorter.mjs "D:\\Photos" --modified-only
  node image-sorter.mjs "D:\\Photos" --modified-only --apply

Default date priority:
  1. EXIF / Date Taken
  2. Date inside filename
  3. File modified date

By default it only previews changes.
Use --apply to actually rename files.
`);
    process.exit(1);
}

function pad(number) {
    return String(number).padStart(2, "0");
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            pad(date.getMonth() + 1),
            pad(date.getDate()),
        ].join("-") +
        "_" +
        [
            pad(date.getHours()),
            pad(date.getMinutes()),
            pad(date.getSeconds()),
        ].join("-")
    );
}

function toDate(value) {
    if (!value) return null;

    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }

    if (typeof value.toDate === "function") {
        const date = value.toDate();

        if (date instanceof Date && !Number.isNaN(date.getTime())) {
            return date;
        }
    }

    if (typeof value === "string") {
        // Handles formats like: 2024:12:31 23:58:10
        const match = value.match(
            /^(\d{4})[:/-](\d{2})[:/-](\d{2})[ T](\d{2}):(\d{2}):(\d{2})/,
        );

        if (match) {
            const [, year, month, day, hour, minute, second] =
                match.map(Number);
            return new Date(year, month - 1, day, hour, minute, second);
        }

        const parsed = new Date(value);

        if (!Number.isNaN(parsed.getTime())) {
            return parsed;
        }
    }

    return null;
}

function normalizeDigits(input) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

    return String(input)
        .replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit))
        .replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit));
}

function createValidDate(year, month, day, hour, minute, second) {
    const date = new Date(year, month - 1, day, hour, minute, second);

    const isValid =
        !Number.isNaN(date.getTime()) &&
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date.getHours() === hour &&
        date.getMinutes() === minute &&
        date.getSeconds() === second;

    return isValid ? date : null;
}

function parseDateFromFileName(fileName) {
    const normalized = normalizeDigits(fileName);

    const patterns = [
        // IMG_20210304_174906_559.jpg
        // 20210304_174906.jpg
        /(\d{4})(\d{2})(\d{2})[_-](\d{2})(\d{2})(\d{2})/,

        // Screenshot 2026-06-18 065813.png
        /(\d{4})-(\d{2})-(\d{2})[ _-](\d{2})(\d{2})(\d{2})/,

        // photo_2021-04-09_20-38-14.jpg
        /(\d{4})-(\d{2})-(\d{2})[ _-](\d{2})-(\d{2})-(\d{2})/,

        // WIN_20210904_20_10_08_Pro.jpg
        // Screenshot_20210304-174749_Instagram.jpg
        /(\d{4})(\d{2})(\d{2})[_-](\d{2})[_-](\d{2})[_-](\d{2})/,
    ];

    for (const pattern of patterns) {
        const match = normalized.match(pattern);

        if (!match) continue;

        const [, year, month, day, hour, minute, second] = match.map(Number);

        const date = createValidDate(year, month, day, hour, minute, second);

        if (date) return date;
    }

    return null;
}

function getExifDate(tags) {
    const candidates = [
        tags.DateTimeOriginal,
        tags.CreateDate,
        tags.MediaCreateDate,
        tags.TrackCreateDate,
        tags.SubSecDateTimeOriginal,
        tags.SubSecCreateDate,
    ];

    for (const candidate of candidates) {
        const date = toDate(candidate);

        if (date) {
            return date;
        }
    }

    return null;
}

async function getBestDate(filePath, tags) {
    const stats = await fs.stat(filePath);

    if (useModifiedOnly) {
        return {
            date: stats.mtime,
            source: "file modified date",
        };
    }

    const exifDate = getExifDate(tags);

    if (exifDate) {
        return {
            date: exifDate,
            source: "EXIF / date taken",
        };
    }

    const fileNameDate = parseDateFromFileName(path.basename(filePath));

    if (fileNameDate) {
        return {
            date: fileNameDate,
            source: "filename date",
        };
    }

    return {
        date: stats.mtime,
        source: "file modified date fallback",
    };
}

async function getFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (recursive) {
                const nestedFiles = await getFiles(fullPath);
                files.push(...nestedFiles);
            }

            continue;
        }

        const ext = path.extname(entry.name).toLowerCase();

        if (SUPPORTED_EXTENSIONS.has(ext)) {
            files.push(fullPath);
        }
    }

    return files;
}

async function pathExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function getUniqueFilePath(dir, baseName, ext, originalPath) {
    let counter = 0;

    while (true) {
        const suffix =
            counter === 0 ? "" : `_${String(counter).padStart(3, "0")}`;
        const newPath = path.join(dir, `${baseName}${suffix}${ext}`);

        if (path.resolve(newPath) === path.resolve(originalPath)) {
            return newPath;
        }

        if (!(await pathExists(newPath))) {
            return newPath;
        }

        counter++;
    }
}

async function main() {
    const files = await getFiles(folderPath);

    console.log(`Found ${files.length} image(s).`);
    console.log(shouldApply ? "Mode: APPLY" : "Mode: DRY RUN");
    console.log(
        useModifiedOnly
            ? "Date mode: modified date only"
            : "Date mode: EXIF -> filename -> modified fallback",
    );
    console.log("");

    let renamed = 0;
    let skipped = 0;
    let failed = 0;

    const sourceCounts = {
        "EXIF / date taken": 0,
        "filename date": 0,
        "file modified date": 0,
        "file modified date fallback": 0,
    };

    try {
        for (const filePath of files) {
            try {
                const tags = await exiftool.read(filePath);
                const dateInfo = await getBestDate(filePath, tags);
                const imageDate = dateInfo.date;

                if (!imageDate) {
                    console.log(`SKIP no usable date: ${filePath}`);
                    skipped++;
                    continue;
                }

                sourceCounts[dateInfo.source] =
                    (sourceCounts[dateInfo.source] ?? 0) + 1;

                const dir = path.dirname(filePath);
                const ext = path.extname(filePath).toLowerCase();
                const newBaseName = formatDate(imageDate);
                const newPath = await getUniqueFilePath(
                    dir,
                    newBaseName,
                    ext,
                    filePath,
                );

                if (path.resolve(filePath) === path.resolve(newPath)) {
                    console.log(`OK already named: ${path.basename(filePath)}`);
                    console.log(`  source: ${dateInfo.source}`);
                    skipped++;
                    continue;
                }

                console.log(`${shouldApply ? "RENAME" : "WOULD RENAME"}:`);
                console.log(`  ${path.basename(filePath)}`);
                console.log(`  -> ${path.basename(newPath)}`);
                console.log(`  source: ${dateInfo.source}`);

                if (shouldApply) {
                    await fs.rename(filePath, newPath);
                }

                renamed++;
            } catch (error) {
                console.log(`FAILED: ${filePath}`);
                console.log(`  ${error.message}`);
                failed++;
            }
        }
    } finally {
        await exiftool.end();
    }

    console.log("");
    console.log("Done.");
    console.log(`Renamed: ${renamed}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Failed: ${failed}`);

    console.log("");
    console.log("Date source summary:");
    for (const [source, count] of Object.entries(sourceCounts)) {
        if (count > 0) {
            console.log(`  ${source}: ${count}`);
        }
    }
}

main().catch(async (error) => {
    console.error(error);

    try {
        await exiftool.end();
    } catch {
        // ignore cleanup errors
    }

    process.exit(1);
});
