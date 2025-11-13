import { promises as fs } from "fs";
import { join } from "path";

const rootDir = "./wiki";
const excludeDir = new Set(["public"]);

// 读取 index.md 的标题
async function getNoteTitle(
    indexPath: string,
    fallback: string,
): Promise<string> {
    try {
        const content = await fs.readFile(indexPath, "utf-8");
        const titleLine = content
            .split("\n")
            .map((l) => l.trim())
            .find((l) => l.startsWith("# "));
        if (titleLine) return titleLine.replace(/^#\s+/, "").trim();
    } catch {
        // ignore
    }
    return fallback;
}

// 整理目录 把笔记前面，分类放后面
async function sortDirsByType(parentPath: string, dirs: any[]): Promise<any[]> {
    const withIndex: any[] = [];
    const withoutIndex: any[] = [];

    for (const dir of dirs) {
        const indexPath = join(parentPath, dir.name, "index.md");
        const hasIndex = await fileExists(indexPath);
        if (hasIndex) {
            withIndex.push(dir);
        } else {
            withoutIndex.push(dir);
        }
    }

    // 各自按字母顺序排列
    withIndex.sort((a, b) => a.name.localeCompare(b.name));
    withoutIndex.sort((a, b) => a.name.localeCompare(b.name));

    return [...withIndex, ...withoutIndex];
}

// 递归遍历目录
async function walkDir(
    dirPath: string,
    relativePath: string,
    indentLevel = 0,
): Promise<string[]> {
    const lines: string[] = [];
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    // 只看文件夹
    const dirs = entries.filter((e) => e.isDirectory());
    const orderedDirs = await sortDirsByType(dirPath, dirs);

    for (const dir of orderedDirs) {
        const currentPath = join(dirPath, dir.name);
        const indexPath = join(currentPath, "index.md");

        // 判断该目录是否是笔记目录，有 index.md
        const hasIndex =
            entries.some((e) => e.name === dir.name && e.isDirectory()) &&
            (await fs.readdir(currentPath)).includes("index.md");

        // 判断是否还有子目录，可能是分类
        const subEntries = await fs.readdir(currentPath, {
            withFileTypes: true,
        });
        const subDirs = subEntries.filter((e) => e.isDirectory());

        const indent = "    ".repeat(indentLevel);

        if (subDirs.length > 0 && !hasIndex) {
            // 是分类目录（没有 index.md）
            lines.push(`${indent}- **${dir.name}**`);
            const subLines = await walkDir(
                currentPath,
                join(relativePath, dir.name),
                indentLevel + 1,
            );
            lines.push(...subLines);
        } else if (await fileExists(indexPath)) {
            // 是笔记目录（有 index.md）
            const title = await getNoteTitle(indexPath, dir.name);
            lines.push(
                `${indent}- [${title}](/${join(relativePath, dir.name)}/)`,
            );
        }
    }

    return lines;
}

async function fileExists(path: string): Promise<boolean> {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

async function generateStructure(): Promise<string> {
    const lines: string[] = [];
    const entries = await fs.readdir(rootDir, { withFileTypes: true });

    const categoryDirs = entries
        .filter((e) => e.isDirectory() && !excludeDir.has(e.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const category of categoryDirs) {
        const categoryName = category.name;
        lines.push(`## ${categoryName}\n`);

        const categoryPath = join(rootDir, categoryName);
        const subLines = await walkDir(categoryPath, categoryName, 0);
        lines.push(...subLines, ""); // 空行分隔
    }

    return lines.join("\n");
}

const content = await generateStructure();

//读取 index.md
const indexPath = join(rootDir, "index.md");
let existingLines: string[] = [];
const indexMD = await fs.readFile(indexPath, "utf-8");
existingLines = indexMD.split(/\r?\n/);

// 保留前五行 frontmatter
const keep = existingLines.slice(0, 10);
const newContent = [...keep, "", content, ""].join("\n");
await fs.writeFile(indexPath, newContent, "utf-8");

console.log("Update index successfully\n");
