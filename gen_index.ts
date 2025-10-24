import { promises as fs } from "fs";
import { join } from "path";

const rootDir = "./wiki";
const excludeDir = new Set([".vitepress", "public"]);

async function generateStructure(): Promise<string> {
    const lines: string[] = [];
    const entries = await fs.readdir(rootDir, { withFileTypes: true });

    // 遍历根目录，过滤无关目录
    const categoryDirs = entries
        .filter((e) => e.isDirectory() && !excludeDir.has(e.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    for (const category of categoryDirs) {
        const categoryName = category.name;
        lines.push(`# ${categoryName}\n`);

        const categoryPath = join(rootDir, categoryName);
        const subEntries = await fs.readdir(categoryPath, {
            withFileTypes: true,
        });
        const noteDirs = subEntries
            .filter((e) => e.isDirectory())
            .sort((a, b) => a.name.localeCompare(b.name));

        for (const note of noteDirs) {
            const noteFolder = note.name;
            const indexMdPath = join(categoryPath, noteFolder, "index.md");
            let noteTitle = noteFolder;

            try {
                const content = await fs.readFile(indexMdPath, "utf-8");
                const titleLine = content
                    .split("\n")
                    .map((l) => l.trim())
                    .find((l) => l.startsWith("# "));
                if (titleLine)
                    noteTitle = titleLine.replace(/^#\s+/, "").trim();
            } catch {
                // 没有 index.md 或读取错误，忽略
            }

            lines.push(`- [${noteTitle}](/${categoryName}/${noteFolder}/)\n`);
        }
    }

    return lines.join("\n");
}

async function insertIntoIndex(content: string): Promise<void> {
    const indexPath = join(rootDir, "index.md");
    let existingLines: string[] = [];

    try {
        const existing = await fs.readFile(indexPath, "utf-8");
        existingLines = existing.split(/\r?\n/);
    } catch {
        // index.md 不存在则创建新文件
    }

    // 保留前五行 frontmatter
    const keep = existingLines.slice(0, 5);
    const newContent = [...keep, "", content, ""].join("\n");
    await fs.writeFile(indexPath, newContent, "utf-8");
}

async function main() {
    const structure = await generateStructure();
    await insertIntoIndex(structure);
    console.log("Update index successfully\n");
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});
