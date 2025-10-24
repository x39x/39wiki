import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const rootDir = "./wiki";
const excludeDir = new Set([".vitepress", "public"]);

function generateStructure(): string {
    const lines: string[] = [];

    const categoryDirs = fs
        .readdirSync(rootDir, { withFileTypes: true })
        .filter((e) => e.isDirectory() && !excludeDir.has(e.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    // 遍历根目录
    for (const category of categoryDirs) {
        const categoryName = category.name;
        // 分类标题
        lines.push(`# ${categoryName}\n`);

        // 分类目录路径
        const categoryPath = path.join(rootDir, categoryName);
        // 获取类别下的所有子目录
        const noteDirs = fs
            .readdirSync(categoryPath, { withFileTypes: true })
            .filter((e) => e.isDirectory())
            .sort((a, b) => a.name.localeCompare(b.name));

        // 生成分类下的所有笔记链接
        for (const note of noteDirs) {
            const noteFolder = note.name;
            const indexMdPath = path.join(categoryPath, noteFolder, "index.md");
            let noteTitle = noteFolder;

            //从 index.md 获取第一个 "# XXX"
            if (fs.existsSync(indexMdPath)) {
                try {
                    const content = fs.readFileSync(indexMdPath, "utf-8");
                    for (const line of content.split("\n")) {
                        const trimmed = line.trim();
                        if (trimmed.startsWith("# ")) {
                            noteTitle = trimmed.slice(2).trim();
                            break;
                        }
                    }
                } catch (e) {
                    console.error(`Error in ${indexMdPath}:`, e);
                }
            }

            // note 路径
            lines.push(`- [${noteTitle}](/${categoryName}/${noteFolder}/)\n`);
        }
    }

    return lines.join("\n");
}

// 插入到根目录 index
function insertIntoIndex(content: string): void {
    const indexPath = path.join(rootDir, "index.md");
    let existingLines: string[] = [];

    if (fs.existsSync(indexPath)) {
        existingLines = fs.readFileSync(indexPath, "utf-8").split(/\r?\n/);
    }

    // 保留前五行 frontmatter
    const keep = existingLines.slice(0, 5);
    const newContent = [...keep, "", content, ""].join("\n");
    fs.writeFileSync(indexPath, newContent, "utf-8");
}

try {
    const structure = generateStructure();
    insertIntoIndex(structure);
    console.log("Update index successfully\n");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}

// add commit push
const now = new Date();
const MSG = `TIME: ${now.toISOString()}`;

try {
    //  git add & git commit
    execSync(`git add --all`, { stdio: "inherit" });
    execSync(`git commit -m "${MSG}"`, { stdio: "inherit" });

    // push
    execSync(`git push`, { stdio: "inherit" });
    console.log("\x1b[32mSuccess!\x1b[0m");
} catch (error: any) {
    if (error.message.includes("nothing to commit")) {
        console.log("\x1b[31mNothing changed\x1b[0m");
    } else {
        console.error("\x1b[31mError:\x1b[0m", error.message);
    }
}
