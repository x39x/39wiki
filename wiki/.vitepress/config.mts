import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";

// 为每个文件夹生成 sidebar
function genSideBarItem(dir: string,basePath:string): any[] {
    const ItemPath = path.resolve(basePath, dir);
    const items: any[] = [];

    // 读取目录下的所有子目录
    const folders = fs
        .readdirSync(ItemPath, { withFileTypes: true })
        .filter((d) => d.isDirectory());

    for (const folder of folders) {
        const folderPath = path.join(ItemPath, folder.name);
        const indexPath = path.join(folderPath, "index.md");

        // 如果有 index.md 文件才算是一个页面目录
        if (fs.existsSync(indexPath)) {
            let title = folder.name.replace(/[-_]/g, " "); // '-/_' -> ' '
            try {
                // 读取文件，匹配标题
                const content = fs.readFileSync(indexPath, "utf-8");
                const match = content.match(/^#\s+(.+)$/m);
                if (match) {
                    title = match[1].trim();
                }
            } catch (err) {
                console.warn(`err in ${indexPath}:`, err);
            }
            items.push({
                text: title,
                link: `/${dir}/${folder.name}/`,
            });
        }
    }

    return [
        {
            text: dir,
            items,
        },
    ];
}

function genSideBar() {
    const basePath = path.resolve(__dirname, "..");
    const excludeDirs = [".vitepress", "public",];

    const dirs = fs
        .readdirSync(basePath, { withFileTypes: true })
        .filter(
            (dirent) =>
                dirent.isDirectory() && !excludeDirs.includes(dirent.name),
        )
        .map((dirent) => dirent.name);

    const sidebar: Record<string, any> = {};

    for (const dir of dirs) {
        sidebar[`/${dir}/`] = genSideBarItem(dir,basePath);
    }

    return sidebar;
}

export default defineConfig({
    lang: "zh-Hans",
    title: "39wiki",
    lastUpdated: true,
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
