import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";

function readTitleFromIndex(indexPath: string, fallback: string): string {
    try {
        const content = fs.readFileSync(indexPath, "utf-8");
        const match = content.match(/^#\s+(.+)$/m);
        if (match) return match[1].trim();
    } catch {
        // ignore
    }
    return fallback.replace(/[-_]/g, " ");
}

function sortEntriesByType(
    entries: fs.Dirent[],
    basePath: string,
    baseDir: string,
) {
    const withIndex: fs.Dirent[] = [];
    const withoutIndex: fs.Dirent[] = [];

    for (const entry of entries) {
        const indexPath = path.join(basePath, baseDir, entry.name, "index.md");
        if (fs.existsSync(indexPath)) {
            withIndex.push(entry);
        } else {
            withoutIndex.push(entry);
        }
    }

    withIndex.sort((a, b) => a.name.localeCompare(b.name));
    withoutIndex.sort((a, b) => a.name.localeCompare(b.name));

    return [...withIndex, ...withoutIndex];
}

// 递归读取一个目录，生成层级结构
function genSideBarItems(baseDir: string, basePath: string): any[] {
    const items: any[] = [];

    const rawEntries = fs
        .readdirSync(path.join(basePath, baseDir), { withFileTypes: true })
        .filter((e) => e.isDirectory());

    const entries = sortEntriesByType(rawEntries, basePath, baseDir);

    for (const entry of entries) {
        const entryPath = path.join(basePath, baseDir, entry.name);
        const indexPath = path.join(entryPath, "index.md");

        // 如果该目录有 index.md，则作为可点击页面
        const hasIndex = fs.existsSync(indexPath);

        // 检查是否还有子目录
        const subDirs = fs
            .readdirSync(entryPath, { withFileTypes: true })
            .filter((e) => e.isDirectory());

        const title = hasIndex
            ? readTitleFromIndex(indexPath, entry.name)
            : entry.name.replace(/[-_]/g, " ");

        if (subDirs.length > 0) {
            // 有子目录 -> 递归生成子级 items
            const subItems = genSideBarItems(
                path.join(baseDir, entry.name),
                basePath,
            );

            const node: any = { text: title, items: subItems };

            // 如果当前目录也有 index.md（可点击）
            if (hasIndex) {
                node.link = `/${path.join(baseDir, entry.name)}/`;
            }

            items.push(node);
        } else if (hasIndex) {
            // 没有子目录但有 index.md
            items.push({
                text: title,
                link: `/${path.join(baseDir, entry.name)}/`,
            });
        }
    }

    return items;
}

function genSideBar() {
    const basePath = path.resolve(__dirname, "..", "wiki");
    const excludeDirs = new Set(["public"]);

    const dirs = fs
        .readdirSync(basePath, { withFileTypes: true })
        .filter((d) => d.isDirectory() && !excludeDirs.has(d.name))
        .map((d) => d.name);

    const sidebar: Record<string, any[]> = {};

    for (const dir of dirs) {
        sidebar[`/${dir}/`] = genSideBarItems(dir, basePath);
    }

    return sidebar;
}

export default defineConfig({
    lang: "zh-Hans",
    title: "39wiki",
    srcDir: "wiki",
    lastUpdated: true,
    markdown: {
        image: {
            lazyLoading: true,
        },
        math: true,
    },
    head: [
        [
            "link",
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico",
            },
        ],
        [
            "link",
            {
                rel: "icon",
                type: "image/svg+xml",
                href: "/favicon.svg",
            },
        ],
    ],
    themeConfig: {
        nav: [{ text: "Blog", link: "https://x39x.cc" }],
        docFooter: {
            prev: false,
            next: false,
        },
        socialLinks: [{ icon: "github", link: "https://github.com/x39x" }],
        sidebar: genSideBar(),
    },
});
